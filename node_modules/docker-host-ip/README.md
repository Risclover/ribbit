# docker-host-ip

Node module to retrieve the Docker Host IP from within a Docker container

## Usage

The module is a function that expects to be passed a callback as the only parameter. The callback's parameters should be in standard Node format: `(error, result)`

__Example__

``` javascript
import dockerHostIp from 'docker-host-ip';

dockerHostIp( (error, result) => {
	
	if (result) {
		
		console.log("Awesome, we're within a Docker container with Host IP:", result);
	} else if (error) {
		
		console.log("Awww, we got an error. We're probably not in a Docker container...to be safe the error is:", error);
	}
});