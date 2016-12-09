var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.carry.energy >= 48) {
            creep.memory.harvesting = false;
        }
        
        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else {
            var storedEnergy = Game.getObjectById('5848518f05e00f8c2184fecd');
            var linkFrom = Game.getObjectById('58490942781406a6623018da');
            
            
            if (linkFrom.energy <= linkFrom.energyCapacity) {
                if (linkFrom.energy == linkFrom.energyCapacity) {
                    var linkTo = Game.getObjectById('5849c29f9104f05d2ae90026');
                    linkFrom.transferEnergy(linkTo);
                }
                
                
	            if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linkFrom);
                }
            } else if (storedEnergy) { // Supply Power
                if(creep.transfer(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                }
            }
        }
	}
};

module.exports = roleHarvester;