const express = require('express');
const path = require('path');

const app = express();


app.use(express.json());//This line helps parse all the json data 
app.use(express.urlencoded({extended: false }));

//This code block to define a http get request on the express server
app.get('/', (req,res) => {
	//res.send(embedded html);
	//res.send(req.rawHeaders);
	//res.send({msg: 'hello'});
})
//This is a different get route for different request
app.post('/contact', (req, res)=> {
	res.send(req.header('Content-Type'));	
	//over here you can see that the content type is a header and has to be requested before being displayed 
});
app.post('/' ,(req, res) => {
	res.send(req.body.email);
});

app.post('/status', (req, res) => {
	if(!req.body.name){
	return res.status(400).send('Name is required.');
	//when putting two or more responses in a route always put return in front of the all the responses before final default response as all erroneous responses will get sent/executed if return isnt added in front of them.(return ensures they pass only if the above condition is satisfied)
	}
	//we would usually put database stuff here but instead were putting a 201 status code that indicates that the necessary work is done
	res.status(201).send(`Thank you ${req.body.name}`);
	//note is remember where you are putting the request in and response in, its basic common sense dude. res.xxxx is when your api is replying to something in a request and req.xxx is when the api needs to check the request that came in from the client.
});
//This is a login route simulation in place of the x-auth-token we usually have a jwt for login processes which I need to lEARNN
app.post('/login', (req, res) => {
	if(!req.header('x-auth-token')){
	 return res.status(400).send('No Token');
	}
	if(req.header('x-auth-token') !== '123456'){
	return res.status(401).send(`Login unauthorised`);	
	}
	res.status(201).send(`Login Authorised`);
	
});

//This is the server setup
app.listen(5000, () => console.log(`Server Started on 5000`));
