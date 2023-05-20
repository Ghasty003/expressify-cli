#!/usr/bin/env node

import { Command } from "commander";
import { stack } from "./src/inquirer";
import handleJavaScript from "./src/stack/javascript";

const commander = new Command();

commander
  .command("create <project-name>")
  .description("Create a new project")
  .action(async (projectName: string) => {
    try {
      const stackName = await stack();

      if (stackName === "JavaScript") {
        handleJavaScript(projectName);
        
        return;
      }

      console.log("Feature coming soon..");
    } catch (error) {
      const e = error as Error;
      console.log(`${e.message}, ${e.cause}`);
    }
  });

commander.parse(process.argv);
