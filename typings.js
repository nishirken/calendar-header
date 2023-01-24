const { execSync } = require("child_process");

execSync("mv ./dist/dist/index.d.ts ./dist/index.d.ts && rm -rf dist/dist");
