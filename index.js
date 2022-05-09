function executeCommand(command, callback) {
    console.log("Loading...");
    const exec = require("child_process").exec;
    return exec(command, (error, stdout, stderr) => {
      if (error) {
        callback(stderr);
      }
      callback(stdout);
    });
  }
  
  let cmd = `${
    process.argv[2].split(" ")[0] === "i" ? "npm i" : "npm run"
  } ${process.argv.slice(2).join(" ")}`;
  
  executeCommand(cmd, (output) => {
    console.clear();
    let outputs = output.split(require("os").EOL);
    let fs = require("fs");
    let log = "";
    outputs.forEach((o, idx) => {
      console.log(`Line no. ${idx} : ${o}`);
      log += `Line no. ${idx} : ${o} \n`;
    });
    let timeDate = require("moment")().format("DD MMM YYYY hh:mm a");
    fs.writeFile(
      `Log of npm command ${process.argv.slice(2).join(" ")} ${timeDate}.txt`,
      log,
      (err) => {
        console.error(err);
      }
    );
  });