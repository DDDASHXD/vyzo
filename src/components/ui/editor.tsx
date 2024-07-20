import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Indent,
  IndentDecrease,
  Italic,
  List,
  ListChecks,
  ListOrderedIcon,
  Underline,
} from "lucide-react";
import { EditorContent } from "@tiptap/react";
import { useEditor } from "@/hooks/useEditor";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import { toast } from "sonner";

const Editor = () => {
  const { currentFile } = React.useContext(ApplicationContext);
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

  return (
    <div className="flex flex-col h-full overflow-scroll relative">
      <div
        className="flex justify-between border border-border py-1 px-5 w-max left-1/2 -translate-x-1/2 rounded-full shadow-sm"
        style={{
          bottom: "15px",
          position: "absolute",
        }}
      >
        <div className="flex gap-5">
          <ToggleGroup type="multiple" className="gap-0">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem
              defaultChecked
              value="left"
              aria-label="Toggle bold"
            >
              <AlignLeft className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Toggle italic">
              <AlignCenter className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Toggle underline">
              <AlignRight className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Toggle underline">
              <AlignJustify className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem value="ul" aria-label="Toggle bold">
              <List className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="ol" aria-label="Toggle italic">
              <ListOrderedIcon className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="cl" aria-label="Toggle underline">
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
        </div>
      </div>
      <div className="flex h-full overflow-scroll p-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
