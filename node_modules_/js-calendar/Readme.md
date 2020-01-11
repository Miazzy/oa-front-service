
# js-calendar


A client- or server-side JavaScript calendar for generating days, week days and week number for datepickers and apps. Provides day of the week, week number, month info, can start week on monday or sunday and some other cool stuff.

[![Build Status](https://travis-ci.org/SergioCrisostomo/js-calendar.svg)](https://travis-ci.org/SergioCrisostomo/js-calendar)

---


## Install

    npm install js-calendar

## Demo

You can find a demo for the Browser [here](https://rawgit.com/SergioCrisostomo/js-calendar/master/demo/demo.html). If you want to play around with it, check [this jsFiddle](https://jsfiddle.net/Sergio_fiddle/e8607dnL/).

## Components

	- Generator - the main "Core" feature, a function to generate calendar days for the requested month
	- addLabels - the default iterator that adds basic CSS classes to each day object and labels for column head

# jsCalendar.generator

## Usage

	// require it
	var jsCalendar = require('js-calendar');
	// configure it
	var generator = new jsCalendar.Generator({onlyDays: false, weekStart: 1, lang: 'en'});
	// use it
	var january = generator(year, month, iteratorFn);

#### Configuration object:

The configuration object has 3 keys, all optional. Calling a new instance is usefull to cache for example different languages. The options are:

1. onlyDays - (boolean) generate only days and no labels or week numbers. When not specified it will default to `false`;
2. weekStart - (number) the starting day of the week. Can be `0` for US date formating, starting week on sunday **or** `1` for monday, using the ISO 8601 standard, used for example in Europe. When not specified it will default to `1`;
3. language - (string) the language of the result. This is usefull in the iterator functions, the generator itself does not use it;

#### Usage arguments:

1. year - (number) the year
2. month - (number) the month, zero based (ie. january is month number `0`).
3. iteratorFns - a function (or array of functions) to be used while iterating each day

Note:
The default language is English.

#### The generator returns:

* (*object*) O object with keys:

	* (*month*) The generated month.
	* (*year*) The generated year.
	* (*cells*) A array with objects as passed to the iterator function above.
	* (*daysInMonth*) The number of days in the month.

## Iterator funtions(s)

As mentioned above you can pass a iterator function (or array of functions).
The iteration function receives two arguments, a object with the day info and the _lang_ passed to the _generator_ function config. The object receives the following properties:

 - (_desc_) the generated day or week number. Will be set `false` if its a label cell.
 - (_week_) the number of the week in the year
 - (_type_) the type of the iterated object. Can be `weekLabel`, `dayLabel`, `prevMonth`, `nextMonth` or `monthDay`.
 - (_date_) a Date object for that day. Will be set `false` if its a label cell.
 - (_year_) the year of the specific Date or week label.
 - (_index_) index position in the 8 x 7 position in the return of the callendar.

The _this_ inside the iterator function is set to the _month object_ that the generator will return.
The iterator function(s) must `return` a object, that will override the original object.

# jsCalendar.addLabels

This method adds CSS classes, labels the day-in-week name and ads month name to each day and the month object, in the configured language. It has a `.setLabels` method that receives a object with extra labels/languages to add to the current labels. The default labels do not get re-writen by the `setLabels` method.

# Examples:

Get just the days in a month:

	var jsCalendar = require('js-calendar');
	var jsCal = new jsCalendar.Generator({onlyDays: true});
	var januaryDays = jsCal(2016, 0);
	var totalDays = januaryDays.daysInMonth;	// 29
	var days = januaryDays.cells;
	console.log(januaryDays);
	// 	[
	//     	{"desc":1,"week":6,"type":"monthDay","date":"2016-01-31T23:00:00.000Z","index":5},
	//     	{"desc":2,"week":6,"type":"monthDay","date":"2016-02-01T23:00:00.000Z","index":6},
	//     	etc...

Get days and labels in a month:

	var jsCalendar = require('js-calendar');
	var jsCal = new jsCalendar.Generator({onlyDays: true});
	var days = jsCal(2016, 1, jsCalendar.addLabels).cells;
	console.log(days);
	// 	[
	//		{"desc":"monday","week":5,"type":"weekLabel","date":false,"index":1,"class":["week-number"]},
	//		{"desc":"tuesday","week":5,"type":"dayLabel","date":false,"index":2,"class":["column-name"]},
	//		etc...

Compile HTML with jade

## Testing

js-calendar uses [mocha](http://mochajs.org/). To run the tests do in your command line:

    npm install
	npm test

## Build

    npm build

## Todo:

	- add even more tests
	- add more usefull iterator function for standard uses
	- add more examples like jade compiler or some other use case
	- make it easyer to use in the Brower (maybe a dist build folder)
