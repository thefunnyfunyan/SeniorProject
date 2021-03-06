/**
 * Created by Brandon on 5/4/2016.
 */


"use strict"
var assert = require('assert')


describe('Testing Unit Controller', function(){

    var ControllerModule,
        UnitController;

    beforeEach(function(){
        ControllerModule = require('../Controllers/UnitController');
        UnitController = new ControllerModule("Command", "Commander");
        UnitController.AddUnitToParent("1st Platoon", "Lt. Foo", "Command");
    })

    it('UnitController should exist with Command Element', function(){
      assert(UnitController);
      assert.equal(UnitController.Units[0].Name, "Command");
      assert.equal(UnitController.Units[0].Leaders, "Commander");
    });

    it('Should Return Command Unit', function(){
        var commandUnit = UnitController.GetUnit("Command");
        assert.equal("Command", commandUnit.Name, 'names are equal');
        assert.deepEqual("Commander", commandUnit.Leaders, 'leaders are equal' )
    });


    it('Command Element should have a child units', function(){
        var commandUnit = UnitController.GetUnit("Command");
        assert.equal(commandUnit.ChildUnits.length, 1);
        assert.equal(commandUnit.ChildUnits[0], "1st Platoon")
    });

    it('Should return leader of command group and immediate chile unit', function(){
        var Leaders = UnitController.GetUnitLeaders();
        var ExpectedObj = ["Commander", "Lt. Foo"];
        assert.deepEqual(Leaders, ExpectedObj)
    });

    it('Command Unit only should be set to active', function(){
        UnitController.SetUnitInactive('1st Platoon');
        var pl = UnitController.GetUnit('1st Platoon');
        assert(pl, 'platoon exists');
        var command = UnitController.GetUnit('Command');
        assert(command, 'command exists');
        assert.equal(pl.Active, 0, 'pl active is 0')
        assert.equal(command.Active, 1, 'command active is 1');
    })

    it('Should return leaders of all Active Units', function(){
        UnitController.AddUnitToParent('2nd Platoon', 'Lt. Bofa' ,'Command');
        UnitController.AddUnitToParent('3rd Platoon', 'Lt. Hunt', '2nd Platoon');
        UnitController.AddUnitToParent('WPN Platoon', 'Lt. Daniels', 'Command');
        UnitController.SetSingleActiveUnit('Command');
        var ldrList = UnitController.GetUnitLeaders();
        var expectedList = ["Commander", "Lt. Foo", 'Lt. Bofa','Lt. Daniels'];
        assert.deepEqual(expectedList, ldrList);
    })

    it('Should return only one unit as Active', function(){
        UnitController.AddUnitToParent('2nd Platoon', 'Lt. Bofa','Command');
        UnitController.AddUnitToParent('3rd Platoon', 'Lt. Hunt', 'Command');
        UnitController.AddUnitToParent('WPN Platoon', 'Lt. Daniels', 'Command');
        UnitController.SetSingleActiveUnit('3rd Platoon');
        var ldrList = UnitController.GetUnitLeaders();
        assert.deepEqual( ['Lt. Hunt'], ldrList);
    })

    it('Should return all units under Commander',function(){
        UnitController.AddUnitToParent('3rd Platoon', 'Lt. Hunt', 'Command');
        UnitController.SetAllChildUnitsActive('Command');
        assert.deepEqual(["Commander","Lt. Foo",  'Lt. Hunt'],UnitController.GetUnitLeaders() );
    })

    it('Should Return Commad Unit', function(){
        assert.equal('Command', UnitController.GetUnitNameOfLeader('Commander'));
    })

    it('Should return that Command is Active', function(){
        UnitController.SetSingleActiveUnit('Command');
        assert.equal(UnitController.GetUnitActiveStatus('Command'),1);
        assert.equal(UnitController.GetUnitActiveStatus('1st Platoon'),0);
    })
});

