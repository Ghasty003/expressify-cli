#!/usr/bin/env node
import { Command } from "commander";
import { stack } from "./src/inquirer";
import handleJavaScript from "./src/stack/javascript";
const commander = new Command();
commander
    .command("create <project-name>")
    .description("Create a new project")
    .action(async (projectName) => {
    const stackName = await stack();
    if (stackName === "JavaScript") {
        // console.log(process.argv);
        handleJavaScript(projectName);
    }
});
commander.parse(process.argv);
