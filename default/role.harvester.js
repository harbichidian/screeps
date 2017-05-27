module.exports = {
	body: [MOVE, ATTACK, ATTACK],
	run: function(creep) {
		if(creep.memory.task != 'gathering' && creep.carry.energy == 0) {
			creep.memory.task = 'gathering';
			creep.say(creep.memory.task);
		}
		if(creep.memory.task == 'gathering' && creep.carry.energy == creep.carryCapacity) {
			creep.memory.task = 'delivering';
			creep.say(creep.memory.task);
		}
		
		switch(creep.memory.task) {
			case 'gathering':
				creep.memory.target = creep.pos.findClosestByRange(FIND_SOURCES);
				if(creep.harvest(creep.memory.target) == ERR_NOT_IN_RANGE) creep.moveTo(creep.memory.target);
				break;
			case 'delivering':
				var structures = creep.room.find(FIND_MY_STRUCTURES);
				
				var unfilledSpawns = structures.filter(s => s.structureType == STRUCTURE_SPAWN).filter(s => s.energy < s.energyCapacity);
				if(unfilledSpawns.length > 0) {
					creep.memory.target = unfilledSpawns[0];
					if(creep.transfer(unfilledSpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(unfilledSpawns[0]);
					break;
				}
				
				var unfilledTowers = structures.filter(s => s.structureType == STRUCTURE_TOWER).filter(s => s.energy < s.energyCapacity);
				if(unfilledTowers.length > 0) {
					creep.memory.target = unfilledTowers[0];
					if(creep.transfer(unfilledTowers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(unfilledTowers[0]);
					break;
				}
				
				var unfilledExtensions = structures.filter(s => s.structureType == STRUCTURE_EXTENSION).filter(s => s.energy < s.energyCapacity);
				if(unfilledExtensions.length > 0) {
					creep.memory.target = unfilledExtensions[0];
					if(creep.transfer(unfilledExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(unfilledExtensions[0]);
					break;
				}
				
				var unfilledControllers = structures.filter(s => s.structureType == STRUCTURE_CONTROLLER).filter(s => s.progress < s.progressTotal);
				if(unfilledControllers.length > 0) {
					creep.memory.target = unfilledControllers[0];
					if(creep.transfer(unfilledControllers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(unfilledControllers[0]);
					break;
				}
				
				break;
		}
	},
	determineTask: function(creep) {
		if(creep.memory.task != "gathering" && creep.carry.energy == 0) {
			creep.memory.task = "gathering";
			creep.say(creep.memory.task);
		}
		if(creep.memory.task == "gathering" && creep.carry.energy == creep.carryCapacity) {
			creep.memory.task = "delivering";
			creep.say(creep.memory.task);
		}
	}
}