var roleHaulerMainSource = {

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
                            (structure.structureType == STRUCTURE_STORAGE &&
                            structure.getEnergy().energy < structure.getEnergy().capacity) 
                    )
                }
            });
            
            if (powerThis) {
                if(creep.transfer(powerThis, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(powerThis);
                }
            } 
	    } else {
            var storedEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( 
                            (structure.structureType == STRUCTURE_CONTAINER &&
                            structure.getEnergy().energy > 0) 
                    )
                }
            });
            
            if (storedEnergy) { // Supply Power
                if(creep.withdraw(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                } 
            } 
	    }
	}
};

module.exports = roleHaulerMainSource;