/**
 * Created by Brandon on 5/4/2016.
 */


"use strict"
var assert = require('assert')


describe('Database Checking', function(){
    it('Checks to make sure that the Database exists', function(){
        require('../Database/initilizeDatabase');
        var db = require('../Database/RTAT.sqlite3');
        assert(db)
    });
});
