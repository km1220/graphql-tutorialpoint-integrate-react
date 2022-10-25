var db = require("./db")

const Query = {
	greeting: () => `Hello world!`,
	sayHello: (root, args, context, info) => {
		return `${args.name}!        Nice to meet you!`
	},
	students: () => db.students.list(),




	greetingWithAuth: (root, args, context, info) => {
		//check if thecontext.user is null 
		if (!context.user) { throw new Error('Unauthorized'); }
		return "Hello from TutorialsPoint, welcome back : " + context.user.firstName;
	}
}

const Student = {
	college: (root) => {
		return db.colleges.get(root.collegeId);
	}
}


module.exports = { Query, Student }