import { useEditor as useTipTapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import TextAlign from "@tiptap/extension-text-align";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

// load all highlight.js languages
import { lowlight } from "lowlight/lib/common";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("jsx", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("tsx", ts);
lowlight.registerLanguage("json", json);
lowlight.registerLanguage("json", bash);

interface IProps {
  defaultContent?: string;
  onUpdate?: (e: any) => void;
}

const useEditor = ({ defaultContent, onUpdate }: IProps) => {
  const editor = useTipTapEditor({
    onUpdate: ({ editor }) => {
      // console.log(
      //   `New editor HTML (store this in your database!):\n ${editor.getHTML()}\n\n`
      // );

      // console.log(
      //   `New editor markdown (not sure why you want this):\n ${editor.storage.markdown.getMarkdown()}`
      // );

      if (onUpdate) {
        onUpdate(editor);
      }
    },
    extensions: [
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "list-none flex gap-2",
          style:
            "list-style: none; display: flex; gap: 10px; align-items: center;",
        },
      }),
      StarterKit.configure({
        document: undefined,
      }),
      Markdown,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Enter a title";
          }

          return "Type / to see commands";
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "border bg-border w-full h-[1px] mx-12 px-12",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: defaultContent,
  });

  return editor;
};

export { useEditor };

<div className="list-none"></div>;
