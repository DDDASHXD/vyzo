import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import { iFile } from "@/hooks/useFiles";
import { iFolder } from "@/hooks/useFolders";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { Input } from "./input";
import { Separator } from "./separator";
import { FileIcon, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [results, setResults] = React.useState<any>([]);
  const [search, setSearch] = useDebouncedState("", 100);
  const inputRef = React.useRef<any>(null);
  const { setCurrentFolder, setCurrentFile } =
    React.useContext(ApplicationContext);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // New ref to hold references to each search item
  const searchItemsRef = React.useRef<HTMLDivElement[]>([]);

  const getResults = async () => {
    const res = await axios.post<any>(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${search}`,
      {
        indexes: ["files", "folders"],
      }
    );
    setResults(res.data.hits);

    console.log(res.data);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (search) getResults();
    setActiveIndex(0);
    if (search.length === 0) {
      setResults([]);
    }
  }, [search]);

  React.useEffect(() => {
    if (open) {
      inputRef.current.focus();
    } else {
      setResults([]);
      setSearch("");
    }
  }, [open]);

  const handleClick = async () => {
    const item = results[activeIndex];
    setOpen(false);

    if (item.type === "file") {
      setCurrentFolder(item.parent!);

      const file = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/files/single`,
        {
          fileid: item._id,
          token: localStorage.getItem("token"),
        }
      );
      setTimeout(() => {
        // @ts-ignore
        setCurrentFile(file.data.file);
      }, 50);

      console.log(item._id);

      return;
    }

    setCurrentFolder(item._id!);
  };

  const handleMovement = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (activeIndex === results.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex + 1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (activeIndex === 0) {
          setActiveIndex(results.length - 1);
        } else {
          setActiveIndex(activeIndex - 1);
        }
        break;
      case "Enter":
        if (results.length > 0) {
          handleClick();
        } else {
          setOpen(false);
        }
        break;
    }
  };

  React.useEffect(() => {
    if (searchItemsRef.current[activeIndex]) {
      searchItemsRef.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <>
      <Button
        className="hidden"
        id="open-search"
        onClick={() => setOpen(true)}
      ></Button>
      {open && (
        <div
          className="flex justify-center items-center fixed z-20 w-full h-full top-0 left-0 bg-background/30 backdrop-blur-sm"
          onMouseUp={() => setOpen(false)}
        >
          <div className="flex flex-col bg-background/90 backdrop-blur-3xl border rounded-md p-2 gap-2 w-[30rem] max-h-[20rem]">
            <Input
              placeholder="What are you looking for?"
              className="bg-transparent border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-lg"
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleMovement(e)}
            />
            {results.length > 0 && (
              <>
                <Separator />
                <div className="flex flex-col w-full h-full overflow-auto gap-1">
                  {results.map((hit: iFile | iFolder, index: number) => (
                    <SearchItem
                      key={index}
                      hit={hit}
                      active={index === activeIndex}
                      // @ts-ignore
                      ref={(el) => (searchItemsRef.current[index] = el)}
                    />
                  ))}
                </div>
              </>
            )}
            {results.length === 0 && search.length > 0 && (
              <>
                <Separator />
                <p className="gap-2 px-3 py-2 rounded-md cursor-pointer">
                  No results found for{" "}
                  <span className="bg-secondary px-2 py-0 rounded-md font-mono">
                    {search}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface iSearchItemProps {
  hit: iFile | iFolder;
  active?: boolean;
}

const SearchItem = React.forwardRef<HTMLDivElement, iSearchItemProps>(
  ({ hit, active }, ref) => {
    return (
      <div
        ref={ref} // Add ref to each item
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-secondary/50",
          {
            "bg-secondary": active,
          }
        )}
      >
        {hit.type === "folder" ? (
          <FolderIcon size={15} />
        ) : (
          <FileIcon size={15} />
        )}
        <p>{hit.name}</p>
      </div>
    );
  }
);

export default Search;
