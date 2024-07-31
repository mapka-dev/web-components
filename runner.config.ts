import {spawnTask, parallelTask} from "@chyzwar/runner";

spawnTask("build:watch", 
  "yarn", ["build:watch"] 
);

spawnTask("start:configurator", 
  "yarn", ["dev"], 
  {
    cwd: "./packages/configurator",
  }
);


parallelTask("start", [
  "build:watch", 
  "start:configurator",
]);