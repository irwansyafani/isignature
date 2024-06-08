const fs = require("fs");
const signatures = require("./signatures.json");

let similarities = signatures.map((item) => {
  try {
    item.signature = item?.signature?.split?.(" ");
  } catch (error) {
    return item;
  }
  return item;
});

const gCode = (key) => {
  if (key.length == 1) {
    return "0" + key.toUpperCase();
  } else {
    return key.toUpperCase();
  }
};

/**
 * - getSignature by isignature.
 *
 * @typedef {Object} Result
 * @property {string} value - The exact match extension
 * @property {Array} possibility - The nearest match to your file
 * @property {boolean} match - The boolean answer if the given file is match
 * @property {string} filehex - The short hex value of your file
 *
 * @param {string} filepath is where your file is located (ex: "./book.pdf")
 * @returns {Result} returns an object contains value, hex, possibility answer, and match status
 */
const getSignature = (filepath) => {
  if (filepath) {
    const file = fs.readFileSync(filepath).subarray(0, 50).toJSON().data;
    const filehex = [];

    for (const key in file) {
      filehex.push(gCode(file[key].toString(16)));
    }

    const tenlengthsignature = filehex.slice(0, 50);

    for (let i = 0; i < tenlengthsignature.length; i++) {
      const filtered = similarities.filter(
        (item) =>
          item.signature[i] === tenlengthsignature[i] ||
          item.signature[i] === "??"
      );
      if (filtered.length) {
        similarities = filtered;
      }
    }

    const path = filepath.split("/");
    const ext = path[path.length - 1].split(".")[1]?.toLowerCase();
    let result;

    if (similarities.find((item) => item.extension.includes(ext))) {
      result = {
        value: ext,
        possibility: similarities[0].extension,
        match: true,
        filehex: filehex.slice(0, 10).join(" "),
      };
    } else {
      result = {
        value: similarities[0].extension[0],
        possibility: similarities[0].extension,
        match: false,
        filehex: filehex.slice(0, 10).join(" "),
      };
    }
    return result;
  }
  return {
    value: undefined,
    possibility: undefined,
    match: undefined,
    filehex: undefined,
  };
};

module.exports = { getSignature };
