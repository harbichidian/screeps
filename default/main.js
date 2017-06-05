var $roles = {
	harvester: require("role.harvester"),
	guard: require("role.guard")
};

var $rolePercentages = {
	harvester: 0.85,
	guard: 0.15
};

module.exports.loop = function() {
	// Keep at least 10 creeps around
	if(Object.keys(Game.creeps).length < 10) {
		Memory.underrepresentation = Object.keys($rolePercentages).reduce(function(und, role) {
		    var creepsOfRole = Object.keys(Game.creeps).filter(n => Game.creeps[n].memory.role == role).length * 1.0;
		    var totalCreeps = Object.keys(Game.creeps).length * 1.0;
		    
			und[role] = $rolePercentages[role] - (creepsOfRole / totalCreeps);
			return und;
		}, {});
		
		var roleToSpawn = Object.keys(underrepresentation).sort((a, b) => underrepresentation[a] - underrepresentation[b]).pop();
		
		switch(Game.spawns["Spawn1"].canCreateCreep($roles[roleToSpawn].body)) {
			case OK:
				console.log(`Spawn1 spawning ${roleToSpawn}`);
				Game.spawns['Spawn1'].createCreep($roles[roleToSpawn].body, undefined, {role: roleToSpawn});
				break;
			case ERR_NOT_ENOUGH_ENERGY:
				console.log("Spawn1 waiting for energy");
				break;
		}
	}
	
	Object.keys(Game.creeps).forEach(function(n) {
		console.log(`Running ${n}'s code, which is for role:${Game.creeps[n].memory.role}`);
		
		var role = $roles[Game.creeps[n].memory.role];
		if(role.run) {
			role.run(Game.creeps[n]);
		}
		else {
			console.log(`${Game.creeps[n].memory.role}.run was false`);
		}
	});
}
