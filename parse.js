var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
function parse(url, filename, db, callback) {
	request(url, function(err, response, body) {
		if (err)
			throw err;
		body = body.substring(body.indexOf("United States Patent", 43), body.indexOf("* * * * *"));
		$ = cheerio.load(body);
		var elems = new Array();
		$("TD").each(function() {
			if($(this).text())
			{
				elems.push($(this).text().trim());
			}
		})
		var pat_title = $("font").text().trim();
		var pat_abs = $("P").first().text().trim();
		var pat_num = elems[0];
		var pat_auth = elems[1];
		var pat_date = elems[2];
		
		var temp = "Title: " + pat_title + "\nNumber: " + pat_num + "\nAuthor: " + pat_auth + "\nDate: " + pat_date + "\nAbstract: " + pat_abs;
			
		db.patents.save(
		{
			_id: filename.trim(),
			Title: pat_title,
			Number: pat_num,
			Author: pat_auth,
			Date: pat_date,
			Abstract: pat_abs	
		},
		function(err, saved)
		{
			if( err || !saved ) console.log("Patent not saved");
			else 
			{
				console.log("Patent saved");
			}		
		});	
				
		fs.writeFile(filename.trim(), temp, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		});	
		callback();
	});	
	
	
}

exports.parse = parse;

