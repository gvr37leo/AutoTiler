/// <reference path="libs/vector/vector.ts" />
/// <reference path="libs/utils/rng.ts" />
/// <reference path="libs/utils/store.ts" />
/// <reference path="libs/utils/table.ts" />
/// <reference path="libs/utils/utils.ts" />
/// <reference path="libs/utils/stopwatch.ts" />
/// <reference path="libs/utils/ability.ts" />
/// <reference path="libs/utils/anim.ts" />
/// <reference path="libs/rect/rect.ts" />
/// <reference path="libs/event/eventqueue.ts" />
/// <reference path="libs/event/eventsystem.ts" />
/// <reference path="autotile.ts" />
/// <reference path="projectutils.ts" />
/// <reference path="list.ts" />



var colors = ['white','red','blue','purple','pink','orange','yellow','green','cyan','brown','coral','crimson','deeppink','violet','black','lawngreen','lightgreen']
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var tilesize = new Vector(30,30)
var autotiler = new AutoTiler()
autotiler.tiles = [
    normalRule(10, new Map([[Directions.ml,0],[Directions.tm,0],[Directions.mr,0],[Directions.bm,0],[Directions.mm,1]])),//alone
    normalRule(1,new Map([[Directions.ml,1],[Directions.tm,1],[Directions.mr,1],[Directions.bm,1],[Directions.mm,1]])),//surrounded by cardinal directions/ center piece
    ...rotated([2,3,4,5],new Map([[Directions.ml,0],[Directions.tm,0],[Directions.mr,1],[Directions.bm,1],[Directions.mm,1]])),//tl corner piece
    ...rotated([6,7,8,9],new Map([[Directions.ml,1],[Directions.tm,0],[Directions.mr,1],[Directions.bm,1],[Directions.mm,1]])),//tm 3 neighbours wall piece

    ...rotated([10,11,12,13],new Map([[Directions.ml,0],[Directions.tm,0],[Directions.mr,1],[Directions.bm,0],[Directions.mm,1]])),//ml 1 neighbour
    normalRule(15,new Map([[Directions.ml,0],[Directions.tm,1],[Directions.mr,0],[Directions.bm,1],[Directions.mm,1]])),// 2 neighbours opposite vertical
    normalRule(16,new Map([[Directions.ml,1],[Directions.tm,0],[Directions.mr,1],[Directions.bm,0],[Directions.mm,1]])),// 2 neighbours opposite horizontal

    normalRule(14, new Map([[Directions.mm,1]])),//default catch rule (something went wrong if you see this one)
]

var input2 = new List<number>()
input2.set2d()
input2.get2d()

var input = [
    [0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,1],
]


var output = [
    [0,0,0,0,0,0,0],
    [0,0,2,3,4,0,0],
    [0,0,9,1,5,0,0],
    [0,0,9,1,5,0,0],
    [0,0,8,7,6,0,2],
]

output = autotiler.process(input)
//take a list of tiles in order each tile has a rule that looks at its surroundings
//the first tile that passes it's rule gets placed at that spot else leave unchanged/zero

var mousepos = startMouseListen(canvas)

document.addEventListener('mousedown', e => {
    var pos = getGridMousePos()
    input[pos.y][pos.x] = 1 - input[pos.y][pos.x]
    output = autotiler.process(input)
})


loop((dt) => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)
    
    renderGrid(output)

    ctxt.fillStyle = 'grey'
    drawgridcell(getGridMousePos())
    
})

function getGridMousePos(){
    return abs2grid(mousepos)
}

function drawgridcell(gridpos:Vector){
    var pos = gridpos.c().mul(tilesize)
    ctxt.fillRect(pos.x,pos.y,tilesize.x,tilesize.y)
}

function abs2grid(abs:Vector){
    return abs.c().div(tilesize).floor()
}

function renderGrid(grid:number[][]){
    var size = get2DArraySize(grid)
    size.loop2d((v) => {
        var tileid = read2D(grid,v)
        ctxt.fillStyle = colors[tileid]
        drawgridcell(v)
    })
}
