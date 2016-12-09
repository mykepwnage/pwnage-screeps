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
                            ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.getEnergy().energy < structure.getEnergy().capacity) 
                    )
                }
            });
            
            var linkFrom = Game.getObjectById('58490942781406a6623018da');
            
            if (powerThis) {
                if(creep.transfer(powerThis, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(powerThis);
                }
            } else if (linkFrom.energy < linkFrom.energyCapacity) {
	            if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linkFrom);
                }
	        } else if (linkFrom.energy == linkFrom.energyCapacity) {
                var linkTo = Game.getObjectById('5849063bbc8bbb3c4a7d29c7');
                linkFrom.transferEnergy(linkTo);
            } 
	    } else {
            var storedEnergy = Game.getObjectById('5848518f05e00f8c2184fecd');
            
            if (storedEnergy) { // Supply Power
                if(creep.withdraw(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                } 
            } 
	    }
	}
};

module.exports = roleHaulerMainSource;