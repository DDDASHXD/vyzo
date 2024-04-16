import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: `
    <h1>🚀 Welcome to Vyzo!</h1><p>Vyzo is a brain organizing and note taking tool, helping you focus only on what you need, and that is very easy to navigate.</p><p>This includes:</p><ul><li><p>An easy to learn markdown editor</p></li><li><p>Extensive search capabilities</p></li><li><p>Code bases</p></li><li><p>Interactive code editors</p></li><li><p>Easy linking between files</p></li><li><p>Note taking on powerpoints and PDF's</p></li><li><p>Easy-to-learn markdown wysiwyg shortcuts</p><ul><li><p>And exporting to markdown, pdf and plain html!</p></li></ul></li><li><p>And much, much more!</p></li></ul>
    `,
  });

  return <EditorContent editor={editor} />;
};
