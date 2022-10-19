const Query = {
	greeting: () => `Hello world!`,
	sayHello: (root, args, context, info) => {
		return `${args.name}!        Nice to meet you!`
	}
}


module.exports = { Query }