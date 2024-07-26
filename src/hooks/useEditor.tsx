import { useEditor as useTipTapEditor } from "@tiptap/react";
import ExtensionKit from "@/extensions/extension-kit";

interface IProps {
  defaultContent?: string;
  onUpdate?: (e: any) => void;
}

const useEditor = ({ defaultContent, onUpdate }: IProps) => {
  const editor = useTipTapEditor({
    autofocus: true,
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
    content: defaultContent,
  });

  return editor;
};

export { useEditor };

<div className="list-none"></div>;
