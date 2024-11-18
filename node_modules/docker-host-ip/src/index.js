import childProcess from 'child_process';
import isString from 'lodash.isstring';
import isArray from 'lodash.isarray';

const handleIpRouteResults = (callback) => (error, stdout, stderr) => {
	
	if (stdout && isString(stdout)) {

        const output = stdout;

        const match = output.match(/default via ((?:[0-9]{1,3}\.){3}[0-9]{1,3}) dev eth0/);

        let ip = undefined;
        if (isArray(match) && match.length >= 2) {
            ip = match[1];
        }

        if (ip) {
        	callback(undefined, ip);
        } else {
        	callback(new Error("Unable to find ip, perhaps call while not within a Docker container"), undefined);
        }        
    } else if (error) {
	    
	    callback(error, undefined);
    } else if (stderr) {

    	callback(new Error(stderr), undefined);
    } else {

    	callback(new Error("No results or feedback given"), undefined);
    }
}

export default function(callback) {
    try {
        
        childProcess.execFile("/sbin/ip", ["route"], handleIpRouteResults(callback));                    
    } catch(error) {

    	if (callback) {
	        callback(error, undefined);
    	}
    }
}