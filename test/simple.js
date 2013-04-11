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

		describe('later', function () {
			it('should invoke the callback', function (done) {
				simple.later(function () {
					done();
				});
			});
		});

		describe('getData', function () {
			var server;

			before(function () {
				var status = 200,
					headers = { 'Content-Type': 'application/json' },
					body = '{}';

				server = sinon.fakeServer.create();
				server.autoRespond = true;

				server.respondWith([status, headers, body]);
			});

			after(function () {
				server.restore();
			});

			it('should invoke the callback', function (done) {
				simple.getData(done);
			});
		});
	});
});
