var exec = require("child_process").exec;
var querystring = require("querystring"), fs = require("fs");
var parse = require('./parse').parse;

function start(response, postData, database) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';
		
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData, database) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	
	var tmp_url = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=";
	postData = querystring.parse(postData).text;
	var url = tmp_url+postData+".PN.&OS=PN/"+postData+"&RS=PN/"+postData;
	
	
	
	parse(url, postData, database, function(err) {
		if(err) 
		{
			throw err;
		}
		else
		{

			database.patents.find({_id: postData}, function(err, result) {
				if(err) throw err;
				var tmp = (result[0].Title+"\n"+result[0].Abstract);
				response.write(tmp);
				response.end();	
			
			});

			
		}
	
	});
	
	
	
	//response.write("You've sent: " + querystring.parse(postData).text);
	
}



exports.start = start;
exports.upload = upload;
