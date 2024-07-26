import { Editor, useEditor } from "@tiptap/react";
import { ExtensionKit } from "@/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

interface IProps {
  defaultContent?: string;
  onUpdate?: (e: any) => void;
}

export const useBlockEditor = ({ defaultContent, onUpdate }: IProps) => {
  const editor = useEditor({
    autofocus: true,
    onCreate: ({ editor }) => {},
    extensions: [...ExtensionKit()],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full",
      },
    },
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
  });

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  window.editor = editor;

  return { editor, characterCount };
};
