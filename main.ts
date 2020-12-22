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



var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var tilesize = new Vector(30,30)
var autotiler = new AutoTiler()
autotiler.tiles = [
    //tl
    new RuleTile(1,(neighbours) => {
        return checkdirections({ml:0,tm:0,mr:1,bm:1},neighbours)
    }),
    //tm
    new RuleTile(2,(neighbours) => {
        return checkdirections({ml:1,tm:0,mr:1,bm:1},neighbours)
    }),
    //tr
    new RuleTile(3,(neighbours) => {
        return checkdirections({ml:1,tm:0,mr:0,bm:1},neighbours)
    }),
    //ml
    new RuleTile(4,(neighbours) => {
        return checkdirections({ml:0,tm:1,mr:1,bm:1},neighbours)
    }),
    //mm
    new RuleTile(5,(neighbours) => {
        return checkdirections({ml:1,tm:1,mr:1,bm:1},neighbours)
    }),
    //mr
    new RuleTile(6,(neighbours) => {
        return checkdirections({ml:1,tm:1,mr:0,bm:1},neighbours)
    }),
    //bl
    new RuleTile(7,(neighbours) => {
        return checkdirections({ml:0,tm:1,mr:1,bm:0},neighbours)
    }),
    //bm
    new RuleTile(8,(neighbours) => {
        return checkdirections({ml:1,tm:1,mr:1,bm:0},neighbours)
    }),
    //br
    new RuleTile(9,(neighbours) => {
        return checkdirections({ml:1,tm:1,mr:0,bm:0},neighbours)
    }),
]

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

//take a list of tiles in order each tile has a rule that looks at its surroundings
//the first tile that passes it's rule gets placed at that spot else leave unchanged/zero


loop((dt) => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)

    renderGrid(output)
})


function renderGrid(grid:number[][]){
    var size = get2DArraySize(grid)
    size.loop2d((v) => {
        var gridval = grid[v.y][v.x]
        if(gridval > 0){
            ctxt.fillStyle = 'red'
        }else{
            ctxt.fillStyle = 'white'
        }
        var pos = v.c().mul(tilesize)
        ctxt.fillRect(pos.x,pos.y,tilesize.x,tilesize.y)
    })
}

function checkdirectionsRotated(checks:any,neighbours:Map<string,number>){

}

function createRuleTiles(){
    
}

function checkdirectionsMirrored(checks:any,neighbours:Map<string,number>,x,y){
    return Object.entries(checks).every(([key,value]) =>  neighbours.get(key) == value)
}

function checkdirections(checks:any,neighbours:Map<string,number>){
    return Object.entries(checks).every(([key,value]) =>  neighbours.get(key) == value)
}

function checkneighbour(dir:string,value:number,neighbours:Map<string,number>){
    if(neighbours.get(dir) == value){
        return true
    }else{
        return false
    }
}