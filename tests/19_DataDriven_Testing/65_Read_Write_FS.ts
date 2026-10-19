
import fs from "fs";
import path from "path";

// Always build paths from __dirname. A bare './Users.json' resolves
// against the working directory, so it breaks when run from elsewhere.

const filePath= path.join(__dirname, "Users.json");
console.log("File Path: ", filePath);

const fileData= fs.readFileSync(filePath, "utf-8");
const userDataJSObject= JSON.parse(fileData);
console.log(userDataJSObject);

console.log(userDataJSObject.username);
console.log(userDataJSObject.password);

// Writing Data to a JSON File

const user = {
  name: "Pramod",
  role: "QA Trainer"
};

const jasonData= JSON.stringify(user);
fs.writeFileSync("output.json", jasonData);
console.log("JSON file created successfully");




