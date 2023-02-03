const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 512
const c = canvas.getContext('2d')

const image = new Image()
image.src = "./platform.png"
// const background = new Image()
// background.src = "./background.png"
// const hill = new Image()
// hill.src = "./hills.png"
let gravity=9.8
class Platform{
    constructor({x , y, image}){
        this.image = image
        this.width = image.width;
        this.height = image.height;
        this.position = {
            x: x,
            y: y
        }
    }
    draw(){
        c.drawImage(image,this.position.x,this.position.y)
    }
}
let platforms 
let scrolledScreen = 0
class Player{
    constructor(){
        this.velocity = {
            x: 0,
            y: 0
        }
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30;
        this.height = 30;
        this.speed = 20;
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        let k1=0,k2=0;
        platforms.forEach(platform=>{
            if((this.position.y>=platform.position.y-this.height-2.35 && this.position.y<=canvas.height-player.height-100) && (this.position.x+this.width>=platform.position.x &&
                this.position.x+this.width<=platform.position.x+platform.width+20)){
                    k1=1;
                    k2=1;
                }
                if(this.position.y>platform.position.y && this.position.x==platform.position.x){
                    k1=0;k2=1;
                }    
        })
        if(k1 && k2){
            this.position.y+=0
        }
        else if(!k1 && k2){
            this.position.x-=10;
            this.position.y+=gravity
        }
        else this.position.y+= 2*gravity
        this.draw()
    }
}
let backPos = {
    x: 0,
    y: 0
}
let hillsPos = {
    x: 0,
    y : 0
}

class others{
    constructor(img){
        this.pos = {...backPos}
        this.img = new Image()
        this.img.src = img
    }
    draw(){
        c.drawImage(this.img,this.pos.x,this.pos.y)
    }
}
background = new others('background.png')
hill = new others('hills.png')
let player = new Player()
function reset(){
    c.clearRect(0,0,canvas.width,canvas.height)
    background = new others('background.png')
    background.pos.x=0;
    hill = new others('hills.png')
    hill.pos.x=0;
    player = new Player()
    platforms = [new Platform({x: image.width*3+700, y: canvas.height-2*image.height-20, image}),new Platform({x: 1.75, y: canvas.height-image.height+10, image}), new Platform({x:image.width+200, y: canvas.height-image.height+10, image}),
                new Platform({x: image.width*2+400, y:canvas.height-image.height+10, image}),new Platform({x: image.width*4+800, y:canvas.height-image.height+10, image})
                ,new Platform({x: image.width*4+1000, y:canvas.height-image.height+10, image})]
    scrolledScreen=0;    
}
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.draw()
    hill.draw()
    platforms.forEach(platform=>{
        platform.draw()
    })
    player.update()
    if(scrolledScreen>1000){
        console.log('you won', scrolledScreen)
    }
    if(player.position.y>canvas.height){
        reset();
        console.log('you lost');
    }
}
console.log(canvas.height, canvas.width)
window.addEventListener("keydown", (event)=>{
    console.log(event.keycode)
        switch(event.keyCode){
            case 65:
                if(scrolledScreen>0){
                    platforms.forEach(platform=>{
                        if(player.position.x>platform.width){
                            platform.position.x +=player.speed;
                            hill.pos.x += player.speed*0.67
                            background.pos.x += player.speed*0.67
                        }
                        else {
                            platform.position.x += player.speed;
                            hill.pos.x += player.speed*0.67
                            background.pos.x += player.speed*0.67
                            scrolledScreen -=player.speed    
                        }
                    })
                } 
            console.log('left')       //a
            break;
            case 83:
                console.log('down')   //s
                if(player.position.y+gravity<canvas.height-player.height-100)
                player.position.y +=gravity
                break;
            case 68:
                console.log('right')  //d
                platforms.forEach((platform)=>{
                if(player.position.x<platform.position.x+platform.width+10 && platform.position.x+platform.width<background.width){
                    player.position.x +=0;
                    platform.position.x -=player.speed;
                    hill.pos.x -= player.speed*0.67
                    background.pos.x -= player.speed*0.67
                    scrolledScreen+=player.speed
                }
                else{
                    if(scrolledScreen>14040){
                        // player.position.x+=player.speed/4
                        platform.position.x-=player.speed
                        scrolledScreen+=player.speed
                        if(scrolledScreen>17000){
                            console.log('real one')
                            c.font = '30px Calibri'
                            c.fillText('You Won',502,250 )
                        }
                    }
                    else{
                        platform.position.x-=player.speed;
                        hill.pos.x -= player.speed*0.67
                        background.pos.x -= player.speed*0.67
                        scrolledScreen +=player.speed 
                    }
                }
                })
                break;
            case 87:
                console.log('up')    //w
                if(player.position.y>canvas.height/10)
                {
                    player.position.y -=player.speed*1.5;
                    player.position.x+=gravity;
                    platforms.forEach(platform=>platform.position.x -=player.speed*0.67)
                    hill.pos.x -= player.speed*0.67
                    background.pos.x -= player.speed*0.67
                }
                break;
        }
})
reset()
animate()