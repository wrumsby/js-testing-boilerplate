/*global define */
define(
[
	'reqwest'
],
function (reqwest) {
	'use strict';

	function pad(n) {
		if (n < 10) {
			return '0' + n;
		}

		return '' + n;
	}

	return {
		truth: function () {
			return true;
		},

		format: function (date) {
			var s = '';

			s += date.getFullYear() + '-';
			s += pad(date.getMonth() + 1) + '-';
			s += pad(date.getDate());

			return s;
		},

		stamp: function (name) {
			var now = new Date(),
				dateStamp = this.format(now);

			return name + ':' + dateStamp;
		},

		getData: function (err, callback) {
			reqwest({
				url: 'path/to/html',
				error: err,
				success: callback
			});
		}
	};
});