;
    var roleHarvester = require('role.harvester');
    var roleHarvester2 = require('role.harvester2');
    var roleUpgrader = require('role.upgrader');
    var roleBuilder = require('role.builder');
    var roleAttacker = require('role.attacker');
    var roleMaintain = require('role.maintain');
    var roleDefender = require('role.defender');
    var roleGunner = require('role.gunners');
    var roleFarvester = require('role.farvester');
    var roleFarvester2 = require('role.farvester2');
    var roleHauler = require('role.hauler');
    var roleHaulerMainSource = require('role.haulerMainSource');
    var roleHaulerSecondSource = require('role.haulerSecondSource');
    var roleHaulerFarvester = require('role.haulerFarvester');
    require('Structure.getEnergy()')();

module.exports.loop = function () {
    
    
    
    
    
    
    
    
    
    
    var hostiles = Game.rooms['E19N64'].find(FIND_HOSTILE_CREEPS);
    
    var towers = Game.rooms['E19N64'].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
   
    if(hostiles.length > 0) {
        //var healers =
        
        
        var username = hostiles[0].owner.username;
        //Game.notify(`User ${username} spotted in room ${roomName}`);
            
        towers.forEach(tower => tower.attack(hostiles[0]));
        
        
        var damagedBuilding = Game.rooms['E19N64'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_SPAWN || 
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.hits < structure.hitsMax;
            }
        });            
        
    
        if (damagedBuilding.length > 0) {
            Game.rooms.E19N64.controller.activateSafeMode()
        }
        
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');    
        if(defenders.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH.TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'defender', defending: 'false'});
            console.log('Spawning new defender: ' + newName);
        }
        
    } else {
        var containers = Game.rooms['E19N64'].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_CONTAINER && structure.hits < 225000)
                    )}
        });
        
        var repairList = Game.rooms['E19N64'].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_RAMPART && structure.hits < 250000) 
                            ||
                            (structure.structureType == STRUCTURE_ROAD && structure.hits < 4601)
                            ||
                            (structure.structureType == STRUCTURE_WALL && structure.hits < 50000)
                    )}
        });
        
        if (containers.length) {
            towers.forEach(tower => tower.repair(containers[0]));
        } else if (repairList.length) {
            towers.forEach(tower => tower.repair(repairList[0]));
        } 
    }
    
    
    
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var haulerMainSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerMainSource');
    var haulerSecondSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerSecondSource');
    var haulerFarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerFarvester');
    var farvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'farvester');
    var farvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'farvester2');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var gunners = _.filter(Game.creeps, (creep) => creep.memory.role == 'gunner');
    
    var scaffolding =  Game.rooms['E19N64'].find(FIND_CONSTRUCTION_SITES);
    
    if(harvesters.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new harvester: ' + newName);
    } else if(haulerMainSource.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'haulerMainSource', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new haulerMainSource: ' + newName);
    } else if(harvesters2.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester2', harvesting: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new harvester2: ' + newName);
    } else if(haulerSecondSource.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'haulerSecondSource', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new haulerSecondSource: ' + newName);
    } else if(farvesters.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'farvester', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new farvester: ' + newName);
    } else if(farvesters2.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'farvester2', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new farvester2: ' + newName);
    } else if(haulerFarvester.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'haulerFarvester', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new haulerFarvester: ' + newName);
    } else if(upgraders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader', upgrading: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new upgrader: ' + newName);
    } else if(scaffolding.length) {
        if(builders.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', building: 'false', home: Game.rooms['E19N64'].name});
                console.log('Spawning new builder: ' + newName);
        }
    } else if(gunners.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'gunner', gunning: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new gunner: ' + newName);
    } else if(attackers.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK], undefined, {role: 'attacker', attacking: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new attacker: ' + newName);
    } else if(haulers.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'hauler', hauling: 'false', home: Game.rooms['E19N64'].name});
        console.log('Spawning new hauler: ' + newName);
    }  
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
    			roleUpgrader.run(creep);
    			break;
            case 'builder':
    			roleBuilder.run(creep);
    			break;
            case 'defender':
                roleDefender.run(creep);
                break;
            case 'attacker':
                roleAttacker.run(creep);
                break;
            case 'gunner':
                roleGunner.run(creep);
                break;
            case 'farvester':
    			roleFarvester.run(creep);
    			break;
            case 'farvester2':
    			roleFarvester2.run(creep);
    			break;
            case 'harvester2':
    			roleHarvester2.run(creep);
    			break;
            case 'haulerMainSource':
    			roleHaulerMainSource.run(creep);
    			break;
            case 'haulerSecondSource':
    			roleHaulerSecondSource.run(creep);
    			break;
            case 'haulerFarvester':
    			roleHaulerFarvester.run(creep);
    			break;
			case 'hauler':
			    roleHauler.run(creep);
			    break;
        }
    }
}


