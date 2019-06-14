module.exports = tag =>
  `/tags/${tag
    .trim()
    .replace(/[^a-z0-9🇫🇷-]/gi, '')
    .toLowerCase()}`
