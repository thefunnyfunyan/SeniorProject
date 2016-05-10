/**
 * Created by Brandon on 5/5/2016.
 */
var UnitController = function(UnitName, LeaderName){
    this.Units=[];
    this.AddUnit(UnitName, LeaderName);
};

UnitController.prototype.CreateUnit = function (UnitName, Leaders) {
    return {"Active": 1,
            "Name": UnitName,
            "Leaders": Leaders,
            "ChildUnits": []}
};

UnitController.prototype.AddUnit = function(UnitName, Leaders){
    var unit = this.CreateUnit(UnitName, Leaders);
    this.Units.push( unit);
};

UnitController.prototype.GetUnit = function(UnitName){
    for(var i=0, l = this.Units.length; i<l; i++){
        if(this.Units[i].Name == UnitName){
            return this.Units[i]
        }
    }
    return null;
};

UnitController.prototype.AddUnitToParent = function(UnitName, Leaders, ParentUnitName){
    var ParentUnit = this.GetUnit(ParentUnitName);
    if(null == ParentUnit) return null;
    ParentUnit.ChildUnits.push(UnitName);
    this.Units.push(this.CreateUnit(UnitName, Leaders));
};

UnitController.prototype.GetUnitLeaders = function(){
    LeaderList =[];
    for(var i=0, l = this.Units.length; i<l; i++){
        LeaderList.push(this.Units[i].Leaders)
    }
    return LeaderList
};

UnitController.prototype.SetUnitInactive = function(UnitName){
    var unit = this.GetUnit(UnitName);
    if(null!=unit) unit.Active = 0;
};

UnitController.prototype.SetSingleActiveUnit = function(UserName){
    for(var i=0,l=this.Units.length;i<l;i++){
        if(this.Units[i].Name == UserName)
            this.Units[i].Active = 1
        else
            this.SetUnitInactive(this.Units[i].Name);
    }
};

UnitController.prototype.SetAllChildUnitsActive = function(parentUnit){
    var unit = this.GetUnit(parentUnit)
    if(null == unit) return;
    for(var i=0,l=unit.ChildUnits.length;i<l;i++){
        var childUnit = this.GetUnit(unit.ChildUnits[i]);
        childUnit.Active = 1;
    }
};

UnitController.prototype.GetUnitNameOfLeader = function(UserName){
    for(i=0,l=this.Units.length;i<l;i++) {
        if (this.Units[i].Leaders == UserName)
            return this.Units[i].Name;
    }
};

UnitController.prototype.GetUnitActiveStatus = function(UnitName){
    var unit = this.GetUnit(UnitName);
    if(null==unit)
        return 0
    return unit.Active;
}

UnitController.prototype.AddUserToUnit = function(UnitName, UserName){
    var unit = this.GetUnit(UserName);
    unit.Leaders.push(UserName);
}

module.exports = exports = UnitController;