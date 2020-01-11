// calendar with 8 column x 7 rows

var labels = require('./labels');

function isIterable(variable){
	if (variable == null) return false;
	if (variable.constructor === Array) return true;
	if (variable.constructor === Object) return true;
	return false;
}

function merge(_new, _old){
    for (var prop in _new){
        if (!_old[prop]) _old[prop] = _new[prop];
        else if (isIterable(_new[prop])) merge(_new[prop], _old[prop]);
    }
}

function addLabels(dayObject, lang){
	var cssClass = [labels.classes[dayObject.type]];

	if (dayObject.class) dayObject.class = (typeof dayObject.class == 'string' ? [dayObject.class] : dayObject.class).concat(cssClass);
	else dayObject.class = cssClass;

	if (dayObject.type.indexOf('Label') > 0){
		if (dayObject.index == 0 && labels.weekPlaceholder) dayObject.desc = labels.weekPlaceholder;
		else if (dayObject.index < 8) dayObject.desc = labels.columnNames[lang][dayObject.index];
		else if (dayObject.index % 8 == 0) dayObject.desc = dayObject.week;
	}

	if (dayObject.date) dayObject.monthName = labels.monthNames[lang][dayObject.date.getMonth()];
	if (!this.monthName) this.monthName = labels.monthNames[lang][this.month];
	if (!this.labels) this.labels = {
		monthNames: labels.monthNames[lang],
		columnNames: labels.columnNames[lang],
		classes: labels.classes
	}

	return dayObject;
}
addLabels.setLabels = function(newOptions){
	merge(newOptions, labels);
};

module.exports = addLabels;
