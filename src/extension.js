/*
 * @Date: 2019-09-21 21:23:38
 * @LastEditors: Wang Junbo
 * @LastEditTime: 2019-09-25 12:32:28
 */

exports.activate = function (context) {
    console.log("verilog extension activited");
    require('./verilogtest')(context);
    require('./generator')(context);
    require('./simulater')(context);
    require('./completion')(context);
};
exports.deactivate = function () {
    console.log("Virlog extension terminated.")
};