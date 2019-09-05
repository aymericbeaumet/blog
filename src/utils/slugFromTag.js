module.exports = tag =>
  tag
    .trim()
    .replace(/[.\s]/gi, '')
    .toLowerCase()
