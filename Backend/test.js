const { spawn } = require('child_process');
const fs = require('fs');

/*const getwattage = require('./controller/Wattage.js');

//getwattage();

appliance = [1,2,3,4]
result = ["d","d","f","d"]

var engy = {}
appliance.forEach((appl)=> {
        engy[appl] = result[(appliance.indexOf(appl))]
});

console.log(engy);*/
module.exports = async function Model(inputData){
        

        const inputDataString = JSON.stringify(inputData);
        console.log(inputDataString);
        // Run the Python script and specify the output file
        const pythonProcess = spawn('python', ['model/new_main.py', inputDataString]);

        // Handle output from the script
        pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        const a = fs.readFile('./output.json', 'utf8', (err, data) => {
                if (err) {
                console.error(err);
                return;
                }
                return data

        });
        });
}