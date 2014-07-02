node-sinful
===========

sinful.js for node
------------------

JS provides fundamental building blocks that allow for beautiful constructs.
This is a collection of such constructs.
The functions defined here stem from functional settings such as Haskell's, and provide for clear, concise and expressive code.
For detailed information on the API, usage, contributors, license, etc., please dive into the [wiki](https://github.com/guipn/sinful.js/wiki/_pages) and visit the [project's page](http://guipn.github.com/sinful.js/).

I've tried to keep the prototype functions the same as those from the sinful.js project.  
The exception is ```Number.prototype.to```.  I have added an additional argument ```[func]``` so the examples on sinful's wiki work.

###Number.prototype.to(limit, [func], [stepper])

Returns a list going from ```this``` to ```limit```, applying ```func``` to the current value and using ```stepper``` to determine the intermediate values.  

If stepper is omitted, ```function (x) { return x + 1; }``` is used if the limit is greater than ```this``` and ```function (x) { return x - 1; }``` is used if the limit is less than ```this```.  
If func is omitted, it uses  ```function (x) { return x; }``` to returns the current value of ```this```.
```
> (1).to(15); // ↦ [1, 2, 3, ... 15]

> (15).to(1); // ↦ [15, 14, 13, ... 1]

> (1).to(16, function (x) { return x * x; }, function (x) { return x + 2}); // ↦ [1, 9, 25, ... 225]
```
There are two preconditions:

* `stepper(i) != i`, for any `i` in the would-be resulting list;
* `stepper` be monotonic.

###Extending/flushing native prototypes:

While I don't extend the prototypes in my code (I usually ```liberate``` them), I have included ```extend``` & ```flush``` methods that let you augment just the native types you want.

The default behavior of ```extend()``` is to extend the prototype with methods if they don't already exist.  You can change this behavior by providing an alternative function ...

Calling ```flush()``` only removes what ```extend()``` adds to the prototype.
```
> Math['add'] = function () { return 'stub'; }

> Math // ↦ [ add: [Function] }
```
extending Math.prototype:
```
> require('sinful').Math.extend()  // or require('sinful').extendMath();

> Math
{ add: [Function],
  subtract: [Function],
  multiply: [Function],
  divide: [Function] }

> Math.add(.1, .1, .1) // ↦ [stub'

> Math.multiply(.4, .4) // ↦ 0.16
```
and flushing Math.prototype:
```
> require('sinful').Math.flush()  // or require('sinful').flushMath()

> Math // ↦ { add: [Function] }

> Math.add(.1, .1, .1) // ↦ 'stub'
```

If you want to include all of the native extensions, use extendAll():
```
> require('sinful').extendAll() 
```
likewise you can ```flushAll()``` to remove them.

