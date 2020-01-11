/*
== Total weeks in years of 1970 to 2050, from PHP: ==
	$arr = [];
	function getIsoWeeksInYear($year) {
		$date = new DateTime($year.'-12-31');
		return ($date->format("W") === "53" ? 53 : 52);
	}
	for ($i = 1970; $i < 2050; $i++){
		array_push($arr, getIsoWeeksInYear($i));
	}
	echo json_encode($arr);
*/

var totalWeeks = [53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52, 52, 52, 52, 52, 53, 52, 52, 52, 52, 53, 52];

/*
== Number of week in year for 1st of January ==
	$arr = [];
	function getWeek($year) {
		$date = new DateTime($year.'-01-01');
		return $date->format("W");
	}
	for ($i = 1971; $i < 2051; $i++){
		array_push($arr, getWeek($i));
	}
	echo json_encode($arr);
*/

var januaryWeekStart = [53, 52, 1, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52, 52, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52, 52, 1, 1, 1, 53, 52, 1, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52, 52, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52, 52, 1, 1, 1, 53, 52, 1, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52, 52, 1, 1, 1, 53, 52, 1, 1, 1, 53, 52];

// US and EU start week in different days, resp sunday and monday
// this is a sample to make sure the js-calendar can produce the correct week numbers

var weekNumbersUS = {
	2015: [1, 6, 10, 14, 18, 23, 27, 31, 36, 40, 45, 49],
	2016: [1, 6, 10, 14, 19, 23, 27, 32, 36, 40, 45, 49],
	2017: [1, 5, 9, 13, 18, 22, 26, 31, 35, 40, 44, 48],
	2018: [1, 5, 9, 14, 18, 22, 27, 31, 35, 40, 44, 48],
	2019: [1, 5, 9, 14, 18, 22, 27, 31, 36, 40, 44, 49],
	2020: [1, 5, 10, 14, 18, 23, 27, 31, 36, 40, 45, 49],
	2021: [1, 6, 10, 14, 18, 23, 27, 32, 36, 40, 45, 49],
	2022: [1, 6, 10, 14, 19, 23, 27, 32, 36, 40, 45, 49],
	2023: [1, 5, 9, 13, 18, 22, 26, 31, 35, 40, 44, 48]
}

module.exports = {
	totalWeeks: totalWeeks,
	januaryWeekStart: januaryWeekStart,
	i18n: weekNumbersUS
}
