var roleTrucker = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.defending && creep.carry.energy == 0) {
            creep.memory.defending = false;
	    }
	    if(!creep.memory.defending && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.defending = true;
	    }

	    if(creep.memory.defending) {
           var needsPower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity
                    )}
            });
            
            if(needsPower) {
                if(creep.transfer(needsPower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needsPower);
                }
            }
	    } else {
            var storedEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.getEnergy().energyAvailable)
                }
            });
            
            if (storedEnergy.length) {
                if(creep.withdraw(storedEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy[0]);
                } 
                /*else if (creep.carry.energy > 0 && storedEnergy[0].getEnergy() < storedEnergy[0].getEnergy().capactiy) {
                    if(creep.transfer(storedEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storedEnergy[0]);
                    }
                }*/
            }
	    }
	}
};

module.exports = roleTrucker;