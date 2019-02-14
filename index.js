const download = require("@now/build-utils/fs/download.js"); // eslint-disable-line import/no-extraneous-dependencies
const path = require("path");
const {
  runNpmInstall,
  runPackageJsonScript
} = require("@now/build-utils/fs/run-user-scripts.js"); // eslint-disable-line import/no-extraneous-dependencies

exports.build = async ({ files, entrypoint, workPath, config }) => {
  if (path.basename(entrypoint) !== "jest.config.js") {
    throw new Error("jest.config.js must be specified as entrypoint");
  }

  console.log("downloading user files...");
  await download(files, workPath);

  console.log("running now-build-jest script...");
  const mountpoint = path.dirname(entrypoint);
  const entrypointFsDirname = path.join(workPath, mountpoint);

  await runNpmInstall(entrypointFsDirname, ["--prefer-offline"]);

  if (await runPackageJsonScript(entrypointFsDirname, "jest --ci --bail")) {
    return {};
  }

  throw new Error(
    `An error running "now-build-jest" script in "${entrypoint}"`
  );
};
