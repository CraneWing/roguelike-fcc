function Input() {
	this.pressed = {};
	this.down = {};
	
	this.keys = {
		right: 39,
		left: 37,
		up: 38,
		down: 40,
		enter: 13,
		spacebar: 32
	};

	var self = this;
	
	document.addEventListener('keydown', function(event) {
		event.preventDefault();
		self.pressed[event.keyCode] = true;
	});
	
  document.addEventListener('keyup', function(event) {
		delete self.down[event.keyCode];
		delete self.pressed[event.keyCode];
  });

	this.isDown = function(keyCode) {
	  return this.down[keyCode];
	};
	
	this.isPressed = function(keyCode) {
		if (this.pressed[keyCode]) {
			return false;
		}
		else if (this.down[keyCode]) {
			return (this.pressed[keyCode] = true);
		}
	};
	
	return false;
}

