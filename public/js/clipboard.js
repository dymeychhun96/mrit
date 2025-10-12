let clipboard = new ClipboardJS(".copyBtn", {
  text: function (trigger) {
    const target = document.querySelector(
      trigger.getAttribute("data-clipboard-target")
    );
    const text = target.value.trim();

    if (!text) {
      showToast("Nothing to copy!", toastBackgound.info);
      return "";
    }
    return text;
  },
});

clipboard.on("success", function (e) {
  showToast("Copied!");
  e.clearSelection();
});
