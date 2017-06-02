module.exports.body = [MOVE, ATTACK, ATTACK];

module.exports.run = function(creep) {
	if(creep.memory.target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
	    console.log(`${creep.name} found an enemy!`);
	    
	    switch(creep.attack(creep.memory.target)) {
			case ERR_NOT_IN_RANGE:
				creep.moveTo(creep.memory.target);
				break;
			case ERR_INVALID_TARGET:
				if(creep.memory.target.hits == 0) creep.memory.target = null;
				break;
		}
	}
	else if(creep.memory.target = creep.pos.findClosestByRange(FIND_SOURCES)) {
	    // Hover near sources, because that's probably where our creeps will be
		if(creep.pos.getRangeTo(creep.memory.target) > 4) creep.moveTo(target);
	}
};