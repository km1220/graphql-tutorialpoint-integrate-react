var db = require("./db")

const Query = {
	greeting: () => `Hello world!`,
	sayHello: (root, args, context, info) => {
		return `${args.name}!        Nice to meet you!`
	},
	students: () => db.students.list(),
}

const Student = {
	college: (root) => {
		return db.colleges.get(root.collegeId);
	}
}


module.exports = { Query, Student }