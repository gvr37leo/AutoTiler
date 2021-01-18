class List2D2<T>{

    list:NegativeList<T>
    bounding:Rect

    constructor(){
        this.list = new NegativeList()
        this.bounding = new Rect(new Vector(-5,-5),new Vector(5,5))
        var size = this.bounding.size()
        this.list.resize(size.x * size.y)
    }

    getBounding(){

    }

    get(index:Vector):T{
        if(this.isInBounds(index)){
            this.list.get(this.rel2abs(index))
        }else{
            return null
        }
    }

    set(index:Vector,val:T){
        if(this.isInBounds(index) == false){
            this.resize(null)
        }
        this.list.set(val,this.rel2abs(index))
        //goes wrong when list resizes and indexes go to the wrong place
        //if the bounding box needs to change then a resize needs to happen to move all the values to their new correct spot
    }

    isInBounds(index:Vector):boolean{
        return this.bounding.collidePoint(index)
    }

    resize(box:Rect){
        var size = box.size()

        var newarr = new NegativeList<T>()
        newarr.resize(size.x * size.y)

        this.bounding.loop(v => {
            newarr.set(this.get(v),this.rel2abs(v))
        })
        this.bounding = box
        this.list = newarr
        //copy old list to new list
    }

    rel2abs(index:Vector){
        return  index.y * this.bounding.size().x + index.x
    }
}

class NegativeList<T>{

    arr:T[] = new Array(10)
    negsize = 0
    possize = 0
    oldnegsize: number
    oldpossize: number

    get(index:number):T{
        if(this.isInBounds(index)){
            return this.arr[this.IndexRel2abs(index)]
        }else{
            throw "out of bounds"
        }
        
    }

    set(val:T, index:number){
        
        this.oldnegsize = this.negsize
        this.oldpossize = this.possize
        if(index < 0){
            this.negsize = Math.max(Math.abs(index),this.negsize)
        }else{
            this.possize = Math.max(index,this.possize)
        }
        this.checkResize()
        var absindex  = this.IndexRel2abs(index)
        this.arr[absindex] = val
    }

    length(){
        return this.negsize + this.possize
    }

    isInBounds(relindex){
        return inRange(-this.negsize,this.possize - 1,relindex)
    }

    checkResize(){
        if((this.negsize + this.possize) > this.arr.length){
            this.resize((this.negsize + this.possize) * 2)
        }
    }

    resize(newsize){
        var newarray = new Array(newsize)
        //copy all positive values to the beginning
        arrcopy(this.arr,0,newarray,0,this.oldpossize)
        //copy all negative values to the end
        arrcopy(this.arr,this.arr.length - this.oldnegsize,newarray,newarray.length - this.oldnegsize,this.oldnegsize)
        this.arr = newarray
    }

    IndexRel2abs(index:number){
        return mod(index,this.arr.length)
    }
}

class GrowList{

}