/*global define, describe, it, before, after */
define(
[
	'chai',
	'sinon',
	'boilerplate/simple'
],
function (chai, sinon, simple) {
	'use strict';

	var assert = chai.assert;

	describe('simple', function () {
		describe('truth', function () {
			it('should be true', function () {
				var actual = simple.truth();

				assert.isTrue(actual);
			});
		});

		describe('stamp', function () {
			var clock;

			before(function () {
				var date = new Date(2013, 3, 1),
					timestamp = date.getTime();

				clock = sinon.useFakeTimers(timestamp);
			});

			after(function () {
				clock.restore();
			});

			it('should append the date to the given value', function () {
				var actual = simple.stamp('test');

				assert.equal(actual, 'test:2013-04-01');
			});
		});

		describe('async', function () {
			it('should invoke the callback', function (done) {
				simple.async(function () {
					done();
				});
			});
		});

		describe('getData', function () {
			var xhr,
				originalFn;

			before(function () {
				var request;

				xhr = sinon.useFakeXMLHttpRequest();

				xhr.onCreate = function (req) {
					request = req;
				};

				originalFn = simple.getData;

				simple.getData = function (err, callback) {
					var headers,
						body = JSON.stringify({});

					originalFn(err, callback);

					headers = {
						'Content-Type': 'application/json'
					};

					request.respond(200, headers, body);
				};
			});

			after(function () {
				xhr.restore();
				simple.getData = originalFn;
			});

			it('should invoke the callback', function (done) {
				simple.getData(function () {}, function () {
					done();
				});
			});
		});
	});
});
