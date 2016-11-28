function Sprites() {
	this.images = {};

	var self = this;

	this.loadImages = function(sources, callback) {
		var loadedImages = 0;
		var numImages = 0;

		for (var src in sources) {
			numImages++;
		}

		for (src in sources) {
			console.log('loading ' + src);
			self.images[src] = new Image();

			self.images[src].onload = function() {
				if (++loadedImages >= numImages) {
					callback(self.images);
				}
			};
			
			self.images[src].src = sources[src];
		}
	};
	
	// assigns sprite sheet to image names
	this.setSprites = function(spriteImg) {
		this.grass = {
			gr1: {
				img: spriteImg,
				x: 224,
				y: 0
		  },
	    gr2: {
				img: spriteImg,
				x: 256,
				y: 0
			}
		};
	
		this.trees = {
			tr1: {
				img: spriteImg,
				x: 288,
				y: 0
			},
			tr2: {
				img: spriteImg,
				x: 320,
				y: 0
			},
			tr3: {
				img: spriteImg,
				x: 352,
				y: 0
			},
			tr4: {
				img: spriteImg,
				x: 384,
				y: 0
			},
			tr5: {
				img: spriteImg,
				x: 224,
				y: 32
			},
			tr6: {
				img: spriteImg,
				x: 256,
				y: 32
			},
			tr7: {
				img: spriteImg,
				x: 288,
				y: 32
			},
			tr8: {
				img: spriteImg,
				x: 320,
				y: 32
			},
			tr9: {
				img: spriteImg,
				x: 352,
				y: 32
			}
		};
		
		this.playSprite = {
			idle: {
				img: spriteImg,
				x: 0,
				y: 192
			},
			walk_right: {
				img: spriteImg,
				x: 0,
				y: 352
			},
			walk_left: {
				img: spriteImg,
				x: 0,
				y: 288
			},
			walk_up: {
				img: spriteImg,
				x: 0,
				y: 256
			},
			walk_down: {
				img: spriteImg,
				x: 0,
				y: 320
			},
		};
	
		this.monsters = {
			lev1: {
				m1: {
					img: spriteImg,
					x: 224,
					y: 64
				},
				m2: {
					img: spriteImg,
					x: 256,
					y: 64
				},
				m3: {
					img: spriteImg,
					x: 352,
					y: 160
				},
				m4: {
					img: spriteImg,
					x: 288,
					y: 160
				},
				m5: {
					img: spriteImg,
					x: 320,
					y: 192
				}
			},
			lev2: {
				m1: {
					img: spriteImg,
					x: 352,
					y: 64
				},
				m2: {
					img: spriteImg,
					x: 256,
					y: 96
				},
				m3: {
					img: spriteImg,
					x: 288,
					y: 96
				},
				m4: {
					img: spriteImg,
					x: 256,
					y: 128
				},
				m5: {
					img: spriteImg,
					x: 384,
					y: 128
				},
				m6: {
					img: spriteImg,
					x: 320,
					y: 64
				},
				m7: {
					img: spriteImg,
					x: 384,
					y: 160
				}
			},
			lev3: {
				m1: {
					img: spriteImg,
					x: 288,
					y: 192
				},
				m2: {
					img: spriteImg,
					x: 288,
					y: 128
				},
				m3: {
					img: spriteImg,
					x: 384,
					y: 96
				},
				m4: {
					img: spriteImg,
					x: 352,
					y: 96
				},
				m5: {
					img: spriteImg,
					x: 320,
					y: 128
				},
				m6: {
					img: spriteImg,
					x: 352,
					y: 128
				}
			},
			lev4: {
				m1: {
					img: spriteImg,
					x: 256,
					y: 160
				},
				m2: {
					img: spriteImg,
					x: 224,
					y: 96
				},
				m3: {
					img: spriteImg,
					x: 320,
					y: 160
				},
				m4: {
					img: spriteImg,
					x: 320,
					y: 96
				},
				m5: {
					img: spriteImg,
					x: 256,
					y: 192
				},
				m6: {
					img: spriteImg,
					x: 288,
					y: 64
				}
			}
		};
		
		this.boss = {
			img: spriteImg, 
			x: 384,
			y: 64
		};	
	
		this.weapons = {
		  lev1: {
					w1: {
					img: spriteImg,
					x: 352,
					y: 192
				}
			},
			lev2: {
				w1: {
					img: spriteImg,
					x: 256,
					y: 224
				},
				w2: {
					img: spriteImg,
					x: 384,
					y: 192
				},
			},
			lev3: {
				w1: {
					img: spriteImg,
					x: 384,
					y: 192
				},
				w2: {
					img: spriteImg,
					x: 352,
					y: 224
				}
			},
			lev4: {
				w1: {
					img: spriteImg,
					x: 320,
					y: 224
				}
			}
		};
	
		this.food = {
			f1: {
				img: spriteImg,
				x: 288,
				y: 256
			},
			f2: {
				img: spriteImg,
				x: 320,
				y: 256
			},
			f3: {
				img: spriteImg,
				x: 352,
				y: 256
			},
			f4: {
				img: spriteImg,
				x: 384,
				y: 256
			},
			f5: {
				img: spriteImg,
				x: 384,
				y: 288
			},
			f6: {
				img: spriteImg,
				x: 288,
				y: 320
			},
			f7: {
				img: spriteImg,
				x: 288,
				y: 288
			},
			f8: {
				img: spriteImg,
				x: 352,
				y: 288
			},
			f9: {
				img: spriteImg,
				x: 320,
				y: 288
			}
		};
		
		this.treasure = {
			lev1: {
				t1: {
					img: spriteImg,
					x: 320,
					y: 320
				},
				t2: {
					img: spriteImg,
					x: 352,
					y: 320
				},
				t3: {
					img: spriteImg,
					x: 384,
					y: 320
				},
			},
			lev2: {
				t1: {
					img: spriteImg,
					x: 288,
					y: 352
				},
				t2: {
					img: spriteImg,
					x: 320,
					y: 352
				},
			},
			lev3: {
				t1: {
					img: spriteImg,
					x: 352,
					y: 352
				},
				t2: {
					img: spriteImg,
					x: 384,
					y: 352
				}
			},
			lev4: {
				t1: {
					img: spriteImg,
					x: 192,
					y: 384
				},
				t2: {
					img: spriteImg,
					x: 224,
					y: 384
				}
			}
		};
	};
}