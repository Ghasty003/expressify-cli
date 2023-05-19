import fs from "fs/promises";
import { createSpinner } from "nanospinner";
import success from "../utils/success";
import wait from "../utils/wait";
import { addCors } from "../inquirer";
async function handleJavaScript(projectName) {
    const files = new Map();
    const addcors = await addCors();
    files.set("server.js", `const express = require("express");
    const cors = require("cors");

const app = express();

app.use(cors())

app.listen(3000, () => {
    console.log("server started on port 3000");
});
    `);
    files.set(".env", "DB_URI=mongodb://localhost:27017");
    files.set(".gitignore", `node_modules
.env
  `);
    addcors === "y" || addcors === "yes" ?
        files.set("package.json", `{
    "name": "",
    "version": "1.0.0",
    "description": "",
    "type": "commonjs",
    "scripts": {
        "dev": "node server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "mongoose": "^6.9.2"
    },
    "devDependencies": {
        "cors": "^2.8.5"
    }
}
  `) :
        files.set("package.json", `{
    "name": "",
    "version": "1.0.0",
    "description": "",
    "type": "commonjs",
    "scripts": {
        "dev": "node server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "mongoose": "^6.9.2"
    },
    "devDependencies": {
        "cors": "^2.8.5"
    }
}
  `);
    try {
        await fs.mkdir(projectName);
        for (let file of files) {
            await fs.writeFile(`./${projectName}/${file[0]}`, file[1]);
        }
        const spinner = createSpinner("Creating project..").start();
        await wait();
        spinner.stop();
        success(projectName);
    }
    catch (error) {
        console.log(error);
    }
}
export default handleJavaScript;