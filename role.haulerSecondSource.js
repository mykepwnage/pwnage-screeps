var roleHaulerSecondSource = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
	    }
	    if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.hauling = true;
	    }
	    
	    if(creep.memory.hauling) {
            var powerThis = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( 
                            ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.getEnergy().energy < structure.getEnergy().capacity) 
                    )
                }
            });
            
            var mainStorage = Game.getObjectById('5848518f05e00f8c2184fecd');
            
            if (powerThis) {
                if(creep.transfer(powerThis, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(powerThis);
                }
            } else if (mainStorage.store[RESOURCE_ENERGY] < mainStorage.storeCapacity) {
	            if(creep.transfer(mainStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage);
                }
            }
	    } else {
            var storedEnergy = Game.getObjectById('5849a34bc4b7c52411731352');
            
            if (storedEnergy) { // Supply Power
                if(creep.withdraw(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                } 
            } 
	    }
	}
};

module.exports = roleHaulerSecondSource;