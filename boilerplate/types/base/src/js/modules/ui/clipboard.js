const noop = () => {};

export const copyData = (window, data, options = {}, cb = noop) => {

  const defaultOptions = { mimeType: "text/html" };
  const { document } = window;
  const opts = Object.assign({}, defaultOptions, options);
  const onCopy = (e) => {

    e.clipboardData.setData(opts.mimeType, data);
    e.preventDefault();
    document.removeEventListener("copy", onCopy);
    cb(e);
  };
  document.addEventListener("copy", onCopy);
  document.execCommand("copy");
};
