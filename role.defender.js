var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
       var hostiles = Game.rooms['E19N64'].find(FIND_HOSTILE_CREEPS);
        
        while(hostiles.length) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostiles[0]);
            }
            hostiles = Game.rooms['E19N64'].find(FIND_HOSTILE_CREEPS);
	    }
	}
};

module.exports = roleDefender;