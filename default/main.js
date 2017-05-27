Memory.roles = {
	harvester: require("role.harvester"),
	guard: require("role.guard")
};

Memory.rolePercentages = {
	harvester: 0.85,
	guard: 0.15
};

module.exports.loop = function() {
	// Keep at least 5 creeps around
	if(Game.creeps.length < 5) {
		var creepToSpawn;
		var underrepresentation = {};
		Object.keys(Memory.rolePercentages).forEach(function(role) {
			underrepresentation[role] = Game.creeps.filter(c => c.role == role).length / Game.creeps.length;
		});
		
		creepToSpawn = Memory.roles[Object.keys(underrepresentation).sort((a, b) => underrepresentation[a] - underrepresentation[b]).pop()];
		
		switch(Game.spawns["Spawn1"].canCreateCreep(Memory.roles[roleToSpawn].body)) {
			case OK:
				console.log(`Spawn1 spawning ${roleToSpawn}`);
				Game.spawns['Spawn1'].createCreep(Memory.roles[roleToSpawn].body, undefined, {role: roleToSpawn});
				break;
			case ERR_NOT_ENOUGH_ENERGY:
				console.log("Spawn1 waiting for energy");
				break;
		}
	}
	
	Game.creeps.forEach(function(creep) {
		Memory.roles[creep.memory.role].run(creep);
	});
}