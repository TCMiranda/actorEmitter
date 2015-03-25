# ActorEmitter.js

_ActorEmitter.js_ is lightweight, independent, event emitter library which provides the
[observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) to javascript objects.
It works on node.js and browser. It is a single .js file.

## Why

This package is meant to be single instance, lightweight, async and scope-full event emitter, in order to provide communication between objects in different scopes.
Binding on an event, maintains the worker scope, so they can continue to process the call in a non blocking way, with the next() method.

## How to Use It

You need a single file "actoremitter.js".
Include it in a webpage via the usual script tag.

    <script src="actoremitter.js"></script>

To include it in a nodejs code isnt much harder

    var aEmitter = require('./actoremitter.js')

MIT license.
If you hit bugs, fill issues on github.
Feel free to fork, modify and have fun with it :)
