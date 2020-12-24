enum Directions {tl,tm,tr,ml,mm,mr,bl,bm,br}

var dir2vecmap = new Map<Directions,Vector>()
dir2vecmap.set(Directions.tl,new Vector(-1,-1))
dir2vecmap.set(Directions.tm,new Vector(0,-1))
dir2vecmap.set(Directions.tr,new Vector(1,-1))
dir2vecmap.set(Directions.ml,new Vector(-1,0))
dir2vecmap.set(Directions.mm,new Vector(0,0))
dir2vecmap.set(Directions.mr,new Vector(1,0))
dir2vecmap.set(Directions.bl,new Vector(-1,1))
dir2vecmap.set(Directions.bm,new Vector(0,1))
dir2vecmap.set(Directions.br,new Vector(1,1))

var vec2dirmap:Directions[][] = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

for(var [dir,vec] of dir2vecmap){
    vec2dirmap[vec.y][vec.x] = dir
}

function rotate90(v:Vector){
    return new Vector(-v.y,v.x)
}

function rotate180(v:Vector){
    return new Vector(-v.x,-v.y)
}

function rotate270(v:Vector){
    return new Vector(v.y,-v.x)
}

function rotateDirection90(d:Directions){
    var v = dir2vecmap.get(d)
    var rotted = rotate90(v)
    return vec2dirmap[rotted.y][rotted.x]
}

class RuleTile{

    constructor(
        public tileid:number,
        public cb:(neighbours:Map<Directions,number>) => boolean,
    ){

    }
}


function rotated(tileids:number[],setofpositionwithids:Map<Directions,number>):RuleTile[]{
    var res:RuleTile[] = []
    let current = setofpositionwithids
    for(let i = 0; i < tileids.length; i++){
        new RuleTile(tileids[i],(neighbours) => {
            return checkdirections(current,neighbours)
        })
        current = rotateDirectionMap(current)
    }
    return res
}

function mirrorX(tileid:number,setofpositionwithids:Map<Directions,number>):RuleTile[]{
    var map = mirrorXDirectionMap(setofpositionwithids)
    var original = new RuleTile(tileid,(neighbours) => {
        return checkdirections(setofpositionwithids,neighbours)
    })
    var res = new RuleTile(tileid,(neighbours) => {
        return checkdirections(map,neighbours)
    })
    return [original,res]
}

function mirrorY(tileid:number,setofpositionwithids:Map<Directions,number>):RuleTile[]{
    var map = mirrorYDirectionMap(setofpositionwithids)
    var original = new RuleTile(tileid,(neighbours) => {
        return checkdirections(setofpositionwithids,neighbours)
    })
    var res = new RuleTile(tileid,(neighbours) => {
        return checkdirections(map,neighbours)
    })
    return [original,res]
}


class AutoTiler{

    grid:number[][] = []
    tiles:RuleTile[] = []
    gridrect: Rect

    constructor(){

    }



    tile(grid:number[][]):number[][]{
        
        var size = get2DArraySize(grid)
        this.gridrect = new Rect(new Vector(0,0), size)
        var res = create2DArray(size,() => 0)
        size.loop2d(v => {
            var neighbours = this.getNeighbours(v)
            var firsttile = this.tiles.find(r => r.cb(neighbours))
            res[v.x][v.y] = firsttile.tileid
        })
        return res
    }

    getNeighbours(pos:Vector):Map<Directions,number>{
        var res = new Map<Directions,number>()
        for(var [key,value] of dir2vecmap){
            res.set(key,0)
        }

        for(var [alias,direction] of dir2vecmap.entries()){
            var abspos = pos.c().add(direction)
            if(this.gridrect.collidePoint(abspos)){
                res.set(alias,index2D(this.grid,abspos))
            }
        }   
        return res
    }
}

function mirrorXDirectionMap(setofpositionwithids:Map<Directions,number>){
    var newmap = new Map<Directions,number>()
    for(var [dir,id] of setofpositionwithids){
        var vdir = dir2vecmap.get(dir).c()
        vdir.x = -vdir.x
        var mirrordir = vec2dirmap[vdir.y][vdir.x]
        newmap.set(mirrordir,id)
    }
    return newmap
}

function mirrorYDirectionMap(setofpositionwithids:Map<Directions,number>){
    var newmap = new Map<Directions,number>()
    for(var [dir,id] of setofpositionwithids){
        var vdir = dir2vecmap.get(dir).c()
        vdir.y = -vdir.y
        var mirrordir = vec2dirmap[vdir.y][vdir.x]
        newmap.set(mirrordir,id)
    }
    return newmap
}

function rotateDirectionMap(setofpositionwithids:Map<Directions,number>){
    var newmap = new Map<Directions,number>()
    for(var [dir,id] of setofpositionwithids){
        newmap.set(rotateDirection90(dir),id)
    }
    return newmap
}

function checkdirections(checks:Map<Directions,number>,neighbours:Map<Directions,number>){
    return Array.from(checks.entries()).every(([key,value]) =>  neighbours.get(key) == value)
}



