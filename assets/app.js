
var play = function(pjs) {

	var objects = {

	};

	var objectList = [];

	var shapes = {};

	var keyBindings = [];

	var variables = {};


	var bkg = pjs.color(250);

	pjs.setup = function(){
		pjs.size(pjs.screenWidth,pjs.screenHeight);
		pjs.noStroke();
		pjs.smooth();
		pjs.resetVars();
	};

	pjs.draw = function(){
		pjs.background(bkg);
		for(var i=0; i<objectList.length; i++){
			objectList[i].render();
		}
	};

	pjs.keyPressed = function(){
		for(var i=0; i<keyBindings.length; i++){
			var curr = keyBindings[i];
			if(objects[curr.name] && pjs.key.toString() === curr.key){
				var obj = objects[curr.name];
				curr.func(obj,curr.num);
			}
		}
	}

	pjs.resetVars = function(){
		variables = {
			'huge' : 500,
			'tiny' : 10,
			'small': 50,
			'large': 400
		};
	}

	pjs.reset = function(){
		objects = {};
		objectList = [];
		keyBindings = [];
		variables = {};
		pjs.resetVars();
		pjs.setup();
	}

	pjs.addShape = function(name,type){
		if(objects[name]){
			return name + " is already here!";
		}
		var method = shapes[type.toLowerCase()];
		if(method){
			var newShape = new method();
			newShape.name = name;
			objects[name] = newShape;
			objectList.push(newShape);
			return '';
		}
		return type + ' is not a shape. Try \'' + name + ' is a circle\'';
	}

	pjs.removeShape = function(name){
		if(objects[name]){
			delete objects[name];
			objectList = objectList.filter(function(elem){
				return !(elem.name === name);
			});
			keyBindings = keyBindings.filter(function(elem){
				return !(elem.name === name);
			});
			return '';
		}
		return name + " isn't here yet.";
	}

	pjs.addVariable = function(name,val){
		if(variables[val]){
			variables[name] = variables[val];
		}else{
			var num = parseInt(val,10);
			if(num){
				variables[name] = num;
				return '';
			}
			return val + ' is not a number. Try \'' + name + ' is 200\'';
		}
	}

	pjs.editShape = function(name,attr,value){
		var obj = objects[name]
		if(obj){
			var num = parseInt(value,10);
			if(variables[value]){
				num = variables[value];
			}
			if(!num && num != 0){
				return value + ' is not a number. Try \'' + name + '\'s ' + attr + ' is 200\'';
			}
			if(attr === 'right'){
				attr = 'x';
				num = pjs.width-num;
			}else if(attr === 'left'){
				attr = 'x';
			}else if(attr === 'top'){
				attr = 'y';
			}else if(attr === 'bottom'){
				attr = 'y';
				num = pjs.height - num;
			}else if(attr === 'size'){
					attr = 'radius';
					num /= 2;
				}
			if(pjs.editShapeAttr[attr]){
				return pjs.editShapeAttr[attr](obj,num);
			}
			return name + ' doesn\'t have a ' + attr + '. Try \'' + name + '\'s size is 400\'';
		}
		return name + ' isn\'t here yet. Try \'' + name + ' is a circle\'';
	}

	pjs.moveShape = function(name,attr,value){
		var obj = objects[name]
		if(obj){
			var num = parseInt(value,10);
			if(variables[value]){
				num = variables[value];
			}
			if(!num && num != 0){
				return value + ' is not a number. Try \'' + name + '\'s ' + attr + ' is 200\'';
			}
			if(attr === 'right'){
				attr = 'x';
			}else if(attr === 'left'){
				attr = 'x';
				num *= -1;
			}else if(attr === 'top'){
				attr = 'y';
			}else if(attr === 'bottom'){
				attr = 'y';
				num *= -1;
			}else if(attr === 'up'){
				attr = 'y';
				num *= -1;
			}else if(attr === 'down'){
				attr = 'y';
			}else if(attr === 'size'){
					attr = 'radius';
					num /= 2;
			}
			if(pjs.editShapeAttr[attr]){
				return pjs.incShapeAttr[attr](obj,num);
			}
			return name + ' doesn\'t have a ' + attr + '. Try \'' + name + '\'s size is 400\'';
		}
		return name + ' isn\'t here yet. Try \'' + name + ' is a circle\'';
	}

	pjs.bindKeyInc = function(key,name,attr,value){
		var obj = objects[name]
		if(obj){
			var num = parseInt(value,10);
			if(variables[value]){
				num = variables[value];
			}
			if(!num && num != 0){
				return value + ' is not a number. Try\'' + name + ' ' + attr + ' is 200\'';
			}
			if(attr === 'right'){
				attr = 'x';
			}else if(attr === 'left'){
				attr = 'x';
				num *= -1;
			}else if(attr === 'top'){
				attr = 'y';
			}else if(attr === 'bottom'){
				attr = 'y';
				num *= -1;
			}else if(attr === 'up'){
				attr = 'y';
				num *= -1;
			}else if(attr === 'down'){
				attr = 'y';
			}else if(attr === 'size'){
					attr = 'radius';
					num /= 2;
			}
			if(pjs.editShapeAttr[attr]){
				keyBindings.push({
					'key':key,
					'name':name,
					'attr':attr,
					'num':num,
					'func': pjs.incShapeAttr[attr]
				});	
				//console.log(keyBindings);
				return '';		
			}
			return name + ' doesn\'t have a ' + attr + '. Try \'' + name + '\'s size is 400\'';
		}
		return name + ' isn\'t here yet. Try \'' + name + ' is a circle\'';
	}

	pjs.bindKeyIs = function(key,name,attr,value){
		var obj = objects[name]
		if(obj){
			var num = parseInt(value,10);
			if(variables[value]){
				num = variables[value];
			}
			if(!num && num != 0){
				return value + ' is not a number. Try\'' + name + ' ' + attr + ' is 200\'';
			}
			if(attr === 'right'){
				attr = 'x';
				num = pjs.width-num;
			}else if(attr === 'left'){
				attr = 'x';
			}else if(attr === 'top'){
				attr = 'y';
			}else if(attr === 'bottom'){
				attr = 'y';
				num = pjs.height - num;
			}else if(attr === 'size'){
					attr = 'radius';
					num /= 2;
				}
			if(pjs.editShapeAttr[attr]){
				keyBindings.push({
					'key':key,
					'name':name,
					'attr':attr,
					'num':num,
					'func': pjs.editShapeAttr[attr]
				});	
				//console.log(keyBindings);
				return '';		
			}
			return name + ' doesn\'t have a ' + attr + '. Try \'' + name + '\'s size is 400\'';
		}
		return name + ' isn\'t here yet. Try \'' + name + ' is a circle\'';
	}

	pjs.editShapeAttr = {
		'radius': function(obj,value){
			obj.shape.rad = value;
			obj.shape.w = value*2;
			obj.shape.h = value*2;
			return '';
		},
		'x': function(obj,value){
			obj.shape.pos.x = value;
			return '';			
		},
		'y': function(obj,value){
			obj.shape.pos.y = value;
			return '';	
		},

		'red': function(obj,value){
			obj.shape.r = value;
			return '';	
		},

		'green': function(obj,value){
			obj.shape.g = value;
			return '';	
		},

		'blue': function(obj,value){
			obj.shape.b = value;
			return '';	
		},

		'width': function(obj,value){
			obj.shape.w = value;
			return '';	
		},

		'height': function(obj,value){
			obj.shape.h = value;
			return '';	
		}
	}

	pjs.incShapeAttr = {
		'radius': function(obj,value){
			obj.shape.rad += value;
			obj.shape.w += value*2;
			obj.shape.h += value*2;
		},
		'x': function(obj,value){
			obj.shape.pos.x += value;
		},
		'y': function(obj,value){
			obj.shape.pos.y += value;
		},

		'red': function(obj,value){
			obj.shape.r += value;
		},

		'green': function(obj,value){
			obj.shape.g += value;
		},

		'blue': function(obj,value){
			obj.shape.b += value;
		},
		'width': function(obj,value){
			obj.shape.w += value;
			return '';	
		},

		'height': function(obj,value){
			obj.shape.h += value;
			return '';	
		}
	}	

	var Shape = function(){
		this.rad = 150;
		this.pos = new pjs.PVector(pjs.width/2,pjs.height/2);
		this.r = 100;
		this.g = 100;
		this.b = 100;
		this.w = this.rad;
		this.h = this.rad;

		this.tweens = {
			rad: 0,
			pos: new pjs.PVector(pjs.width/2,pjs.height/2),
			r: 100,
			g: 100,
			b: 100,
			w: 0,
			h: 0
		};

		this.tween = function(){
			this.tweens.pos.x += (this.pos.x-this.tweens.pos.x)*.1;
			this.tweens.pos.y += (this.pos.y-this.tweens.pos.y)*.1;
			this.tweens.rad += (this.rad-this.tweens.rad)*.1;
			this.tweens.r += (this.r-this.tweens.r)*.1;
			this.tweens.g += (this.g-this.tweens.g)*.1;
			this.tweens.b += (this.b-this.tweens.b)*.1;
			this.tweens.w += (this.w-this.tweens.w)*.1;
			this.tweens.h += (this.h-this.tweens.h)*.1;
		}
	}

	shapes.circle = function(){

		this.shape = new Shape();

		this.render = function(){

			this.shape.tween();

			pjs.fill(this.shape.tweens.r,this.shape.tweens.g,this.shape.tweens.b,172);
			pjs.ellipse(this.shape.tweens.pos.x,this.shape.tweens.pos.y,
				this.shape.tweens.w,this.shape.tweens.h);
		}		
	}

	shapes.ellipse = function(){

		this.shape = new Shape();
		this.shape.w += pjs.random(-50,50);
		this.shape.h += pjs.random(-50,50);

		this.render = function(){

			this.shape.tween();

			pjs.fill(this.shape.tweens.r,this.shape.tweens.g,this.shape.tweens.b,172);
			pjs.ellipse(this.shape.tweens.pos.x,this.shape.tweens.pos.y,
				this.shape.tweens.w,this.shape.tweens.h);
		}		
	}

	shapes.oval = shapes.ellipse;

	shapes.square = function(){
		
		this.shape = new Shape();

		this.render = function(){

			this.shape.tween();

			pjs.fill(this.shape.tweens.r,this.shape.tweens.g,this.shape.tweens.b,172);
			pjs.rect(this.shape.tweens.pos.x-this.shape.tweens.w/2,
				this.shape.tweens.pos.y-this.shape.tweens.h/2,
				this.shape.tweens.w,this.shape.tweens.h);
		}	
	
	}

	shapes.rectangle = function(){
		
		this.shape = new Shape();
		this.shape.w += pjs.random(-50,50);
		this.shape.h += pjs.random(-50,50);

		this.render = function(){

			this.shape.tween();

			pjs.fill(this.shape.tweens.r,this.shape.tweens.g,this.shape.tweens.b,172);
			pjs.rect(this.shape.tweens.pos.x-this.shape.tweens.w/2,
				this.shape.tweens.pos.y-this.shape.tweens.h/2,
				this.shape.tweens.w,this.shape.tweens.h);
		}	
	
	}

	shapes.rect = shapes.rectangle;

	shapes.triangle = function(){
		this.shape = new Shape();
		this.shape.w += pjs.random(-50,50);
		this.shape.h += pjs.random(-50,50);

		this.render = function(){

			this.shape.tween();

			pjs.fill(this.shape.tweens.r,this.shape.tweens.g,this.shape.tweens.b,172);
			pjs.triangle(this.shape.tweens.pos.x - this.shape.tweens.w/2,
				this.shape.tweens.pos.y + this.shape.tweens.h/2,
				this.shape.tweens.pos.x,
				this.shape.tweens.pos.y - this.shape.tweens.h/2,
				this.shape.tweens.pos.x + this.shape.tweens.w/2,
				this.shape.tweens.pos.y + this.shape.tweens.h/2);
		}

	}

};

var canvas = document.getElementById("langcanvas");
var processingInstance = new Processing(canvas, play);
