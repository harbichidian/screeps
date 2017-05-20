var roleHarvester = require('role.harvester');
var roleGuard = require('role.guard');

module.exports.loop = function() {
	// Recount the population
	Memory.population = 0;
	for(var name in Memory.creeps) {
		// Clear old entities from memory
		if(!Game.creeps[name]) delete Memory.creeps[name];
		else Memory.population += 1;
	}
	
	// Keep at least 5 creeps around
	if(Memory.population < 5) {
		var harvester = [MOVE, CARRY, WORK];
		
		switch(Game.spawns["Spawn1"].canCreateCreep(harvester)) {
			case OK:
				console.log("Spawn1 spawning harvester");
				Game.spawns['Spawn1'].createCreep(harvester, undefined, {role: 'harvester'});
				break;
			case ERR_NOT_ENOUGH_ENERGY:
				console.log("Spawn1 waiting for energy");
				break;
		}
	}
	
	for(var name in Game.creeps) {
		switch(Game.creeps[name].memory.role) {
			case 'harvester':
				roleHarvester.run(Game.creeps[name]);
				break;
			case 'guard':
				roleGuard.run(Game.creeps[name]);
				break;
		}
	}
}