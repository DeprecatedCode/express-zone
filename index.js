/**
 * Express Zone
 * Virtualizes all routing below specified path
 * @author Nate Ferrero
 */
module.exports.init = function(app, root) {

	/**
	 * Zone Generator Function
	 * @author Nate Ferrero
	 */
	return function(path, zone) {

		/**
		 * Strict Syntax
		 * @author Nate Ferrero
		 */
		if(path.length && path[path.length - 1] == '/')
			throw new Error("Zone path must not end in /");

		if(path.length && path[0] != '/')
			throw new Error("Zone path if not empty must begin with /");

		/**
		 * Fix Subpath
		 * @author Nate Ferrero
		 */
		function fixPath(subpath) {

			/**
			 * Strict Syntax
			 * @author Nate Ferrero
			 */
			if(subpath.length && subpath[0] != '/')
				throw new Error("Zone subpath if not empty must begin with /");

			/**
			 * Ensure some path is set
			 */
			if(!subpath.length && !path.length)
				subpath = '/';

			return path + subpath;
		}

		/**
		 * Expose Express Methods
		 * @author Nate Ferrero
		 */
		var expressWrapper = {

			/**
			 * Get Method
			 * @author Nate Ferrero
			 */
			get: function(subpath, callback) {
				app.get(fixPath(subpath), callback);
			},

			/**
			 * Post Method
			 * @author Nate Ferrero
			 */
			post: function(subpath, callback) {
				app.post(fixPath(subpath), callback);
			},

			/**
			 * Put Method
			 * @author Nate Ferrero
			 */
			put: function(subpath, callback) {
				app.put(fixPath(subpath), callback);
			},

			/**
			 * Delete Method
			 * @author Nate Ferrero
			 */
			del: function(subpath, callback) {
				app.del(fixPath(subpath), callback);
			},
		};

		/**
		 * Include the Zone
		 * @author Nate Ferrero
		 */
		require(root+'/'+zone+'/zone.js')(expressWrapper);
	}
}