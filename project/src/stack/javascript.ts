import { createSpinner } from "nanospinner";
import { getDependenciesVersion } from "../utils/api";
import createJsFiles from "../config/createJsFiles";
import success from "../utils/success";
import wait from "../utils/wait";
import { addCors } from "../inquirer";

async function handleJavaScript(projectName: string) {

  let versions: string[];
  const addcors = await addCors();

  let versionSpinner = createSpinner("fetching project dependencies versions...").start();
  
  try {
    versions = await getDependenciesVersion();

    versionSpinner.success({ text: "versions fetched successfully."})

    await createJsFiles(versions, projectName, addcors);

    const spinner = createSpinner("Creating project..").start();
    await wait();
    spinner.stop();
    
    success(projectName);

  } catch (error) {
    versionSpinner.error({ text: "Error fetching dependencies verion."});
    console.log(error);
  }
}

export default handleJavaScript;
