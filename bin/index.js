#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const {slotsHandler} = require("../handler/slotsHandler");
const {bookHandler} = require("../handler/bookingHandler");

const options = yargs
    .usage('Usage: $0 <command> [options]')
    .command('slots', 'get available slots for date',
        function (yargs) {
            return yargs
                .option('d', {
                alias: 'date',
                describe: 'the date for check slots'
            })
        },
        (argv) => slotsHandler(argv)
    )
    .command('book', 'book slot by date for user',
        function (yargs) {
            return yargs
                .option('d', {
                alias: 'date',
                describe: 'the date for check slots'
            })
                .option('t', {
                    alias: 'time',
                    describe: 'hour and minutes to book'
                })
                .option('u', {
                    alias: 'users',
                    type: 'array',
                    describe: 'users to book in'
                })
        },
        (argv) => bookHandler(argv)
    )
    .help()
    .argv