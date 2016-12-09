/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attacker');
 * mod.thing == 'a thing'; // true
 */

var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
        if (creep.room.name=='E19N64') {
            creep.moveTo(new RoomPosition(48, 10, 'E18N64'));
        } else { // in the room with target, attack
            if (creep.room.name=='E18N64') {
                var invader = creep.room.find(FIND_HOSTILE_CREEPS);
                if (invader.length) {
                    if(creep.attack(invader[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(invader[0]);    
                    }
                }
            }
        }
    }
};

module.exports = roleAttacker;