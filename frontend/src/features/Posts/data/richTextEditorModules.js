export const richTextEditorModules = {
  keyboard: {
    bindings: {
      tab: {
        key: 9,
        handler: function (range, context) {
          return true;
        },
      },
    },
  },
  toolbar: [
    [
      "bold",
      "italic",
      "link",
      "strike",
      "code",
      { script: "super" },
      { header: 1 },
    ],
    [{ list: "bullet" }, { list: "ordered" }],
    ["blockquote", "code-block"],
  ],
};
