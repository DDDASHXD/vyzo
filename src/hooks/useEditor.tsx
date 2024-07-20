import { useEditor as useTipTapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";

interface IProps {
  defaultContent?: string;
  onUpdate?: (e: any) => void;
}

const useEditor = ({ defaultContent, onUpdate }: IProps) => {
  const editor = useTipTapEditor({
    onUpdate: ({ editor }) => {
      console.log(
        `New editor HTML (store this in your database!):\n ${editor.getHTML()}\n\n`
      );

      console.log(
        `New editor markdown (not sure why you want this):\n ${editor.storage.markdown.getMarkdown()}`
      );

      if (onUpdate) {
        onUpdate(editor);
      }
    },
    extensions: [
      StarterKit.configure({
        document: undefined,
      }),
      Markdown,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: defaultContent,
  });

  return editor;
};

export { useEditor };
