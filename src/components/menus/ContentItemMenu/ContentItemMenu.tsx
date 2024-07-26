import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { Editor } from "@tiptap/react";
import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, PlusIcon } from "lucide-react";

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen && editor) {
      console.log(editor);
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 0],
        zIndex: 99,
      }}
      className="pr-2"
    >
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          onClick={actions.handleAdd}
          className="size-7 flex items-center justify-center p-2"
        >
          <PlusIcon />
        </Button>
        <Button
          variant={"ghost"}
          className="size-7 flex items-center justify-center p-2"
        >
          <GripVertical />
        </Button>
      </div>
    </DragHandle>
  );
};
