var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    fs      = require('fs'),
    config  = require('./config'),
    exists  = fs.existsSync(config.db.name),
    sqlite3 = require('sqlite3').verbose(),
    db      = new sqlite3.Database(config.db.name),
    app = express();

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


app.get('/', function (req, res) {
    res.render('index', 
        { title : 'Home' }
    )
});

app.listen(3000);
