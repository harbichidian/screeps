module.exports = {
	run: function(creep) {
		if(creep.memory.target) {
			switch(creep.attack(creep.memory.target)) {
				case ERR_NOT_IN_RANGE:
					creep.moveTo(target);
					break;
				case ERR_INVALID_TARGET:
					if(creep.memory.target.hits == 0) creep.memory.target = null;
					break;
			}
		}
		else {
			creep.memory.target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
			if(!creep.memory.target) {
				// Try to heal
			}
		}
	}
};