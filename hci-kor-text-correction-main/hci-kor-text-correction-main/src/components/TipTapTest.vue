<template>
  <editor-content
    :editor="editor"
    style="width: 100%; min-height: 100%"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    :editable="true"
  />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
    stopInputHook: {
      type: Function,
      default: (html, text) => {
        html;
        text;
      },
    },
    changeHook: {
      type: Function,
      default: (html, text) => {
        html;
        text;
      },
    },
  },

  data() {
    return {
      editor: null,
      editingHookID: null,
      editorLock: false,
    };
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },

  methods: {
    getText() {
      return this.editor.getText();
    },
    selectText({ from, to, color, bold }) {
      const originAnchor = this.editor.view.state.selection.head;
      // console.log(this.editor.view.state.selection)
      if (color == null) {
        color = "#ffa8a8";
      }
      if (bold == null) {
        bold = false;
      }
      this.editorLock = true;
      this.editor.commands.setTextSelection({ from, to });
      this.editor.chain().focus().setHighlight({ color }).run();
      if (bold) this.editor.commands.setBold();
      else this.editor.commands.unsetBold();
      this.editor.commands.focus(originAnchor);
      this.editor.chain().focus().unsetHighlight().run();
      this.editor.commands.unsetBold();
      this.editorLock = false;
    },
    unselectText({ from, to }) {
      const originAnchor = this.editor.view.state.selection.head;
      this.editorLock = true;
      this.editor.commands.setTextSelection({ from, to });
      this.editor.chain().focus().unsetHighlight().run();
      this.editor.commands.unsetBold();
      this.editor.commands.focus(originAnchor);
      this.editorLock = false;
    },
    unselectAll() {
      const originAnchor = this.editor.view.state.selection.head;
      this.editorLock = true;
      this.editor.commands.selectAll();
      this.editor.chain().focus().unsetHighlight().run();
      this.editor.commands.focus(originAnchor);
      this.editorLock = false;
    },
  },
  mounted() {
    const placeholder = Placeholder.configure({
      placeholder: "작성하고자 하는 내용을 입력하세요!",
    });
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        placeholder,
        Highlight.configure({ multicolor: true }),
      ],
      disablePasteRules: true,
      disableInputRules: true,
      onUpdate: () => {
        if (this.editorLock) return;
        if (this.editingHookID != null) {
          clearTimeout(this.editingHookID);
        }
        this.editingHookID = setTimeout(
          this.stopInputHook,
          1000,
          this.editor.getHTML(),
          this.editor.getText()
        );
        this.$emit("input", this.editor.getHTML());
        this.changeHook(this.editor.getHTML(), this.editor.getText());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.ProseMirror {
  min-height: 100%;
  outline: none;
}
.ProseMirror p {
  display: block;
  font-size: 1.3rem;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
  font-family: "Noto Sans KR", sans-serif;
}
</style>
