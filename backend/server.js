const express = require('express');
const bodyParser = require('body-parser');
const request= require('request');
const axios = require('axios');

var app = express();

const port = 3000;
const oauth = require('./jira_api/oauth_api');
const base_url = 'http://jira.gocontact.pt';

app.use(bodyParser.json());

/*-------ISSUES-------*/

app.get('/issues/:boardid', (req, res)=> {
   var boardId = req.params.id;

   // if(!boardId){
   //    return res.status(404).send();
   // }

   let query = base_url+`/rest/agile/1.0/board/${boardId}/issue`;

    request.get({url:query, oauth:oauth, qs:null, json:true}, function (e, r, user) {
            res.send(r);
        }
    );
});

app.get('/issue/:id', (req, res)=> {
    var id = req.params.id;

   let query = base_url + `/rest/agile/1.0/issue/${id}`;

    request.get({url:query, oauth:oauth, qs:null, json:true}, function (e, r, user) {
            res.send(r);
        }
    );
});

/*-------BOARDS-------*/

app.get('/boards', (req, res)=> {
    let query = base_url + '/rest/agile/1.0/board';

    request.get({url:query, oauth:oauth, qs:null, json:true}, function (e, r, user) {
            res.send(r);
            console.log(e);
        }
    );
});

app.get('/boards/:id', (req, res)=> {
    var id = req.params.id;

    let query = base_url + `/rest/agile/1.0/board/${id}`;

    request.get({url:query, oauth:oauth, qs:null, json:true}, function (e, r, user) {
            res.send(r);
        }
    ).on('error', (err)=>{
       res.status(404).send();
    });

    // axios.get(query, {headers: oauth})
    //     .then((response)=> {
    //        console.log(response);
    //     }, (error)=> {
    //        console.log(error);
    //     })
});

app.get('/search', (req, res)=> {
   let query = base_url + "/rest/api/2/search?jql=";

   query += encodeURIComponent(req.query.jql);

   if(req.query.jql == null || req.query.jql == undefined){
      return res.status(404).send('Missing the jql parameter');
   }

    request.get({url:query, oauth:oauth, qs:null, json:true}, function (e, r, user) {
            res.send(r);
        }
    ).on('error', (err)=>{
        res.status(404).send();
    });
});

app.listen(port, ()=> {
   console.log('Started on port 3000');
});

module.exports = {app};
