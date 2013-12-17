var config = {}

config.db = {}

config.db.user = 'username';
config.db.password = 'password';
config.db.host = 'hostname';
config.db.port = '1234';
config.db.name = 'snip.db';
config.db.createTags = 'CREATE TABLE tags (id INTEGER PRIMARY KEY ASC, tag TEXT)\;';
config.db.createSnip = 'CREATE TABLE snips (id INTEGER PRIMARY KEY ASC, snip TEXT)\;';
config.db.createRelation = 'CREATE TABLE tagStore (tag_uno INTEGER REFERENCES tags(id),snip_uno INTEGER REFERENCES snips(id))\;';

module.exports = config;
