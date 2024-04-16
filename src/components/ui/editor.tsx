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
import Tiptap from "./tiptap";

const Editor = () => {
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
        <Tiptap />
      </div>
    </div>
  );
};

export default Editor;
