const antwar = require('antwar');

const environment = process.argv[2];

// Patch Babel env to make HMR switch work
process.env.BABEL_ENV = environment;

antwar[environment]({
  environment,
	configurationPaths: {
		antwar: require.resolve("./antwar.config.js"),
		webpack: require.resolve("./webpack.config.js"),
	},
}).then(() => {
	if (environment !== "build") {
		console.log("Surf to localhost:3000");
	}
}).catch((err) => {
  console.error(err);

  process.exit(1);
});
