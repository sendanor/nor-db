/* Generic Node.js Database Library */

/* So, I had this file already implemented 90%... 
 * ...and then my PC crashed and everything was lost. 
 *
 * Kids, remember to push to github regularly.
 */

var is = require('./is.js');

var query = module.exports = {};

query.Raw = require('./Raw.js');


/** */
function build_parts(opts, parts, keys, separator) {
	opts = opts || {};
	separator = separator || ' ';

	// Build array of parts
	parts = (parts !== undefined) ? (is.array(parts) ? parts : [parts]) : [];

	if(keys) {
		keys.forEach(function(key) {
			parts.push( query[key](opts) );
		});
	}
	
	// Filter empty parts away
	parts = parts.filter(function(p) {
		return is.true( p && ((''+p).trim() !== '') );
	});

	// Merge params
	var params = [];
	params.concat.apply(params, 
		parts.filter(function(p) {
			return is.objOf(p, query.Raw);
		}).map(function(p) {
			return p.params();
		})
	);

	return query.Raw( parts.join(separator), params );
}


/** DISTINCT */
query.distinct = function(opts) {
	opts = opts || {};
	
};

/** expr */
query.expr = function(opts) {
	opts = opts || {};
	var e = opts.expr || query.Raw('*');
	if(!is.array(e)) {
		e = [e];
	}
	return build_parts(opts, e, undefined, ', '); 
};


/** FROM */
query.from = function(opts) {
	opts = opts || {};
	var parts = opts.from || [];
	if(!is.array(parts)) {
		parts = [parts];
	}
	return build_parts(opts, ['FROM'].concat(parts), undefined, ', '); 
};

/** conditions for WHERE and HAVING */
function build_conditions(opts) {
}

/** WHERE */
query.where = function(opts) {
	opts = opts || {};
	
};


/** GROUP */
query.group = function(opts) {
	opts = opts || {};
	
};


/** HAVING */
query.having = function(opts) {
	opts = opts || {};
	
};

/** ORDER */
query.order = function(opts) {
	opts = opts || {};
	
};


/** LIMIT */
query.limit = function(opts) {
	opts = opts || {};
	
};


/** SELECT */
query.select = function(opts) {
	opts = opts || {};
	return build_parts(opts, "SELECT", ["distinct", "expr", "from", "where", "group", "having", "order", "limit"], ' ');
};

/** UPDATE */
query.update = function(opts) {
	opts = opts || {};
	
};

/** INSERT */
query.insert = function(opts) {
	opts = opts || {};
	
};

/** DELETE */
query.delete = function(opts) {
	opts = opts || {};
	
};

/* EOF */