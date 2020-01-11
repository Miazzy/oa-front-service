
var assert = require('assert');
var jsCalendar = require('../index');
var assets = require('../assets/specs/total-weeks');

describe('jsCalendar', function(){

	describe('basic functionality', function(){

		function isLeapYear(year){	// double verification if is a leap year
			var algorithm = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
			var javascript = new Date(year, 1, 29).getMonth() == 1;
			assert.equal(algorithm, javascript); // just to be sure
			return javascript;
		}

		var monthLengths = [31, false, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var jsCal = new jsCalendar.Generator();

		it('should do basic functionality', function(){
			var january = jsCal(2019, 0);
			assert.equal(january.cells.length, 56);
			assert.equal(january.month, 0);
			assert.equal(january.year, 2019);
			assert.equal(january.daysInMonth, 31);
		});

		it('should read "onlyDays" parameter', function(){
			var onlyDaysCal = new jsCalendar.Generator({onlyDays: true});
			var defaultCal = new jsCalendar.Generator();
			var alsoLabelsCal = new jsCalendar.Generator({onlyDays: false});

			assert.equal(onlyDaysCal(2017, 0).cells.length, 42);
			assert.equal(defaultCal(2017, 0).cells.length, 56);
			assert.equal(alsoLabelsCal(2017, 0).cells.length, 56);
		});

		it('should set correct year that the week belongs to', function(){
			['iso', 'US format'].forEach(function(standard){
				var iso = standard == 'iso';
				var jsCal = new jsCalendar.Generator({onlyDays: true, weekStart: iso ? 1 : 0});
				var january = jsCal(2010, 0);
				var december = jsCal(2010, 11);

				assert.equal(january.year, 2010);
				assert.equal(december.year, 2010);

				assert.equal(january.cells[0].year, iso ? 2009 : 2010); // 28 dec, week 53 iso, week 1 US
				assert.equal(january.cells[6].year, iso ? 2009 : 2010); // 3 jan, week 53/week 1
				assert.equal(january.cells[7].year, 2010); // 4 jan, week 1

				assert.equal(december.cells[34].year, iso ? 2010 : 2011); // 2 jan, week 52 iso/week 1 US
				assert.equal(december.cells[35].year, 2011); // 3 jan, week 1


				// #2 - should not start a month with a full week from past month,
				// the first 7 days must contain at least 1 day from the current month
				for (var y = 1978; y < 2079; y++){	// check dates between 1800 and 2300
					for (var m = 0; m < 12; m++){
						var cells = jsCal(y, m).cells;
						var firstWeek = cells.slice(0, 7);
						var lastDayInWeek = firstWeek.pop();
						assert.equal(lastDayInWeek.date.getTime() >= new Date(y, m, 1).getTime(), true);
					}
				}
			});

		});

		it('should set correct week in US standard', function(){
			var jsCal_default = new jsCalendar.Generator({onlyDays: true});
			var jsCal_US = new jsCalendar.Generator({onlyDays: true, weekStart: 0});
			var jsCal_EU = new jsCalendar.Generator({onlyDays: true, weekStart: 1});
			var weekUS = assets.i18n;
			var testYears = Object.keys(assets.i18n);

			// US DATES TEST
			testYears.forEach(function(year){
				for (var m = 0; m < 12; m++){
					var month = jsCal_US(year, m);
					var firstDayOfMonth = month.cells.filter(function(cell){
						return cell.type == 'monthDay';
					})[0];
					assert.equal(firstDayOfMonth.week, weekUS[year][m]);
				}
			});

			// isolated buggy dates:
			// #1 - last week of cells is set wrong when it belongs to 2nd week of next year
			var dec2015 = jsCal_US(2015, 11);
			var lastWeek = dec2015.cells.slice(-7);
			lastWeek.forEach(function(entry, i){
				// should match the correct days in 2nd week of jan2016
				assert.equal(entry.date.getDay(), i);
				assert.equal(entry.week, 2);
			});
		});

		it('should return correct month length', function(){
			for (var y = 1800; y < 2300; y++){	// check dates between 1800 and 2300
				for (var m = 0; m < 12; m++){
					var monthInYear = jsCal(y, m);
					var monthLength = monthLengths[m];
					if (!monthLength) monthLength = isLeapYear(y) ? 29 : 28;
					assert.equal(monthInYear.daysInMonth, monthLength);
					// check last day in each month is the right one
					var days = monthInYear.cells.filter(function(cell){
						return cell.type == 'monthDay';
					});
					var lastDay = days.pop().desc;
					assert.equal(monthInYear.daysInMonth, lastDay);
				}
			}
		});

		it('should return correct week numbers', function(){
			for (var y = 1800; y < 2300; y++){	// check dates between 1800 and 2300
				var monthInYear = jsCal(y, 0);
				var weekNr = monthInYear.cells[0].week;
				var dayInWeek = new Date(y, 0).getDay() || 7;
				if (dayInWeek > 4) assert.equal(weekNr > 50, true);
				else assert.equal(weekNr, 1);

				var afterThreeWeeks = monthInYear.cells[28].week;
				if (dayInWeek <= 4) assert.equal(afterThreeWeeks, 3);
			}
		});

		it('should return calculate correct week number when changing year - january', function(){
			var assetsIndex = 0;
			var jsCal = new jsCalendar.Generator({onlyDays: true, weekStart: 1});
			for (var y = 1971; y < 2051; y++){	// check dates between 1800 and 2300
				var january = jsCal(y, 0);
				// check the first and second thurdays in year
				var thursday = january.cells[3];
				var thursdayInYear = thursday.date.getFullYear();

				if (thursdayInYear == y -1){
					assert.equal(thursday.week, assets.totalWeeks[assetsIndex]);
					assert.equal(january.cells[10].week, 1);
				}
				else if (thursdayInYear == y){
					assert.equal(thursday.week, 1);
					assert.equal(january.cells[10].week, 2);
				}
				else {
					assert.equal(true, false); // this should never happen
				}
				assetsIndex++;
			}
		});

		it('should return calculate correct week number when changing year - december', function(){
			var assetsIndex = 0;
			var jsCal = new jsCalendar.Generator({onlyDays: true, weekStart: 1});

			for (var y = 1970; y < 2050; y++){	// check january dates between 1971 and 2051
				var december = jsCal(y, 11);
				var expected = assets.januaryWeekStart[assetsIndex];
				// get only next january days
				var extraDays = december.cells.filter(function(day){
					return day.type == 'nextMonth';
				});
				assert.equal(extraDays.length > 0, true); // there is always some day there
				assert.equal(extraDays[0].week, expected);
				if (extraDays.length > 7) assert.equal(extraDays[7].week, expected == 1 ? 2 : 1);
				assetsIndex++;
			}
		});

	});

	describe('addLabels should add classes correctly', function(){

		var jsCalWithWeeks = new jsCalendar.Generator({onlyDays: true});

		it('when custom fn is last', function(){
			var monthInYear = jsCalWithWeeks(2016, 0, [jsCalendar.addLabels, function(dayData){
					dayData.class.push('test-class');
					return dayData;
			}]);
			assert.equal(monthInYear.cells[0].class.indexOf('test-class') != -1, true);
		});

		it('when custom function return class as string', function(){
		var monthInYear = jsCalWithWeeks(2016, 1, [function(dayData){
				dayData.class = 'test-class';
				return dayData;
			}, jsCalendar.addLabels]);
			assert.equal(monthInYear.cells[0].class.indexOf('test-class') != -1, true);
		});

		it('when custom function return class as array', function(){
			var monthInYear = jsCalWithWeeks(2016, 2, [function(dayData){
				dayData.class = ['test-class'];
				return dayData;
			}, jsCalendar.addLabels]);
			assert.equal(monthInYear.cells[0].class.indexOf('test-class') != -1, true);
		});
	});

	describe('addLabels ', function(){

		var jsCalWithWeeks = new jsCalendar.Generator();

		it('should set the correct default month name in each day', function(){
			var monthInYear = jsCalWithWeeks(2016, 2, [jsCalendar.addLabels]);

			monthInYear.cells.forEach(function(day){
				if (day.type == 'prevMonth') assert.equal(day.monthName, 'February');
				else if (day.type == 'nextMonth') assert.equal(day.monthName, 'April');
				else if (day.type == 'monthDay') assert.equal(day.monthName, 'March');
			});
		});

		it('should set the correct default month name in month object', function(){
			var monthInYear = jsCalWithWeeks(2016, 2, [jsCalendar.addLabels]);
			assert.equal(monthInYear.monthName, 'March');
		});

		it('should merge new options', function(){
			var columnNames = {
				0: '_w',
				1: '_segunda',
				2: '_terça',
				3: '_quarta',
				4: '_quinta',
				5: '_sexta',
				6: '_sabado',
				7: '_domingo'
			};
			var monthNames = [
				"_Janeiro",
				"_Fevereiro",
				"_Março",
				"_Abril",
				"_Maio",
				"_Junho",
				"_Julho",
				"_Agosto",
				"_Setembro",
				"_Outubro",
				"_Novembro",
				"_Dezembro"
			];
			var marsian = {monthNames: {marsian: monthNames}, columnNames: {marsian: columnNames}};
			jsCalendar.addLabels.setLabels(marsian);
			var jsCal = new jsCalendar.Generator({lang: 'marsian'});
			var monthInYear = jsCal(2016, 2, [jsCalendar.addLabels]);
			var month = monthInYear.cells.pop().monthName;
			assert.equal(month, '_Abril');
		});

		it('should set correct days when using "onlyDays == true" parameter', function(){
			var onlyDaysCal = new jsCalendar.Generator({onlyDays: true});
			var cells = onlyDaysCal(2017, 0, [jsCalendar.addLabels]).cells;
			var NumericCells = cells.map(day => {
				return Number(day.desc);
			}).filter(Boolean);
			assert.equal(cells.length, 42);
			assert.equal(NumericCells.length, 42);
		});

		it('should set correct monthName when single function instead of array in iterators callback', function(){
			var onlyDaysCal = new jsCalendar.Generator();
			var cal = onlyDaysCal(2017, 0, jsCalendar.addLabels);
			assert.equal(cal.monthName, 'January');
		});

		it('should set export the labels to the calendar object (not only each dayObject)', function(){
			var jsCal = new jsCalendar.Generator();
			var cal = jsCal(2017, 0, jsCalendar.addLabels);
			assert.equal('labels' in cal && !!cal.labels, true);
			assert.equal(Object.keys(cal.labels).includes('monthNames'), true);
			assert.equal(cal.labels.monthNames[1], 'February');
		});

	});

	describe('should generate correct index', function(){
		var jsCal = new jsCalendar.Generator();
		it('should not be a monthDay in index < 8', function(){
			var monthInYear = jsCal(2016, 0, [jsCalendar.addLabels]);
			for (var i = 0; i < 8; i++){
				assert.equal(monthInYear.cells[i].type != 'monthDay', true);
				assert.equal(monthInYear.cells[i].index, i);
			}
		});

		it('first index is 0', function(){
			var monthInYear = jsCal(2016, 1, [jsCalendar.addLabels]);
			assert.equal(monthInYear.cells[0].index == 0, true);
		});

		it('last index is 55 for full calendar', function(){
			var monthInYear = jsCal(2016, 2, [jsCalendar.addLabels]);
			assert.equal(monthInYear.cells.pop().index == 55, true);
		});

		it('last index is same as month length for only days calendar', function(){
			var jsCalOnlyDays = new jsCalendar.Generator({onlyDays: true});
			var monthInYear = jsCalOnlyDays(2016, 2, [jsCalendar.addLabels]);
			assert.equal(monthInYear.cells.pop().index, 41);
			assert.equal(monthInYear.cells.length, 41);
		});

		it('set the correct day type', function(){
			var february = 2;
			var jsCalOnlyDays = new jsCalendar.Generator({onlyDays: true});
			var monthInYear = jsCalOnlyDays(2016, february, []);
			var dayInFebruary = monthInYear.cells.shift();
			var dayInApril = monthInYear.cells.pop();

			assert.equal(dayInFebruary.type, 'prevMonth');
			assert.equal(dayInApril.type, 'nextMonth');
			assert.equal(dayInFebruary.date.getMonth(), february - 1);
			assert.equal(dayInApril.date.getMonth(), february + 1);
		});

	});

});
