import { parallelTask, spawnTask } from "@chyzwar/runner";

spawnTask("lint", "yarn", ["biome", "lint", "--write", "."]);
spawnTask("check", "yarn", ["biome", "check", "--write", "."]);

spawnTask("build", "yarn", ["tsc", "--build"]);
spawnTask("build:watch", "yarn", ["tsc", "--build", "--watch", "--preserveWatchOutput"]);

spawnTask("start:configurator", "yarn", ["dev"], {
  cwd: "./packages/configurator",
});

parallelTask("start", ["build:watch", "start:configurator"]);
