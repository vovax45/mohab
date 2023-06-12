function copy() {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    document.execCommand("copy");
    contextMenu.style.visibility = "hidden";
  }
}

function refreshPage() {
  window.location.reload();
  contextMenu.style.visibility = "hidden";
}

function paste() {
  const text = navigator.clipboard.readText();
  text.then(clipText => {
    document.execCommand('paste');
    contextMenu.style.visibility = "hidden";
  });
}