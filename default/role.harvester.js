module.exports.run = function(creep) {
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
			var sources = creep.room.find(FIND_SOURCES).sort(function(a, b) {
				let dta = Math.sqrt(Math.pow(Math.abs(creep.pos.x - a.pos.x), 2) + Math.pow(Math.abs(creep.pos.y - a.pos.y), 2));
				let dtb = Math.sqrt(Math.pow(Math.abs(creep.pos.x - b.pos.x), 2) + Math.pow(Math.abs(creep.pos.y - b.pos.y), 2));
				if(dta < dtb)  return -1;
				if(dta == dtb) return  0;
				if(dta > dtb)  return  1;
			});
			creep.memory.target = sources[0];
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) creep.moveTo(sources[0]);
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
};

module.exports.determineTask = function(creep) {
	if(creep.memory.task != "gathering" && creep.carry.energy == 0) {
		creep.memory.task = "gathering";
		creep.say(creep.memory.task);
	}
	if(creep.memory.task == "gathering" && creep.carry.energy == creep.carryCapacity) {
		creep.memory.task = "delivering";
		creep.say(creep.memory.task);
	}
};