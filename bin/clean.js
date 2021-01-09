#!/usr/bin/env node
// This lets us remove files on all platforms. Notably, `rm` is missing on Windows.
const path = require('path');
const rm = require('rimraf');

const distPath = path.join(__dirname, '..', 'dist');

rm.sync(distPath);
