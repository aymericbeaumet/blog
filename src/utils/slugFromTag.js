module.exports = tag =>
  tag
    .trim()
    .replace(/[^a-z0-9🇫🇷-]/gi, '')
    .toLowerCase()
