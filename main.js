/**
 *
 *      ioBroker Alexa Connect Adapter
 *
 *      (c) 2018 Stefan Franke
 *
 *      MIT License
 *
 */
 
'use strict';
var utils      = require(__dirname + '/lib/utils'); // Get common adapter utils
var adapter    = utils.Adapter('alexa');

var timer      = null;
var stopTimer  = null;
var isStopping = false;

adapter.on('message', function (obj) {
    if (obj) processMessage(obj);
    processMessages();
});

adapter.on('ready', function () {
    main();
});

adapter.on('unload', function () {
    if (timer) {
        clearInterval(timer);
        timer = 0;
    }
    isStopping = true;
});

function processMessage(obj) {
/*
    if (!obj || !obj.command) return;
    switch (obj.command) {
        case 'alexa': {
            // Try to connect to mqtt broker
            if (obj.callback && obj.message) {
                ping.probe(obj.message, {log: adapter.log.debug}, function (err, result) {
                    adapter.sendTo(obj.from, obj.command, res, obj.callback);
                });
            }
            break;
        }
    }
    */
}

function processMessages() {
    adapter.getMessage(function (err, obj) {
        if (obj) {
            processMessage(obj.command, obj.message);
            processMessages();
        }
    });
}

// Terminate adapter after 30 seconds idle
function stop() {
    if (stopTimer) clearTimeout(stopTimer);

    // Stop only if schedule mode
    if (adapter.common && adapter.common.mode === 'schedule') {
        stopTimer = setTimeout(function () {
            stopTimer = null;
            if (timer) clearInterval(timer);
            isStopping = true;
            adapter.stop();
        }, 30000);
    }
}

function main() {

}
