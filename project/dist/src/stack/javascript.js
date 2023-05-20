import { createSpinner } from "nanospinner";
import { getDependenciesVersion } from "../utils/api.js";
import createJsFiles from "../config/createJsFiles.js";
import success from "../utils/success.js";
import wait from "../utils/wait.js";
import { addCors } from "../inquirer.js";
async function handleJavaScript(projectName) {
  let versions;
  const addcors = await addCors();
  let versionSpinner = createSpinner(
    "fetching project dependencies versions..."
  ).start();
  try {
    versions = await getDependenciesVersion();
    versionSpinner.success({ text: "versions fetched successfully." });
    await createJsFiles(versions, projectName, addcors);
    const spinner = createSpinner("Creating project..").start();
    await wait();
    spinner.stop();
    success(projectName);
  } catch (error) {
    versionSpinner.error({ text: "Error fetching dependencies verion." });
    console.log(error);
  }
}
export default handleJavaScript;
