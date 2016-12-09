var roleMaintain = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.gunning && creep.carry.energy == 0) {
            creep.memory.gunning = false;
	    }
	    if(!creep.memory.gunning && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.gunning = true;
	    }

	    if(creep.memory.gunning) {
            var needsPower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( 
                            ((structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity) 
                    )
                }
            });
            
            if(needsPower) { // Supply Power
                if(creep.transfer(needsPower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needsPower);
                }
            }
	    }
	    else {
            var storedEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_STORAGE || 
                            structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            
            if (storedEnergy) {
                if(creep.withdraw(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                }
            }
	    }
	}
};

module.exports = roleMaintain;