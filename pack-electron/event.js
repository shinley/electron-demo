const remote = require('electron').remote;
const dialog = remote.dialog;

var spawn = require('child_process').execFile;


function onload() {
    if (process.platform == 'win32') {
        mac.disabled = true;
    }
    if (process.platform == 'darwin') {
        windows.disabled = true;
    }
}

function select_project() {
    var options = {};
    options.title = '选择打包目录';
    options.properties = ['openDirectory'];
    dialog.showOpenDialog(options, (res)=>{
        console.log(res);
        project_dir.value = res;
    });
}

function select_output() {
    var options = {};
    options.title = '选择输出目录';
    options.properties = ['openDirectory', 'createDirectory'];
    dialog.showOpenDialog(options, (res)=>{
        console.log(res);
        output_dir.value = res;
    });
}

// 开始打包
function pack() {
    let args = [];
    // 设置electron工程目录
    args.push(project_dir.value);
    // 设置应用程序名称
    args.push(appName.value);
    // 设置输出目录
    args.push('--out=' + output_dir.value)
    // 设置electron的版本
    args.push('--electron-version=6.0.10');
    if (asar.checked) {
        args.push('--asar');
    }
    var os = '';
    if (mac.checked) {
        os += 'darwin';
    }

    if (windows.checked) {
        if (os != '') {
            os +=',';
        }
        os += 'win32';
    }

    if (linux.checked) {
        if (os != '') {
            os +=',';
        }
        os += 'win32';
    }

    if (os != '') {
        args.push('--platform=' + os);
    }
    var cmd = 'electron-packager';
    if (process.platform == 'win32') {
        cmd += '.cmd';
    }
    // 开始执行electron-packager
    // 异步执行
    spawn(cmd, args, (err, stdout, stderr)=> {
       if (err) {
           console.error('stderr', stderr)
           packager_status.innerText = "打包失败";
       } else {
            packager_status.innerText = "打包成功";
       }
    });
    packager_status.innerText = "正在打包, 请稍候...";

}