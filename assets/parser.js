
var terminalHeight = 200;

var toggle = false;
var infoToggle = false;

//reset localStorage
localStorage.clear();

var hints = [
    '\'billy is a circle\'. Keep typing \'help\' for more hints',
    '\'billy\'s size is 400\'',
    '\'move billy left 100\'',
    '\'billy\'s red is 250\'',
    '\'when i press q move billy right 50\'.',
    '\'jane is a square\'',
    '\'jane\'s green is 180\'',
    '\'when i press q move jane\'s width 50\'',
    '\'when i press k jane\'s width is 50\'',
    '\'lucy is a triangle\'',
    '\'lucy\'s height is 300\'',
    '\'lucy\'s width is 400\'',
    '\'move lucy\'s blue 100\'',
    '\'number is 20\'',
    '\'when i press p move lucy\'s red number\'',
    '\'when i press p move lucy\'s size number\'',
    '\'when i press y lucy\'s red is number\'',
    '\'remove lucy\''
];

var counter = -1;

var regexs = {
    'isa': /^([A-Za-z]+) is an? ([A-Za-z0-9]+)$/,
    'isvar': /^([A-Za-z]+) is ([-.A-Za-z0-9]+)$/,
    'isattr': /^([A-Za-z]+)('s)? ([A-Za-z]+) is ([-.A-Za-z0-9]+)$/,
    'moveattr': /^move ([A-Za-z]+)('s)? ([A-Za-z]+) ([-.A-Za-z0-9]+)$/,
    'incaction': /^when i press ([A-Za-z0-9]) move ([A-Za-z]+)('s)? ([A-Za-z0-9]+) ([-.A-Za-z0-9]+)$/,
    'isaction': /^when i press ([A-Za-z0-9]) ([A-Za-z]+)('s)? ([A-Za-z0-9]+) is ([-.A-Za-z0-9]+)$/,
    'remove': /^((remove)|(delete)) ([A-Za-z]+)$/,
};

var pjs = processingInstance;
pjs.reset();

var parse = function(command){

    if(command === 'help'){
        counter++;
        if(counter >= hints.length){
            counter = -1;
            return 'That\'s it! Type \'help\' again to restart the tutorial.\nType \'reset\' to reset the canvas.';
        }
        return 'try ' + hints[counter];
    }else if(command === 'up'){
        var offset = -1*(terminalHeight - 30); 
         $("#terminal").animate({ top: offset + 'px'},300);
         return '';
    }else if(command === 'down'){
        $("#terminal").animate({ top: '0px'},300);
        return '';
    }else if(command === 'reset'){
        pjs.reset();
        counter = -1;
        return '';
    }else if(command === 'save'){
        savePNG();
        return '';
    }

    var match = command.match(regexs.isa);
    if(match && match[1] && match[2]){
        return pjs.addShape(match[1],match[2]);
    }

    var match = command.match(regexs.isvar);
    if(match && match[1] && match[2]){
        return pjs.addVariable(match[1],match[2]);
    }

    match = command.match(regexs.isattr);
    if(match && match[1] && match[3] && match[4]){
        return pjs.editShape(match[1],match[3],match[4]);
    }

    match = command.match(regexs.moveattr);
    if(match && match[1] && match[3] && match[4]){
        return pjs.moveShape(match[1],match[3],match[4]);
    }

    match = command.match(regexs.incaction);
    if(match && match[1] && match[2] && match[4] && match[5]){
        return pjs.bindKeyInc(match[1],match[2],match[4],match[5]);
    }

    match = command.match(regexs.isaction);
    if(match && match[1] && match[2] && match[4] && match[5]){
        return pjs.bindKeyIs(match[1],match[2],match[4],match[5]);
    }

    match = command.match(regexs.remove);
    if(match && match[4]){
        return pjs.removeShape(match[4]);
    }

    return 'something isn\'t right. type \'help\' if you\'re stuck.';

}



$('#terminal').terminal(function(command, term) {
        if (command){
            var result = parse(command);
            if (result){
                term.echo(result);
            }
        }
    }, {
        greetings: 'Hello! Type \'help\' if you feel lost.',
        name: 'langterminal',
        height: terminalHeight,
        width: window.innerWidth,
        prompt: '> '});

$(".button").click(function() {
    toggle = !toggle;
    var offset = 0;
    if(toggle){
        offset = -1*(terminalHeight - 30); 
    }
    $("#terminal").animate({ top: offset + 'px'},200);
});

$(".info").click(function() {
    var offset = 20;
    if(infoToggle){
        offset = -550;
    }
    $(".infobox").animate({ right: offset + 'px'},200);
    infoToggle = !infoToggle;
});

var savePNG = function(){
    var canvas = document.getElementById("langcanvas");
    window.open(canvas.toDataURL("image/png"));
}

$(".save").click(savePNG);

//add filter

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this == null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
 
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }
 
    return res;
  };
}
