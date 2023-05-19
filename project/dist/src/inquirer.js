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
