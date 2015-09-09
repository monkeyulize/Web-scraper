var fs = require('fs');
var tmp = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1="
function read_list(file_name, pat_array, parse, db) {
	fs.readFile(file_name, function(err, data) {
		if(err) throw err;
		else {
			pat_array = data.toString().split("\n");
			for(var i = 0; i < pat_array.length; i++) {
				parse(tmp+pat_array[i]+".PN.&OS=PN/"+pat_array[i]+"&RS=PN/"+pat_array[i], pat_array[i], db);		
			}
			
		}
		
	});
}
exports.read_list = read_list