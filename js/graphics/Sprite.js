function Sprite(src) {
	this.img = new Image();
	this.img.src = src;
	
	grass = {
		gr1: {
			img: this.img,
			x: 224,
			y: 0
	  },
    gr2: {
			img: this.img,
			x: 256,
			y: 0
		}
	};
	
	trees = {
		tr1: {
			img: this.img,
			x: 288,
			y: 0
		},
		tr2: {
			img: this.img,
			x: 320,
			y: 0
		},
		tr3: {
			img: this.img,
			x: 352,
			y: 0
		},
		tr4: {
			img: this.img,
			x: 384,
			y: 0
		},
		tr5: {
			img: this.img,
			x: 224,
			y: 32
		},
		tr6: {
			img: this.img,
			x: 256,
			y: 32
		},
		tr7: {
			img: this.img,
			x: 288,
			y: 32
		},
		tr8: {
			img: this.img,
			x: 320,
			y: 32
		},
		tr9: {
			img: this.img,
			x: 352,
			y: 32
		}
	};
		
	playSpr = {
		idle: {
			img: this.img,
			x: 0,
			y: 192
		},
		walk_right: {
			img: this.img,
			x: 0,
			y: 352,
			frames: [0, 1, 2, 3, 4, 5, 6, 7]
		},
		walk_left: {
			img: this.img,
			x: 288,
			y: 0,
			frames: [0, 1, 2, 3, 4, 5, 6, 7]
		},
		walk_up: {
			img: this.img,
			x: 256,
			y: 0,
			frames: [0, 1, 2, 3, 4, 5, 6, 7]
		},
		walk_down: {
			img: this.img,
			x: 320,
			y: 0,
			frames: [0, 1, 2, 3, 4, 5, 6, 7]
		},
	};
	
	monsters = {
		lev1: {
			m1: {
				img: this.img,
				x: 224,
				y: 64
			},
			m2: {
				img: this.img,
				x: 256,
				y: 64
			},
			m3: {
				img: this.img,
				x: 352,
				y: 160
			},
			m4: {
				img: this.img,
				x: 288,
				y: 160
			},
			m5: {
				img: this.img,
				x: 320,
				y: 192
			}
		},
		lev2: {
			m1: {
				img: this.img,
				x: 352,
				y: 64
			},
			m2: {
				img: this.img,
				x: 256,
				y: 96
			},
			m3: {
				img: this.img,
				x: 288,
				y: 96
			},
			m4: {
				img: this.img,
				x: 256,
				y: 128
			},
			m5: {
				img: this.img,
				x: 384,
				y: 128
			},
			m6: {
				img: this.img,
				x: 320,
				y: 64
			},
			m7: {
				img: this.img,
				x: 384,
				y: 160
			}
		},
		lev3: {
			m1: {
				img: this.img,
				x: 288,
				y: 192
			},
			m2: {
				img: this.img,
				x: 288,
				y: 128
			},
			m3: {
				img: this.img,
				x: 384,
				y: 96
			},
			m4: {
				img: this.img,
				x: 352,
				y: 96
			},
			m5: {
				img: this.img,
				x: 320,
				y: 128
			},
			m6: {
				img: this.img,
				x: 352,
				y: 128
			}
		},
		lev4: {
			m1: {
				img: this.img,
				x: 256,
				y: 160
			},
			m2: {
				img: this.img,
				x: 224,
				y: 96
			},
			m3: {
				img: this.img,
				x: 320,
				y: 160
			},
			m4: {
				img: this.img,
				x: 320,
				y: 96
			},
			m5: {
				img: this.img,
				x: 256,
				y: 192
			},
			m6: {
				img: this.img,
				x: 288,
				y: 64
			}
		}
	};
		
	boss = {
		img: this.img, 
		x: 384,
		y: 64
	};	
	
	weapons = {
	  lev1: {
				w1: {
				img: this.img,
				x: 352,
				y: 192
			}
		},
		lev2: {
			w1: {
				img: this.img,
				x: 256,
				y: 224
			},
			w2: {
				img: this.img,
				x: 384,
				y: 192
			},
		},
		lev3: {
			w1: {
				img: this.img,
				x: 384,
				y: 192
			},
			w2: {
				img: this.img,
				x: 352,
				y: 224
			}
		},
		lev4: {
			w1: {
				img: this.img,
				x: 320,
				y: 224
			}
		}
	};
	
	food = {
		f1: {
			img: this.img,
			x: 288,
			y: 256
		},
		f2: {
			img: this.img,
			x: 320,
			y: 256
		},
		f3: {
			img: this.img,
			x: 352,
			y: 256
		},
		f4: {
			img: this.img,
			x: 384,
			y: 256
		},
		f5: {
			img: this.img,
			x: 384,
			y: 288
		},
		f6: {
			img: this.img,
			x: 288,
			y: 320
		},
		f7: {
			img: this.img,
			x: 288,
			y: 288
		},
		f8: {
			img: this.img,
			x: 352,
			y: 288
		},
		f9: {
			img: this.img,
			x: 320,
			y: 288
		}
	};
	
	treasure = {
		lev1: {
			t1: {
				img: this.img,
				x: 320,
				y: 320
			},
			t2: {
				img: this.img,
				x: 352,
				y: 320
			},
			t3: {
				img: this.img,
				x: 384,
				y: 320
			},
		},
		lev2: {
			t1: {
				img: this.img,
				x: 288,
				y: 352
			},
			t2: {
				img: this.img,
				x: 320,
				y: 352
			},
		},
		lev3: {
			t1: {
				img: this.img,
				x: 352,
				y: 352
			},
			t2: {
				img: this.img,
				x: 384,
				y: 352
			}
		},
		lev4: {
			t1: {
				img: this.img,
				x: 192,
				y: 384
			},
			t2: {
				img: this.img,
				x: 224,
				y: 384
			}
		}
	};
}