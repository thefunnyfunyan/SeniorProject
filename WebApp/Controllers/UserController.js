/**
 * Created by Brandon on 5/5/2016.
 */
var UserController = function(){
    this.UserList = [{"Name": "Commander", "Locations":[]}]
};

UserController.prototype.AddUser = function(UserName){
    var user = {"Name": UserName, "Locations":[]}
    this.UserList.push(user);
};

UserController.prototype.GetUser = function(userName){
    for(var i=0, l=this.UserList.length; i<l; i++){
        if(this.UserList[i].Name == userName) return this.UserList[i];
    }
    return null;
};

UserController.prototype.AddLocation = function(UserName, location){
    var user = this.GetUser(UserName);
    if(null != user)
        user.Locations.push(location);
}

UserController.prototype.GetAllUserLocations = function(UserName){
    var user = this.GetUser(UserName);
    if(null == user) return [];
    return user.Locations;
}

module.exports = exports = UserController;