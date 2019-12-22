const vscode = require('vscode');
const getfolders = require('./getfolder')

class BatRunner {

    runCmd(cmdline) {
        var exec = require('child_process').exec;
        exec(`${cmdline}`, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                vscode.window.showErrorMessage(error.message);
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            vscode.window.showErrorMessage(stderr);
        });
    }

    runCmdWithoutErrorMsg(cmdline)
    {
        var exec = require('child_process').exec;
        exec(`${cmdline}`, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });
    }

    runBat(path) {
        const { spawn } = require('child_process');
        var folder = getfolders.getCurrentWorkspaceFolder();
        console.log(`${folder}${path}`);
        const bat = spawn('cmd.exe', ['/c', `${folder}${path}`]);


        bat.stdout.on('data', (data) => {
            console.log(data.tostring());
        });

        bat.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`exit with code: ${code} `);
        });
    };

    runCmdFuck(cmdline, path) {
        getfolders.generateBat(path + "temp.bat", cmdline);
        this.runBat(path + "temp.bat");
    }

    

    test() {
        vscode.window.showInformationMessage('Starting generator test.');
    }
}

exports = module.exports = new BatRunner;
