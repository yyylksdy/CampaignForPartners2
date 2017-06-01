/**
 * Created by YoYo on 5/31/17.
 */
require('rootpath')();
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoClient = mongodb.MongoClient;
var ObjectID = require("mongodb").ObjectID;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
app.get('/getcampaign', function (req, res) {
    mongoClient.connect("mongodb://localhost:27017/campaignforpartners", function(err, db){
        if(err){
            console.log(err);
            res.send("Error happened");
        }else {
            db.collection("adcampaign").find().toArray(function (err, result) {
                if(!err){
                    res.send(result);
                }else {
                    res.send("fail");
                }
                db.close();
            });
        }
    });
});
app.delete('/getcampaign/:id',function (req,res) {
    var id = req.params.id;
      console.log("delete"+id);
    mongoClient.connect("mongodb://localhost:27017/campaignforpartners", function(err, db){
        db.collection('adcampaign', {}, function(err, adcampaign) {
            adcampaign.remove({_id: ObjectID(id)}, function(err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                db.close();
            });
        });
    });

});
app.post('/addcampaign', function (req, res) {
    mongoClient.connect("mongodb://localhost:27017/campaignforpartners", function(err, db){
        if(err){
            console.log(err);
            res.send("Error happened while connecting to hte database");
        }else {
            var current = new Date().getTime();
            console.log(new Date(req.body.starttime).getTime());
            var exp = new Date(req.body.starttime).getTime()+req.body.duration*1000;
          //  exp = parseInt(exp) + parseInt(req.body.duration)*1000;
            console.log(req.body.duration*1000);
            console.log(current);
           if(current>exp){
               res.send("Time Error happened");
           }else{
               db.collection("adcampaign").insert(req.body, function (err, result) {
                   if(!err){
                       res.send("successful");
                   }else {
                       res.send("fail");
                   }
                   db.close();
               });
           }
          //   stdout.write(current>exp);

        }
    });
});
app.post('/startofalse/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    mongoClient.connect("mongodb://localhost:27017/campaignforpartners", function (err, db) {
        if (err) {
            res.send("Error happened while connecting to hte database");
        } else {


            db.collection('adcampaign').update(
                {_id: ObjectID(id)},
                {$set: {star: "false"}},
                {collation: {locale: "fr", strength: 1}}
            );
            // alert("fff");

        }
        db.close();
    });



});
app.post('/startotrue/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    mongoClient.connect("mongodb://localhost:27017/campaignforpartners", function(err, db){
        if(err){
            res.send("Error happened while connecting to hte database");
        }else {
            //         db.collection('messages').find({_id: ObjectID(id)}).update('star','false'), {
            //          $set:{
            //          'star':'true'
            //     }
            //
            // };
            db.collection('adcampaign').update(
                {_id: ObjectID(id)},
                { $set: { star: "true" } },
                { collation: { locale: "fr", strength: 1 } }
            );
            // alert("fff");

        }
        db.close();
    });
});

// start server
var server = app.listen(3001, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
