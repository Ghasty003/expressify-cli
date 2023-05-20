import fs from "fs/promises";
async function createJsFiles(versions, projectName, addcors) {
    const files = new Map();
    const folders = ["routes", "models", "controllers"];
    files.set("server.js", `import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRoute from "./routes/todo";

dotenv.config();

const app = express();

app.use(cors());
app.use("/api", todoRoute);

app.listen(3000, () => {
    console.log("server started on port 3000");
});
      `);
    files.set(".env", "DB_URI=mongodb://localhost:27017/todo");
    files.set(".gitignore", `node_modules
.env
  `);
    addcors === "y" || addcors === "yes" ?
        files.set("package.json", `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "scripts": {
        "dev": "node server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "dotenv": "^${versions[0]}",
        "express": "^${versions[1]}",
        "mongoose": "^${versions[2]}"
    },
    "devDependencies": {
        "cors": "^2.8.5"
    }
}
  `) :
        files.set("package.json", `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "scripts": {
        "dev": "node server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "dotenv": "^${versions[0]}",
        "express": "^${versions[1]}",
        "mongoose": "^${versions[2]}"
    }
}
  `);
    try {
        await fs.mkdir(projectName);
        for (let folder of folders) {
            await fs.mkdir(`./${projectName}/${folder}`);
            if (folder === "routes") {
                await fs.writeFile(`./${projectName}/${folder}/todo.js`, `import { Router } from "express";
import { todo } from "../controller/todo.js"
        
const router = Router();

router.get("/todo", todo);

export default router;
        `);
                continue;
            }
            if (folder === "controllers") {
                await fs.writeFile(`./${projectName}/${folder}/todo.js`, `export function todo(req, res) {
  res.json("Hello, world!");
}
        `);
                continue;
            }
            if (folder === "models") {
                await fs.writeFile(`./${projectName}/${folder}/todo.js`, `import { model, Schema } from "mongoose"
const todoSchema = new Schema({
  todo: {
    type: String
  }
});

export default model("todos", todoSchema);
        `);
            }
        }
        for (let file of files) {
            await fs.writeFile(`./${projectName}/${file[0]}`, file[1]);
        }
    }
    catch (error) {
        const e = error;
        throw new Error(`${e.message}, ${e.cause}`);
    }
}
export default createJsFiles;
