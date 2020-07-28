const request = require('request');
const fs = require('fs');
const path = require('path');
const http = require('http');
const log4js = require('log4js');

var logger  = log4js.configure({
    appenders: {
        file: { type: 'file', filename: "C:\\Users\\A707992\\NT\\log.log", maxLogSize: 10485760, backups: 20 },
        out: { type: 'stdout' },
    },
    categories: { default: { appenders: ['file', 'out'], level: 'debug' } }
}).getLogger('file'); 

var authUrl = '/rest/is-authenticated';
var sessionUrl = '/rest/site-session';

var authentificationOptions = {
    url: 'https://stghpalm.gsissc.myatos.net/qcbin/authentication-point/authenticate'
};
var isAthenticatedOptions = {};
var getqcSessionOptions = {
    accept: 'application/json',
};

var cookies = {};

function getqcSession(host, login) {
    getqcSessionOptions.url = "https://stghpalm.gsissc.myatos.net/qcbin" + sessionUrl ;
   
    getqcSessionOptions.jar = cookies 
    return new Promise((resolve, reject) => {
        request.post(getqcSessionOptions, function (error, response, body) {
            console.log(response.headers)
            console.log(cookies)
            for (const header of response.headers["set-cookie"]) {
                if (header.indexOf('QCSession') !== -1) {
                    
                    return resolve(200);
                }
            }
            
            return reject(401);
        });
    });
}

 function authentification(login, password, force) {
    login = login.toUpperCase();
    
    authentificationOptions.jar = request.jar(); 
    return new Promise((resolve, reject) => {
        authentificationOptions.url = "https://stghpalm.gsissc.myatos.net/qcbin/authentication-point/authenticate"; 
        authentificationOptions.headers = {
            'Authorization': 'Basic ' + Buffer.from(login + ':' + password).toString('base64')
        }
        request.get(authentificationOptions, function (error, response, body) {
            logger.debug('AUTHENTIFICATION STATUS: ' + response.statusCode);
            if (response.statusCode === 200) {
                logger.info('AUTHENTIFICATION TO ALM SUCCESS');
                // Store cookies by user-rtcHost
                // cookies[utils.properties.alm.almHost + '-' + login] = jar;
                cookies = request.jar(); 
                getqcSession("https://stghpalm.gsissc.myatos.net/qcbin", login)
                    .then(result => resolve('GET HPALM QCSESSION SUCCESS'))
                    .catch(error => reject('GET HPALM QCSESSION FAILED'));
            }
            else {
                reject('AUTHENTIFICATION TO HPALM FAILED');
            }
        });
    });
}

module.exports.authentification = authentification