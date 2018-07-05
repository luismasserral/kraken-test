const FILE_MAX_SIZE = 2097152;
const FILES_FORBIDDEN_EXTENSIONS = [
  "exe",
  "bat",
  "msi",
  "com",
  "msc",
  "jar",
  "jar",
  "pif",
  "vb",
  "vbs",
  "ws",
  "wsf",
  "wsc",
  "wsh",
  "reg"
];

export function isFileValid(file) {
  return isFileSizeValid(file) && isFileExtensionValid(file);
}

export function getHumanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));

  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB"][i]
  );
}

function isFileSizeValid(file) {
  return file && file.size && file.size <= FILE_MAX_SIZE;
}

function isFileExtensionValid(file) {
  return (
    file &&
    file.name &&
    FILES_FORBIDDEN_EXTENSIONS.indexOf(file.name.split(".").pop()) === -1
  );
}
