module.exports = {
	run: function(creep) {
		creep.memory.target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS) || creep.pos.findClosestByRange(FIND_SOURCES);
		
		switch(typeof creep.memory.target) {
			case "Creep":
				switch(creep.attack(creep.memory.target)) {
					case ERR_NOT_IN_RANGE:
						creep.moveTo(target);
						break;
					case ERR_INVALID_TARGET:
						if(creep.memory.target.hits == 0) creep.memory.target = null;
						break;
				}
				break;
			case "Source":
				// Hover near sources, because that's probably where our creeps will be
				if(creep.pos.getRangeTo(creep.memory.target) > 2) creep.moveTo(target);
				break;
		}
	}
};