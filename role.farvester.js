var roleFarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        
        if(creep.memory.harvesting) {
            if (creep.room.name=='E19N64') {
                creep.moveTo(new RoomPosition(48, 10, 'E18N64'));
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        } else {
            if (creep.room.name=='E19N64') {
                var needsPower = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE) &&
                                structure.getEnergy().energy < structure.getEnergy().capacity
                        )}
                });
                
                if(needsPower.length > 0) { // Supply Power
                    // creep.say('powering');
                    if(creep.transfer(needsPower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(needsPower[0]);
                        //console.log(creep.name + " powering " + needsPower[0]);
                    }
                }
            } else {
                creep.moveTo(new RoomPosition(5, 11, 'E19N64'));
            }
        }
	}
};

module.exports = roleFarvester;