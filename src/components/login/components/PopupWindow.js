let windowObjectReference = null;
let previousUrl = null;

export const PopupWindow = (url, name, callback) => {
  window.removeEventListener("message", callback);

  const minWidth = 500;
  const minHeight = 600;

  var dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  var dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screen.top;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  var left = width / 2 - minWidth / 2 + dualScreenLeft;
  var top = height / 2 - minHeight / 2 + dualScreenTop;

  const strWindowFeatures =
    "toolbar=no, menubar=no, width=" +
    minWidth +
    ", height=" +
    minHeight +
    ", top=" +
    top +
    ", left=" +
    left;

  if (windowObjectReference === null || windowObjectReference.closed) {
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference.focus();
  } else {
    windowObjectReference.focus();
  }
  window.addEventListener("message", (event) => callback(event), false);
  previousUrl = url;
};
