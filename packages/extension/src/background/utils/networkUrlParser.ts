import logging from "@algosigner/common/logging";

export function parseUrlServerAndPort(urlInput:string):any {
    // In some cases the default URL builder will not work so we default to splitting on failure
    let urlSplit = false;

    // Initialize the server and port as strings
    const returnUrlObj = { "server": "", "port": "" }

    // If the input value is blank just return a blank urlObj
    if (urlInput.length === 0) {
        return returnUrlObj;
    }
    // Check for localhost, in which case we will just split by colon
    if (urlInput.toLowerCase().includes("localhost")) {
        urlSplit = true;
    } 
    else {
        try {
            // Try to build a URL object          
            const urlObj = new URL(urlInput);

            // If the creation worked we will have a hostname and port
            const hostname = urlObj.hostname;
            returnUrlObj.port = urlObj.port;

            // If we are missing a hostname then the url didn't parse correctly use a split method
            if (!urlObj.hostname) {
                urlSplit = true;
            }
            else {
                // Set the base server to the hostname
                returnUrlObj.server = hostname;

                // Work backwards adding additional information but leave port separate for algod and indexer creation
                if (urlObj.password) {
                    returnUrlObj.server = urlObj.password + '@' + returnUrlObj.server;
                }
                if (urlObj.username) {
                    returnUrlObj.server = urlObj.username + ':' + returnUrlObj.server;
                }
                if (urlObj.protocol) {
                    returnUrlObj.server = urlObj.protocol + '//' + returnUrlObj.server;
                }
            }
        }
        catch {
            urlSplit = true;
        }
    }

    if (urlSplit) {
        try {
            const urlArr = urlInput.split(':');
            // A url with a 2 or 3 length may have either a user:pass or port
            // If there is an 8 length split it is an IPv6 address without a port or protocol
            if (urlArr.length > 1) {
                const chkport = urlArr[urlArr.length-1];
                // Now check for the IPV6 localhost and mask components before popping the array
                if (chkport[0] !== '/' && chkport !== '0' && (!chkport.includes(']'))) {
                    const potentialPort = urlArr.pop();
                    // Quick cast to ensure port is numeric but a string
                    returnUrlObj.port = (parseInt(potentialPort) || undefined).toString();
                }    
            }
            returnUrlObj.server = urlArr.join(':');
        }
        catch {
            returnUrlObj.server = urlInput;
        }
    }

    // If we dont have a value for server something went wrong 
    if(returnUrlObj.server.length === 0) {
        logging.log(`Error parsing url:\n${urlInput}\nSetting value for server as a blank value.`);
    }

    // Returns an object with server and port or blank values in failures 
    return returnUrlObj;
}