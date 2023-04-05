const util = require('util');
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
module.exports = async function Model(inputData) {

        const inputDataString = JSON.stringify(inputData);
        console.log(inputDataString, "nodejs");
        // Run the Python script and specify the output file
        const pythonProcess = spawn('python', ['model/new_main.py', inputDataString]);

        // Handle output from the script
        pythonProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data} nodejs`);
        });

        pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
        });

        const readFile = util.promisify(fs.readFile);
        const data_n = await new Promise((resolve, reject) => {

                pythonProcess.on('close', (code) => {
                        console.log(`child process exited with code ${code}`);
                        readFile('./output.json', 'utf8')
                                .then((data) => {
                                        console.log(data, 'data1');
                                        resolve(data);
                                })
                                .catch((err) => {
                                        console.error(err, 'err');
                                        reject(err);
                                });
                });
        });

        console.log(data_n, 'data_n nodejs mai');
        return data_n;
}


