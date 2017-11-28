var child_process = require('child_process');
var util = require('util');


function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target), callback);
}

copy('./foo', './dest', function (err, data) {
    console.log('===>', err, data);
});