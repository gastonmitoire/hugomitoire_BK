import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";

export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  paragraph: Paragraph,
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
};