describe('Testing User Controller', function(){

    var UserController;

    beforeEach(function(){
        var UserControllerModule = require('../Controllers/UserController');
        UserController = new UserControllerModule();
        UserController.AddUser("PFC Snuffy");
    })

    it('UserController should Exist', function(){
        assert(UserController);
    })

    it('UserController List should have 2 Users', function(){
        assert.deepEqual(UserController.UserList[1].Name, "PFC Snuffy")
    })

    it('UserController should return PFC Snuffy in all of his glory', function(){
        var user = UserController.GetUser("PFC Snuffy");
        assert.equal(user.Name, "PFC Snuffy")
        assert.deepEqual(user.Locations, []);
    })

    it('PFC Snuffy should have a new location', function(){
        var location = {"lat": 1234.1234, "lng": 4321.4321};
        UserController.AddLocation("PFC Snuffy", location);
        var user = UserController.GetUser("PFC Snuffy");
        assert.deepEqual([location],user.Locations)
    })

    it('PFC snuffys location in order', function(){
        var lat = 1
        for(;lat<10;lat++){
            var location = {"lat": lat, "lng": 1};
            UserController.AddLocation('PFC Snuffy', location)
        }
        var expectedList = [];
        for(var i=1; i<10;i++){
            expectedList.push({"lat": i, "lng": 1});
        }
        assert.deepEqual(expectedList, UserController.GetAllUserLocations('PFC Snuffy'));
    })
})

describe('Testing Location Controller',function(){
    var UserController,
        UnitController,
        LocationController;

    beforeEach(function(){
        var UnitControllerModule = require('../Controllers/UnitController');
        UnitController = new UnitControllerModule('Command', 'Commander');

        var UserControllerModule = require('../Controllers/UserController');
        UserController = new UserControllerModule();

        var locationControllerModule = require('../Controllers/LocationController');
        LocationController = new locationControllerModule(UserController, UnitController);
    });

    it('All controllers should exist', function(){
        assert(LocationController);
        assert(UserController);
        assert(UnitController);
    });

    it('Location Controller Should Call Calback', function(){
        UserController.AddUser('PFC Snuffy');
        UnitController.AddUnitToParent('BravoFireTeam', ['PFC Snuffy'], 'Command');
        UserController.AddUser('PFC Foo');
        UnitController.AddUnitToParent('AlphaFireTeam', ['PFC Foo'], 'Command');
        UnitController.SetSingleActiveUnit('BravoFireTeam');

        var foo = 1,
            Snuffy = 0,
            commander = 1;

        LocationController.AddUserLocation('PFC Snuffy', {"lat": 1234.1234, "lng": 4321.4321}, function(){
            Snuffy = 1;
        }, function(){
            Snuffy = 0;
        });
        assert(Snuffy,'snuffy');

        LocationController.AddUserLocation('Commander', {"lat": 1234.1234, "lng": 4321.4321}, function(){
            foo = 0;
        }, function(){
            foo = 1;
        });
        assert(commander,'commander');

        LocationController.AddUserLocation('PFC Foo', {"lat": 1234.1234, "lng": 4321.4321}, function(){
            commander = 0;
        }, function(){
            commander = 1;
        });
        assert(foo,'foo');
    });

    it('Should call callback for each location for all active leaders', function(){
        UserController.AddUser('pfc foo');
        UnitController.AddUnitToParent('FireTeam', 'pfc foo', 'Command');
        UnitController.SetSingleActiveUnit('FireTeam');
        var fooLoc = 0,
            comLoc = 0;
        for(var i=0;i<5;i++){
            LocationController.AddUserLocation('pfc foo', {"lat": i, "lng": 1}, function(){
                fooLoc +=1;
            }, function(){
                fooLoc -=1;
            });
            LocationController.AddUserLocation('Commander', {"lat": i, "lng": 1}, function(){
                comLoc +=1;
            }, function(){
                comLoc -=1;
            })
        };
        assert.equal(5, fooLoc, 'foo calback called');
        assert.equal(-5, comLoc, 'com calback called');
    });

    it('Should return only list of Active Users', function(){
        UserController.AddUser('pfc foo');
        UnitController.AddUnitToParent('FireTeam', 'pfc foo', 'Command');
        UnitController.SetSingleActiveUnit('FireTeam');
        for(var i=0;i<10;i++){
            LocationController.AddUserLocation('pfc foo', {"lat": i, "lng": 1}, function(){}, function(){});
            LocationController.AddUserLocation('Commander', {"lat": i, "lng": 1}, function(){}, function(){});
        }
        var count = 0
        LocationController.PostActiveUsersLocations(function(){
            count+=1;
        });
        assert.equal(count, 10);
        UnitController.SetSingleActiveUnit('Command');
        count = 0;
        LocationController.PostActiveUsersLocations(function(){
            count+=1;
        })
        assert.equal(20, count);
    })
});