Zones for Express
=================

Zones replaces the normal routing area of your Express application to make it more compartmentalized. In essense, all it does is virtualize all routing after the specified zone path. To use, just replace the normal routing section in your app.js (app.get etc) with the following:

	/**
	 * Use Express Zones
	 */
	var zone = require('express-zone').init(app, __dirname + '/zones');
	zone("/hello-there", "hello");
	zone("", "main");

The init method takes two arguments, the first is the Express app, and the second is the folder housing the zones. Each zone is a folder containing a zone.js file, for example ./zones/hello/zone.js:

	/**
	 * Sample Zone
	 * @author Nate Ferrero
	 */
	module.exports = function(zone) {

		/**
		 * Do Normal Express Routing, but on the zone.
		zone.get('', function(req, res) {
			res.send("Hello to you too!");
		});

		zone.get('/test', function(req, res) {
			res.send("Hello test!");
		});

		zone.get('/test/apple', function(req, res) {
			res.send("Hello apple!");
		});

	}

Then, run your app and access the following routes:

	/hello-there
	/hello-there/test
	/hello-there/test/apple

And observe great success! Of course, this is compatible with any Express-recognized path format, such as including :id in the URL.