import figlet from "figlet";
import gradient from "gradient-string";

async function success(projectName: string) {
  const message = "Success!";

  figlet(message, (err, data) => {
    err && console.log(err);
    console.log(gradient.pastel.multiline(data));

    console.log(`Now run: 
  
cd ${projectName}
npm install
npm run dev
    `);
  });
}

export default success;
