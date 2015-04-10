'use strict';

var _events = {};

var _trigger = function (data, cb) {

	setTimeout(_apply(cb.scope, cb.fn, data), 0);
};

var _triggerWait = function (data, future, cb) {

	setTimeout(_apply(cb.scope, cb.fn, future.concat(data)), 0);
};

var _wait = function (event, data, cb) {

	_events[event].forEach(_triggerWait.bind(this, data, [cb]));

	return actorInterface;
};

var _apply = function (scope, fn, args) {

	return function () {
        fn.apply(scope, args);
    };
};

var actorEmitter = {

	bind: function(event, fn) {

		_events[event] = _events[event] || [];
		_events[event].push({
			fn: fn,
			scope: this
		});

	    return actorInterface;
	},

	unbind: function(event, fn) {

		if ( !_events[event] ) return ;

		_events[event].splice(_events[event].indexOf(fn), 1);

	    return actorInterface;
	},

	trigger: function(event, data) {

		if ( !_events[event] ) return ;

        for (var e in _events[event]) {
            _trigger.call(this, data, e);
        };

	    return actorInterface;
	},

	next: function(fn, args) {

		if (typeof fn !== "function") return ;

	    setTimeout(_apply(this, fn, args), 0);

	    return actorInterface;
	},

	wait: function(event, data, cb) {

		if ( !_events[event] ) return ;

		return ( cb && _events[event].forEach(_triggerWait.bind(this, data, [cb])) )
			? actorInterface
			: {
				then: _wait.bind(this, event, data),
				done: _wait.bind(this, event, data)
			} ;
	}
};

var actorInterface = {

	bind: function (event, fct) {

		return actorEmitter.bind.call(this, event, fct);
	},
	unbind: function (event, fct) {

		return actorEmitter.unbind(event, fct);
	},
	trigger: function (event) {

		return actorEmitter.trigger.call(this, event, Array.prototype.slice.call(arguments, 1));
	},
	wait: function (event, data, cb) {

		return typeof cb === 'Function'
			? actorEmitter.wait.call(this, event, data, cb)
			: actorEmitter.wait.call(this, event, Array.prototype.slice.call(arguments, 1));
	},
	next: function (fn) {

		return actorEmitter.next.call(this, fn, Array.prototype.slice.call(arguments, 1));
	}
}

if( typeof module !== "undefined" && ('exports' in module)) {

	module.exports	= actorInterface
}
