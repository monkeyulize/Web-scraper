var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var databaseUrl = "mydb";
var collections = ["patents"]
var db = require("mongojs").connect(databaseUrl, collections); 

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle, db);


