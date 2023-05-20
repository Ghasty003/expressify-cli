#!/usr/bin/env node
import { Command } from "commander";
import { stack } from "./src/inquirer.js";
import handleJavaScript from "./src/stack/javascript.js";
const commander = new Command();
commander
  .command("create <project-name>")
  .description("Create a new project")
  .action(async (projectName) => {
    try {
      const stackName = await stack();
      if (stackName === "JavaScript") {
        // console.log(process.argv);
        handleJavaScript(projectName);
      }
    } catch (error) {
      const e = error;
      console.log(`${e.message}, ${e.cause}`);
    }
  });
commander.parse(process.argv);
