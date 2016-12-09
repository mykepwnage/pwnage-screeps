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
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            var storedEnergy = Game.getObjectById('5849a34bc4b7c52411731352');
            
            if(storedEnergy) { // Supply Power
                if(creep.transfer(storedEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storedEnergy);
                }
            }
        }
	}
};

module.exports = roleHarvester;