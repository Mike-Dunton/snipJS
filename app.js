var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    fs      = require('fs'),
    config  = require('./config'),
    exists  = fs.existsSync(config.db.name),
    sqlite3 = require('sqlite3').verbose(),
    db      = new sqlite3.Database(config.db.name),
    dbQuery = require('./dbquery'),
    app = express();
app.use(express.bodyParser());
db.serialize(function () {
    if(!exists) {
        db.run(config.db.createTags);
        db.run(config.db.createSnip);
        db.run(config.db.createRelation);
    }
});

function compile(str, path) {
        return stylus(str)
                .set('filename', path)
                .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
                { src: __dirname + '/public',
                    compile: compile
                }));
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function (req, res) {
    var tags = [];
    db.parallelize(function() {
        db.each(dbQuery.tag.getAll, function(err, rows) {
            tags.push({id: rows.id, name: rows.tag});
        }, function () {
            console.log(tags);
            res.render('index',
                { title : 'Home',
                   tags : tags } );
            });    
    });
});

app.post('/submit', function(req, res) {
    console.log(req.body);
    var snipBody = req.body.snipCopy,
        snipTags = req.body.theHiddenTagList.split(",");
        snipTagObjects = [];
    db.serialize(function() {
        snipTags.forEach(function(x) {
            db.get(dbQuery.tag.get(x), function(err, row) {
                if( row === undefined) {
                    db.run(dbQuery.tag.insert(x));
                    snipTagObjects.push({id : db.lastID, tag : x});
                } else {
                    snipTagObjects.push({id : row.id, tag: row.tag});
                }
            });    
        });
    }, function() {
            db.serialize(function() {
            db.run(dbQuery.snip.insert(snipBody));
            snipBody = db.lastID;
            snipTagObjects.forEach(function(tag) {
                db.run(dbQuery.tagStore.insert(snipBody, tag.id));
            })
        });
    });
});

app.listen(3000);
