window.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector("#Hexagon");
    if (!canvas){return;}
    let parent = $(canvas).parent();
    function requestRender(){
        let ani = new HexagonAnimation(canvas,parent,isPhoneByWidth());
        let reqId = null;
        function render(){
            if (reqId){
                // window.cancelAnimationFrame(reqId);
                clearTimeout(reqId);
            }
            ani.beginAnimation();
            // reqId = window.requestAnimationFrame(render);
            reqId = setTimeout(() => {
                render();
            }, 50);
        }
        render();
    }
    // requestRender();
});

class HexagonAnimation{
    constructor(canvas,parent,isPhone){
        if (!canvas||!canvas.getContext){
            return;
        }
        this.canvas = canvas;
        this.canvas.height = parent.height();
        this.hexagonList = [];
        this.ctx = canvas.getContext('2d');
        this.originY = 0;
        this.innerRadius = 0;
        this.spacing = 0;
        if (isPhone){
            this.canvas.width = 740;
            this.originY = 90;
            this.innerRadius = 50;
            this.spacing = 20;
        }else{
            this.canvas.width = 1480;
            this.originY = 190;
            this.innerRadius = 88;
            this.spacing = 44;
        }
        this.originX = this.canvas.width/2;
        this.hexNumber = 16;
        for (let j=0;j<this.hexNumber;j++){
            let r = this.innerRadius + (this.spacing*j/Math.sin(this.getRadian(60)));
            // // requestAnimationFrame
            // let hex = new Hexagon(r,this.originX,this.originY,this.ctx,j*12);
            // setTimeout
            let hex = new Hexagon(r,this.originX,this.originY,this.ctx,j*4);
            this.hexagonList.push(hex);
        }
        this.renderTimes = -1;
        this.ctx.setLineDash([2,2]);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
        this.ready = true;
    }
    resetAnimation(){
        this.renderTimes = -1;
    }
    getRadian(degree) {
        return degree * Math.PI / 180;
    }
    beginAnimation(){
        if (!this.ready){return;}
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderTimes++;
        for(let i=0;i<this.hexagonList.length;i++){
            let hex = this.hexagonList[i];
            if(this.renderTimes == hex.delayTimes){
                hex.begin();
            }
            hex.render();
            if ((i == this.hexagonList.length-1)&&hex.isFinishedOne()){
                hex.resetFinished();
                this.resetAnimation();
            }
        }
    }
}
class Hexagon{
    constructor(r,x,y,ctx,delayTimes){
        this.r = r;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.pointIdnex = 1;
        this.offset = 0;
        // // requestAnimationFrame 16.7ms
        // // 1.047/(2800/16.7)
        // this.speed = 0.00626;
         // setTimeout 50ms
        // 1.047/3000*50
        this.speed = 0.01745;
        this.beignRotate = false;
        this.originRad = 1.047; // 60° 
        this.endRad = 1.047;
        this.delayTimes = delayTimes;
        this.finishOneCircle = false;
    }
    begin(){
        this.beignRotate = true;
    }
    isFinishedOne(){
        return this.finishOneCircle;
    }
    resetFinished(){
        this.finishOneCircle = false;
    }
    reset(){
        //this.endRad = 1.047*n(n=1,2,3,4,5,6)
        this.beignRotate = false;
        this.offset = this.endRad;
        this.pointIdnex++;
        this.finishOneCircle = true;
        if (this.pointIdnex == 6){ // finishe one circle
            this.endRad = this.originRad;
            this.pointIdnex = 1;
            this.offset = 0;
        }else{
            this.endRad = this.originRad * this.pointIdnex;
        }
    }
    render(){
        this.ctx.beginPath();
        if (this.beignRotate){
            this.offset += this.speed;
            if (this.offset >= this.endRad){
                this.reset();
            }
        }
        for (let i = 0; i < 6; i++) {
            let rad = (360/6*i+90)*Math.PI/180 + this.offset;
            this.ctx.lineTo(this.x + this.r * Math.cos(rad), this.y + this.r * Math.sin(rad));
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
