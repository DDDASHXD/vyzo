import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronUp,
  Indent,
  IndentDecrease,
  Italic,
  List,
  ListChecks,
  ListOrderedIcon,
  Pin,
  Share,
  Underline,
} from "lucide-react";
import { EditorContent } from "@tiptap/react";
import { useEditor } from "@/hooks/useEditor";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "./button";
import { ContentItemMenu } from "../menus/ContentItemMenu/ContentItemMenu";
import { iFileviewerProps } from "../fileviewers/fileviewer";
import Topbar from "../fileviewers/topbar";
import TopbarButton from "../fileviewers/TopbarButton";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./dropdown-menu";
import { Badge } from "./badge";

const Editor = ({ fullscreen, setFullscreen }: iFileviewerProps) => {
  const { currentFile, getFiles, currentFolder } =
    React.useContext(ApplicationContext);
  const [formatMenuActive, setFormatMenuActive] = React.useState(false);
  const [formatMenuPin, setFormatMenuPin] = React.useState(false);
  const [content, setContent] = useDebouncedState("", 200);
  const defaultContent =
    currentFile && currentFile.content ? currentFile.content : "";

  let editor = useEditor({
    defaultContent:
      currentFile && currentFile.content ? currentFile.content : "",
    onUpdate: async (editor) => {
      setContent(editor.getHTML());
    },
  });

  const update = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/files/edit`, {
        token: localStorage.getItem("token"),
        id: currentFile?._id,
        content: content,
      });
      currentFolder && getFiles(currentFolder);
    } catch (error) {
      console.log(error);
      toast.error("Error!!!!");
    }
  };

  React.useEffect(() => {
    if (content) {
      update();
    }
  }, [content]);

  React.useEffect(() => {
    if (editor && currentFile) {
      editor.commands.setContent(currentFile.content!);
    }
  }, [currentFile]);

  const exportFile = async (type: string) => {
    let mimeType = "";
    let text = "";
    let name = currentFile?.name!;

    switch (type) {
      case "markdown":
        mimeType = "text/markdown";
        text = editor?.storage.markdown.getMarkdown();
        name = name + ".md";
        break;
      case "html":
        mimeType = "text/html";
        text = editor?.getHTML()!;
        name = name + ".html";
      default:
        toast("No type provided");
    }

    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full relative bg-background">
      <Topbar
        fullscreen={fullscreen}
        setFullscreen={(e) => setFullscreen(e)}
        customExport={[
          <DropdownMenu>
            <DropdownMenuTrigger>
              <TopbarButton>
                <Share />
              </TopbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportFile("markdown")}>
                Markdown
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-5 justify-between"
                onClick={() => exportFile("html")}
              >
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-5 justify-between"
              >
                Plaintext
                <Badge className="text-xs">Coming soon</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex items-center gap-5 justify-between"
              >
                PDF
                <Badge className="text-xs">Coming soon</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>,
        ]}
      />
      {/* Trigger */}
      <div
        className="absolute h-20 w-full bottom-0 text-muted-foreground flex items-center justify-end p-5"
        onMouseEnter={() => setFormatMenuActive(true)}
        onMouseLeave={() => setFormatMenuActive(formatMenuPin ? true : false)}
      >
        <ChevronUp
          className={cn(
            "opacity-100 transition-all left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute ",
            {
              "opacity-0": formatMenuActive,
            }
          )}
        />
        <Toggle
          variant="outline"
          pressed={formatMenuPin}
          onClick={() => setFormatMenuPin(!formatMenuPin)}
          className={cn("transition-all z-10", {
            "opacity-0": !formatMenuActive,
          })}
        >
          <Pin className="size-3" />
        </Toggle>
      </div>
      <div
        className={cn(
          "flex justify-between border border-border py-1 px-5 w-max left-1/2 -translate-x-1/2 rounded-full shadow-sm transition-all bg-background z-10",
          {
            "translate-y-1/2 opacity-0": !formatMenuActive,
          }
        )}
        style={{
          bottom: "15px",
          position: "absolute",
        }}
        onMouseEnter={() => setFormatMenuActive(true)}
        onMouseLeave={() => setFormatMenuActive(formatMenuPin ? true : false)}
      >
        {/* editor.isActive('bold') */}
        <div className="flex gap-5">
          <ToggleGroup
            type="multiple"
            className="gap-0"
            value={[
              `${editor?.isActive("bold") && "bold"}`,
              `${editor?.isActive("italic") && "italic"}`,
            ]}
          >
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor!.chain().focus().toggleBold().run()}
            >
              <Bold className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor!.chain().focus().toggleItalic().run()}
            >
              <Italic className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            type="single"
            className="gap-0"
            value={
              editor?.isActive({ textAlign: "right" })
                ? "right"
                : editor?.isActive({ textAlign: "left" })
                ? "left"
                : editor?.isActive({ textAlign: "center" })
                ? "center"
                : editor?.isActive({ textAlign: "justify" })
                ? "justify"
                : ""
            }
          >
            <ToggleGroupItem
              defaultChecked
              value="left"
              aria-label="Toggle bold"
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              aria-label="Toggle italic"
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              aria-label="Toggle underline"
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="justify"
              aria-label="Toggle underline"
              onClick={() =>
                editor?.chain().focus().setTextAlign("justify").run()
              }
            >
              <AlignJustify className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            type="single"
            className="gap-0"
            value={
              editor?.isActive("bulletList")
                ? "ul"
                : editor?.isActive("orderedList")
                ? "ol"
                : editor?.isActive("taskList")
                ? "cl"
                : editor?.isActive({ textAlign: "justify" })
                ? "justify"
                : ""
            }
          >
            <ToggleGroupItem
              value="ul"
              aria-label="Toggle bold"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              <List className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ol"
              aria-label="Toggle italic"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              <ListOrderedIcon className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="cl"
              aria-label="Toggle underline"
              onClick={() => editor?.chain().focus().toggleTaskList().run()}
            >
              <ListChecks className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Indent className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <IndentDecrease className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            onClick={() => console.log(editor?.getHTML())}
            variant={"secondary"}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="w-full h-full overflow-scroll">
        <div className="flex h-full p-5 w-full max-w-screen-md mx-auto mb-10">
          <EditorContent
            editor={editor}
            className={cn("w-full h-max pb-20", {
              "pb-24": formatMenuActive,
            })}
          />
          {editor && <ContentItemMenu editor={editor} />}
        </div>
      </div>
    </div>
  );
};

export default Editor;
