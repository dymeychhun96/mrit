let clipboard = new ClipboardJS(".copyBtn");

clipboard.on("success", function (e) {
  showToast("Copied!");
  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
});
