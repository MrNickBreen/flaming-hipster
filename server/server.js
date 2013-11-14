/* globals require, process, console */

/**
 * Created by quinn on 9/29/13.
 */

var restify = require('restify');
var mongoose = require('mongoose');

var server = restify.createServer();

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/flaming_hipster');

var collections = {};

/* Models */
var Startup = mongoose.model('Startups', { time: Date });

var emoListSchema = new mongoose.Schema({ hangout: String });
var EmoList = mongoose.model('EmoList', emoListSchema );

var hipsterSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emoItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmoList' }]
});
var Hipster =  mongoose.model('Hipsters', hipsterSchema);

var Accessory = mongoose.model('Accessories', {
	name: String
});

var currentStartup = new Startup({ time: new Date() });
currentStartup.save(function (err) {
    "use strict";
    console.log('Current Startup Time Saved');
});

server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/api/:version/:collection', function (request, response, next) {
    "use strict";
    console.log('requesting a get...'+request.params.collection);
    //TODO: This should be procedural, not a switch statement?
    var db, modelName;
    switch (request.params.collection) {
        case "hipsters":
            db = Hipster;
            modelName = 'hipster';
            break;

		case "accessories":
			db = Accessory;
			modelName = 'accessory'
			break;

        case "emoLists":
            db = EmoList;
            modelName = 'emoList'
            break;

        default:
            response.send({ error: 'No such collect: ' + request.params.collection});
    }

    if (request.query.ids !== undefined && request.query.ids.length > 0) {
        // NB: This is how you create queries for multiple ids (return records were ids are in this array). This is used
        // for sideloading {async=true}
        db.find({_id: { $in: request.query.ids}}, function (err, result) {
            var restResponse = {};
            restResponse[modelName] = result;
            response.send(restResponse);
        });
    }
    else {
        console.log(request.params.collection);
        if (request.params.collection === "hipsters") {
            // TODO: use populate and strip out the emoItems and replace with id's to make a relational object return
            //db.find(request.query).populate('emoItems').exec(function (err, results) {
            db.find(request.query, function (err, results) {
                console.log('find all hipsters!!');

                var body = {};
                body[modelName] = results;
                response.send(body);
            });
        }
        else {
            db.find(request.query, function (err, results) {
                console.log('find all!!');
                var body = {};
                body[modelName] = results;
                response.send(body);
            });
        }
    }



    /*if (request.params.collection === "hipsters") {
        // NB: The .lean.exec is used to serialize the data before returning it to ember. mongoose doesn't allow
        // editing of results
        // TODO: generalize this to work for all ember models.
        db.find(request.query).lean().exec(function (err, results) {

            console.log('here is the results of hipser find');
            console.log(results);

            for (var i=0; i < results.length; i=i+1) {
                if (results[i].emoItems !== undefined && results[i].emoItems.length > 0) {
                    var emoItemArray = [];

                    for (var k=0; k < results[i].emoItems.length; k=k+1) {
                        emoItemArray.push(results[i].emoItems[k]['_id'].toString());
                    }
                    results[i].emoItems = [];
                    results[i].emoItems = emoItemArray;
                }
            }

            var body = {};
            body[modelName] = results;
            response.send(body);
        });
    }
    else {
        console.log(request.query);
        if (request.query.ids !== undefined && request.query.ids.length > 0) {
            // NB: This is how you create queries for multiple ids (return records were ids are in this array)
            db.find({_id: { $in: request.query.ids}}, function (err, result) {
                var restResponse = {};
                restResponse[modelName] = result;
                response.send(restResponse);
            });
        }
        else {
            db.find(request.query, function (err, results) {
                console.log('find all!!');
                var body = {};
                body[modelName] = results;
                response.send(body);
            });
        }
    }*/

    return next();
});

server.get('/api/:version/:collection/:id', function (request, response, next) {
    "use strict";

	var db, dbName;
	switch (request.params.collection) {
		case "hipsters":
			db = Hipster;
			dbName = 'hipster';
			break;
	}

	db.find({_id: request.params.id}, function (err, result) {
		var restResponse = {};
		restResponse[dbName] = result;
		response.send(restResponse);
	});

    return next();
});

server.put('/api/:version/:collection/:id', function (request, response, next) {
    "use strict";
	var id = request.params.id;

	// TODO: Proceduralize this
    var db, dbName, body;
    switch (request.params.collection) {
        case "hipsters":
            db = Hipster;
			dbName = 'hipster';
            break;

        default:
            return false;
    }

	body = request.body[dbName];

	db.update({ _id: id }, body, {},
		function(err, numberAffected, raw) {
			db.find({ _id: id }, function (err, result) {
				var rest = {};
				rest[dbName] = result;
				response.send(rest);
			});
		});

    return next();
});

server.post('/api/:version/:collection', function (request, response, next) {
    "use strict";
    if (request.context.collection == "hipsters") {
        console.log('saving hipster');
        console.log(request.context);
        var newHipster = new Hipster({
            firstName: request.context.hipster.firstName,
            lastName: request.context.hipster.lastName,
            emoItems: request.context.hipster.emoItems
        });

        newHipster.save(function (err, savedObj) {
            console.log('Add patient err nad saved obj');
            console.log(err);
            console.log(savedObj);

            response.send({
                hipster: savedObj
            });
        });

        return next();
    }
    else if(request.context.collection == "emoLists") {
        console.log('saving emolist');
        var newEmoList = new EmoList({
            hangout: request.context.emoList.hangout
        });

        newEmoList.save(function (err, savedObj) {
            response.send({
                emoList: savedObj
            });
        });

        return next();
    }
});

server.get(/\/?.*/, restify.serveStatic({
    directory: './client',
    default: 'index.html'
}));


server.listen(process.env.PORT || 8080, function () {
    "use strict";
    console.log('%s listening at %s', server.name, server.url);
});