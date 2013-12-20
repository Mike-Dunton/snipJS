var dbQuery = {};

dbQuery.tag = {};
dbQuery.snip = {};
dbQuery.tagStore = {};



dbQuery.tag.getAll = 'SELECT * FROM tags;';
dbQuery.tag.get = function(x) {
		console.log("Select * from tags where tag = '" + x + "';");
		return "Select * from tags where tag = '" + x + "';";
};
dbQuery.tag.insert = function(x) {
	console.log("insert into tags (tag) values('" + x + "');");
	return "insert into tags (tag) values('" + x + "');";
};

dbQuery.snip.insert = function(x) {
	console.log("insert into snips (snip) values('" + x + "');");
	return "insert into snips (snip) values('" + x + "');";
};

dbQuery.tagStore.insert = function(snipBodyID, tagID) {
	console.log("insert into tagStore (tag_uno, snip_uno) values(" + snipBodyID +"," + tagID +");");
	return "insert into tagStore (tag_uno, snip_uno) values(" + snipBodyID +"," + tagID +");";
};

module.exports = dbQuery;
