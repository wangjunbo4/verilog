/*
 * @Date: 2019-09-21 21:23:38
 * @LastEditors: Wang Junbo
 * @LastEditTime: 2019-09-25 12:32:28
 */

const vscode = require('vscode');

exports.activate = function (context) {
    console.log("verilog extension activited");
    console.log(vscode);
    require('./verilogtest')(context);
    require('./generator')(context);

};
exports.deactivate = function () {
    console.log("Virlog extension terminated.")
};