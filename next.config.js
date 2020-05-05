const envConfig = require('dotenv').config({
	path: `./env/client/env.${process.env.AS_ENV}`,
});

const webpack = require('webpack');

module.exports = {
	dir: './src',
	webpack: (config) => {
		config.plugins = config.plugins || [];

		config.plugins = [
			...config.plugins,
			new webpack.EnvironmentPlugin(envConfig.parsed),
		];

		return config;
	},
};
