const slugFromTag = require('./slugFromTag');

module.exports = (tag) => `/tags/${slugFromTag(tag)}`;
