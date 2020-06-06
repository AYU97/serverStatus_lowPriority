var request = require('request')
var express = require('express')
var app = express()

var serverSet = [
    {
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
    },
    {
        "url": "http://offline.boldtech.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://boldtech.co",
        "priority": 7
    },
    {
        "url": "http://google.co.in",
        "priority": 0
    },

]

function serverTest(url, priority) {

    let options = {
        url: url,
        timeout: 5000
    }

    return new Promise((resolve, reject) =>

        request(options, (err, res) => {

            if (err) {
                console.log("There was an error: " + err);
                reject("The server is offline");
            };

             //test if server responds with a positive status 

            if (res) {
           
                if (res.statusCode >= 200 && res.statusCode <= 299) {

                    console.log(`response from ${url} is ${res.statusCode}`);
                    resolve({ "url": url, "priority": priority, "response": res.statusCode });

                } else {

                    reject("The server is offline");

                }

            } else {

                reject("The server is offline ");
            }

        })

    );

}

function findServer() {

    var listOfOnlineServers = []

    var promises = serverSet.map(server => {
        return serverTest(server.url, server.priority)
            .then((resolve) => listOfOnlineServers.push(resolve))
            .catch((error) => {
                console.log("Server " + server.url + " failed with : " + error)
            });
    })

    return new Promise((resolve, reject) =>

        Promise.allSettled(promises).then((values) => {
           // console.log(values)
            if (listOfOnlineServers.length > 0) {

                listOfOnlineServers.sort((onlineServer1, onlineServer2) =>
                    onlineServer1.priority - onlineServer2.priority);

                resolve(listOfOnlineServers[0].url);

            } else {

                reject("No server found online");

            }

        })

    );

};


findServer(serverSet).then(result => {
    console.log("result is : " + JSON.stringify(result))
})





module.exports = {
    findServer : findServer
}