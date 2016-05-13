/**
 * Created by Brandon on 5/9/2016.
 */
var LocationController = function(UserController, UnitController){
    this.UnitController = UnitController;
    this.UserController = UserController;
}

LocationController.prototype.AddUserLocation = function(UserName, Location, callback, failback){
    this.UserController.AddLocation(UserName, Location);
    var UnitName = this.UnitController.GetUnitNameOfLeader(UserName);
    if(this.UnitController.GetUnitActiveStatus(UnitName))
        callback();
    else
        failback();
};

LocationController.prototype.PostActiveUsersLocations = function(callback){
    var ldrList = this.UnitController.GetUnitLeaders();
    for(var i=0,l=ldrList.length;i<l;i++){
        var locList = this.UserController.GetAllUserLocations(ldrList[i]);
        for(var j=0,jl=locList.length;j<jl;j++){
            callback(locList[j].lat, locList[j].lng, ldrList[i]);
        }
    }
}



module.exports = exports = LocationController;
