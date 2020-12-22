
var directions = new Map<string,Vector>()
directions.set('tl',new Vector(-1,-1))
directions.set('tm',new Vector(0,-1))
directions.set('tr',new Vector(1,-1))
directions.set('ml',new Vector(-1,0))
directions.set('mm',new Vector(0,0))
directions.set('mr',new Vector(1,0))
directions.set('bl',new Vector(-1,1))
directions.set('bm',new Vector(0,1))
directions.set('br',new Vector(1,1))


class RuleTile{

    constructor(
        public tileid:number,
        public cb:(neighbours:Map<string,number>) => boolean,
    ){

    }
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

    getNeighbours(pos:Vector):Map<string,number>{
        var res = new Map<string,number>()
        for(var [key,value] of directions){
            res.set(key,0)
        }

        for(var [alias,direction] of directions.entries()){
            var abspos = pos.c().add(direction)
            if(this.gridrect.collidePoint(abspos)){
                res.set(alias,index2D(this.grid,abspos))
            }
        }   
        return res
    }
}



