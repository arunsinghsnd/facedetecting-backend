const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();


app.use(bodyParser.json());
const database ={
	users: [
	{
		id : '123',
		name: 'Arun',
		email: 'arun@gmail.com',
		password: 'arun@123',
		enteries: 0,
		joined: new Date()
	},
	{
		id : '124',
		name: 'singh',
		email: 'singh@gmail.com',
		password: 'singh@123',
		enteries: 0,
		joined: new Date()
	} 
	],
	login:[
	{
		id: '987',
		hash: '',
		email: 'Arun@gmail.com'
	}


	]
}


app.get('/',(req , res) =>{
	res.send(database.users);
} )

app.post('/signin',(req, res) =>{
	bcrypt.compare(password , null, null ,function(err , hash){
console.log(hash);
});
	bcrypt.compare(password , null, null ,function(err , hash){
console.log(hash);
});
	if(req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json('success');
	}else
	{
		res.status(400).json('error logging in');
	}   
})




app.post('/register',(req, res) =>{
	const{email , name ,password} = req.body;

	database.users.push({
		id : '125',
		name: name,
		email: email,
		password: password,
		enteries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})



app.get('/profile/:id',(req , res) =>{
const{ id } = req.params;
let  found = false;
database.users.forEach(user =>{
	if(user.id === id){
		found =true;
	return res.json(user);
	}
})
if(!found){
	res.status(404).json('not found');
}
})

app.post('/image',(req ,res) =>{
	const{ id } = req.body;
	let  found = false;
	database.users.forEach(user =>{
	if(user.id === id){
		found = true;
		user.enteries++
	return res.json(user.enteries);
		}
	})
	if(!found){
	res.status(404).json('not found');
}
})


app.listen(3000, () =>{
	console.log('app is running on port 3000'); 
})




/*
/ --> res = this is working
/signin --> POST =success/fail
/register --> POSt = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/