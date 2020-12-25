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



var colors = ['white','red','blue','purple','pink','orange','yellow','green','cyan','brown']
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var tilesize = new Vector(30,30)
var autotiler = new AutoTiler()
autotiler.tiles = [
    normalRule(1,new Map([[Directions.ml,1],[Directions.tm,1],[Directions.mr,1],[Directions.bm,1]])),
    ...rotated([2,3,4,5],new Map([[Directions.ml,0],[Directions.tm,0],[Directions.mr,1],[Directions.bm,1]])),//tl
    ...rotated([6,7,8,9],new Map([[Directions.ml,1],[Directions.tm,0],[Directions.mr,1],[Directions.bm,1]])),//tm
]

var input = [
    [0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,1],
]

// var input = [
//     [1,1,1],
//     [1,1,1],
//     [1,1,1],
// ]

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


loop((dt) => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)

    renderGrid(output)
})


function renderGrid(grid:number[][]){
    var size = get2DArraySize(grid)
    size.loop2d((v) => {
        var gridval = read2D(grid,v)
        ctxt.fillStyle = colors[gridval]
        var pos = v.c().mul(tilesize)
        ctxt.fillRect(pos.x,pos.y,tilesize.x,tilesize.y)
    })
}
