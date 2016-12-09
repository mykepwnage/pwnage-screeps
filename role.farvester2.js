var roleFarvester2 = {

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
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
            } else {
                if (creep.room.name=='E19N64') {
                    var needsPower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return ((
                                    structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.getEnergy().energy < structure.getEnergy().capacity
                            )}
                    });
                    
                    if(needsPower) { // Supply Power
                        // creep.say('powering');
                        if(creep.transfer(needsPower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(needsPower);
                            //console.log(creep.name + " powering " + needsPower[0]);
                        }
                    } 
                } else {
                    creep.moveTo(new RoomPosition(5, 11, 'E19N64'));
                }
            }
/*        } else {  // not in room, move to it
            creep.say('going home');
            creep.moveTo(new RoomPosition(25, 25, 'E19N64'));
        }*/
	}
};

module.exports = roleFarvester2;