const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs')



const port = process.env.PORT || 9000;

const db = require('./db');
const typeDefs = fs.readFileSync(('./schema.graphql'), { encoding: 'utf-8' })
const resolvers = require('./resolvers')

const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({ typeDefs, resolvers })



const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')


// // ====================================== this is old one ====================================
// app.use(cors(), bodyParser.json());
// app.use('/graphql', graphqlExpress({ schema }))
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))







const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');//private key
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


//decodes the JWT and stores in request object
app.use(cors(), bodyParser.json(), expressJwt({
	secret: jwtSecret,
	credentialsRequired: false
}));



app.post('/login', (req, res) => {
	const { email, password } = req.body; //check database 

	const x = db.students.list()
	const y = db.students.get('')
	const user = db.students.list().find((user) => user.email === email);
	if (!(user && user.password === password)) {
		res.sendStatus(401);
		return;
	}


	//generate a token based on private key , token doesn't have an expiry
	const token = jwt.sign({ subxxxxx: user.id }, jwtSecret);  // this "subxxx" must be matched with   [below sub in app.use(graphExpress)]

	// const token = jwt.sign({ sub: user.id }, jwtSecret);
	res.send({ token });
});



app.use('/graphql', graphqlExpress(req => ({
	schema,
	context: { user: req.user && db.students.get(req.user.subxxxxx) }  //  [this must be matched with above jwt.sign({ sub: ... })]
})))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))




app.listen(port, () =>
	console.info(`Server started on port ${port}`
	));