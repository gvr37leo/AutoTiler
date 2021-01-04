class List<T>{

    arr:T[] = new Array(10)
    negsize = 0
    possize = 0

    _2DboundingBox = new Rect(new Vector(0,0),new Vector(0,0))



    get(index:number):T{
        if(this.isInBounds(index)){
            return this.arr[this.IndexRel2abs(index)]
        }else{
            throw "out of bounds"
        }
        
    }

    get2d(index:Vector):T{
        if(this._2DboundingBox.collidePoint(index)){

        }else{
            //throw
        }
        var index2 = this._2Dtoo1D(index)
        return this.get(index2)
    }

    set(val:T, index:number){
        
        var oldnegsize = this.negsize
        var oldpossize = this.possize
        if(index < 0){
            this.negsize = Math.max(Math.abs(index),this.negsize)
        }else{
            this.possize = Math.max(index,this.possize)
        }
        this.checkResize(oldnegsize,oldpossize)
        var absindex  = this.IndexRel2abs(index)
        this.arr[absindex] = val
    }

    start(){
        return -this.negsize
    }

    set2d(index:Vector,val:T){
        if(this._2DboundingBox.collidePoint(index)){
            var index2 = this._2Dtoo1D(index)
            return this.set(val,index2)
        }else{
            //throw
        }
        
    }

    length(){
        return this.negsize + this.possize
    }

    isInBounds(relindex){
        return inRange(-this.negsize,this.possize - 1,relindex)
    }

    checkResize(oldnegsize,oldpossize){
        if((this.negsize + this.possize) > this.arr.length){
            var newarray = new Array((this.negsize + this.possize) * 2)
            //copy all positive values to the beginning
            arrcopy(this.arr,0,newarray,0,oldpossize)
            //copy all negative values to the end
            arrcopy(this.arr,this.arr.length - oldnegsize,newarray,newarray.length - oldnegsize,oldnegsize)
        }
    }

    IndexRel2abs(index:number){
        return mod(index,this.arr.length)
    }

    _2Dtoo1D(v:Vector){
        return v.y * this._2DboundingBox.size().x + v.x
    }
}

function arrcopy<T>(src:T[],srcstart:number,dst:T[],dststart:number,length:number){
    for(var i = 0; i < length;i++){
        dst[dststart + i] = src[srcstart + i]
    }
}