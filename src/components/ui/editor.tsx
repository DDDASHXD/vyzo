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

const Editor = () => {
  const defaultContent = `<h1>🚀 Welcome to Vyzo!</h1><p>Vyzo is a brain organizing and note taking tool, helping you focus only on what you need.</p><p>This includes:</p><ul><li><p>An easy to learn markdown editor</p></li><li><p>Extensive search capabilities</p></li><li><p>Code bases</p></li><li><p>Interactive code editors</p></li><li><p>Easy linking between files</p></li><li><p>Note taking on powerpoints and PDF's</p></li><li><p>Easy-to-learn markdown wysiwyg shortcuts</p><ul><li><p>And exporting to markdown, pdf and plain html!</p></li></ul></li><li><p>And much, much more!</p></li></ul>`;

  const editor = useEditor({
    defaultContent,
  });

  return (
    <div className="flex flex-col h-full overflow-scroll">
      <div className="flex justify-between border-b border-b-border py-1 px-5">
        <div className="flex gap-10">
          <ToggleGroup type="multiple" className="gap-0">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem
              defaultChecked
              value="left"
              aria-label="Toggle bold"
            >
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Toggle italic">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Toggle underline">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Toggle underline">
              <AlignJustify className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem value="ul" aria-label="Toggle bold">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="ol" aria-label="Toggle italic">
              <ListOrderedIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="cl" aria-label="Toggle underline">
              <ListChecks className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="gap-0">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Indent className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <IndentDecrease className="h-4 w-4" />
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
