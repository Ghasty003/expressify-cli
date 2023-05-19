import inquirer from "inquirer";
export async function stack() {
    const answer = await inquirer.prompt({
        name: "stack_name",
        type: "list",
        message: "Select your stack",
        choices: ["JavaScript", "TypeScript"],
    });
    return answer.stack_name;
}
export async function addCors() {
    const answer = await inquirer.prompt({
        name: "cors",
        type: "input",
        message: "Would you love to add `cors`? (y/n)",
        default() {
            return "y";
        }
    });
    return answer.cors;
}
