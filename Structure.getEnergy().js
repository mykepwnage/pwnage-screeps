 /*
Structure.getEnergy();
    returns {energy: X, energyCapacity: Y}

Access with x.getEnergy().energy; x.getEnergy().energyCapacity;
*/

function returnEnergy(_structure, typeNum){
    var energyData = {energy: undefined, capacity: undefined};
    switch(typeNum){
        case 1:
            energyData.energy = _structure.energy;
            energyData.capacity = _structure.energyCapacity;
            break;
        case 2:
            energyData.energy = _structure.store.energy;
            energyData.capacity = _structure.storeCapacity;
            break;
    }
    return energyData;
}//END returnEnergy

module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.getEnergy = function(){return returnEnergy(this, 1);}
    StructureExtension.prototype.getEnergy = function(){return returnEnergy(this, 1);}
    StructureTower.prototype.getEnergy = function(){return returnEnergy(this, 1);}
    StructureContainer.prototype.getEnergy = function(){return returnEnergy(this, 2);}
    StructureStorage.prototype.getEnergy = function(){return returnEnergy(this, 2);}
};//End Export