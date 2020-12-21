
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


class TileRule{

    cb:(neighbours:Vector[]) => boolean
}

class AutoTiler{

    grid:number[][] = []
    rules:TileRule[] = []

    constructor(){

    }



    tile(grid:number[][]):number[][]{

        var size = get2DArraySize(grid)
        var res = create2DArray(size,() => 0)
        size.loop2d(v => {
            var neighbours = this.getNeighbours(v)
            var passedRules = this.rules.every(r => r.cb(neighbours))
            
        })

    }

    getNeighbours(pos:Vector):Vector[]{
        var res = []
        for(var [alias,direction] of directions.entries()){
            var abspos = pos.c().add(direction)
            if(true){
                res.push(abspos)
            }
        }   
        return res
    }

}

