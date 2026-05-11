var express = require('express');
var path = require('path');
var {showTargets} = require('../Targets gRPC/Clients/TargetApp');
var {progressTracker} = require('../Progress/client/app');
var {showEvents} = require('../KeyDates/client/app');

var app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/Targets', function(req, res){
    showTargets(function(err, response){
        if(err) res.status(500).send("Error fetching targets");
        else res.json(response);
    })
})

app.get('/api/progress', function(req, res){
    progressTracker(function(err, response){
        const targetId = req.query.targetId;
        const country = req.query.country;
        if(!targetId){
            res.status(400).send("Please provide a targetId query parameter.");
            res.end();
            return;
        }
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeadåer('Connection', 'keep-alive');
        
    if(err) {
            res.status(500).send("Error fetching progress")
            res.end();
            return;        
        }
        res.write(`data: ${JSON.stringify(response)}\n\n`);
    })
})

app.post('/api/events', function(req, res){
    
        const{ targetId, date, location, email } = req.body;
        if(!targetId || !date || !location || !email){
            return res.status(400).send("Please fill in all fields.");     
        }
        showEvents(targetId, date, location, email, function(err, response){
            if(err) res.status(500).send("Error saving event");
            else res.json({message: "Event saved successfully"});
        })
})

app.listen(3000, function(){
    console.log("Express server running on port 3000");
})  