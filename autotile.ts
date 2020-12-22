enum Directions {tl,tm,tr,ml,mm,mr,bl,bm,br}
var rotdir90 = new Map<Directions,Directions>()
rotdir90.set(Directions.tl,Directions.tr)
rotdir90.set(Directions.tm,Directions.mr)
rotdir90.set(Directions.tr,Directions.br)
rotdir90.set(Directions.ml,Directions.tm)
rotdir90.set(Directions.mm,Directions.mm)
rotdir90.set(Directions.mr,Directions.bm)
rotdir90.set(Directions.bl,Directions.tl)
rotdir90.set(Directions.bm,Directions.ml)
rotdir90.set(Directions.br,Directions.bl)

var directions = new Map<Directions,Vector>()
directions.set(Directions.tl,new Vector(-1,-1))
directions.set(Directions.tm,new Vector(0,-1))
directions.set(Directions.tr,new Vector(1,-1))
directions.set(Directions.ml,new Vector(-1,0))
directions.set(Directions.mm,new Vector(0,0))
directions.set(Directions.mr,new Vector(1,0))
directions.set(Directions.bl,new Vector(-1,1))
directions.set(Directions.bm,new Vector(0,1))
directions.set(Directions.br,new Vector(1,1))


class RuleTile{

    constructor(
        public tileid:number,
        public cb:(neighbours:Map<string,number>) => boolean,
    ){

    }
}

function rotated(tileids:number[],{}){

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



