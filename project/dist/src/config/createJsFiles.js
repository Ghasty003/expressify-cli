import fs from "fs/promises";
async function createJsFiles(versions, projectName, addcors) {
    const files = new Map();
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
      "dotenv": "^${versions[0]}",
      "express": "^${versions[1]}",
      "mongoose": "^${versions[2]}"
    }
}
  `);
    try {
        await fs.mkdir(projectName);
        for (let file of files) {
            await fs.writeFile(`./${projectName}/${file[0]}`, file[1]);
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export default createJsFiles;
