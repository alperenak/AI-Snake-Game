import React, { Component } from 'react';
import './App.css';
import { NeuralNetwork } from "./nn"
import { runInThisContext } from 'vm';

export default class App extends Component {
  constructor(props) {
    super(props)
this.state={
drawOrNot:false

}
    // this.timer = setInterval(this.loop.bind(this), 1000 / 20)
this.snakeCount=100

  }
  componentDidMount() {
    this.generations=0
  this.FPS=1000
    this.deadSnakes=[]
    this.canvas = document.getElementById('canvas');
   this.context = this.canvas.getContext('2d');
this.test=this.generateSnakes()
this.appleTest=this.generateApples()
this.population=prompt("populasyon sayısını giriniz")
this.applePopulation=1
    // this.snakes=[new RealSnake(context)]
    // this.apple=[new Apple(context)]
    const canvasRef = React.createRef()
this.testTimer=setInterval(this.loop.bind(this),1000/this.FPS)
  }

  generateSnakes(){
    const test=[]
// 500

    for (let i = 0; i < this.population; i+=1) {
      if(this.deadSnakes.length===this.population){
     
    }
      
      test.push(new AlertAK(this.context,  this.deadSnakes))

     }


return test

  }
  generateApples(){
    const applePopulation=10
    const apple=[]
    for (let i = 0; i < applePopulation; i+=1) {
     
      apple.push(new Apple(this.context,this.generations,this.deadSnakes))


     }
return apple

  }
  draw(){
    if(!this.state.drawOrNot){



    }



  }
  update(){
 
 if(this.generations>=45){
this.setState({

  drawOrNot:true
})



 }
  
    // console.log(this.deadSnakes)
  //  console.log(this.deadSnakes.length+ "POPULATION :"+this.population)
    document.addEventListener("keydown",(e)=>{
      if(e.keyCode===32){
           this.test.forEach((snake)=>snake.dead=true)
        
      }
      
if(e.keyCode===84){

this.population=100

}
if(e.keyCode===68){

  this.population=10
  
  }
  if(e.keyCode===66){

    this.population=1
    
    }
    if(e.keyCode===71){

      this.population=1000
      
      }

    })

    if(this.test.length===0){
   this.appleTest.forEach(genrations=>genrations.generations+=1)
    
     
      let totalAge = 0;
      this.deadSnakes.forEach((deadSnake) => { totalAge += deadSnake.age; });
  
      // toplam yasi kullanarak her snale icin saglamlilik degeri ata
      this.deadSnakes.forEach((deadSnake) => { deadSnake.fitness = deadSnake.age / totalAge; });
// this.population=prompt("populasyon sayısını giriniz")
     
      for (let i = 0; i < this.population; i+=1) {

        this.test.forEach(snake=>{
          snake.tailSize=5
          
        })
 
          this.brain=this.deadSnakes.length && this.pickOne().brain;
         
        
        this.test.push(new AlertAK(this.context,this.brain))
        
       }
      setTimeout(()=>{
        this.deadSnakes=[]
      },100)


    }
    this.deadSnakes.push(...this.test.filter(snake=>snake.dead))
   

    //is snake dead: delete dead sneak
    this.test=this.test.filter(snake=>!snake.dead)
      //is eat snake this apple

    this.test.forEach((snake)=>{
    //   snake.tail.forEach((t)=>{
    //     if(snake.x===t.x|| snake.y===t.y){
    //       snake.dead



    //     }


    //   })
  this.appleTest.forEach((apple)=>{
  if(apple.appleX===snake.x&&apple.appleY===snake.y){
    if(snake.wasEat>=170){
      this.test=  this.test.filter((snake)=>{
          return snake.wasEat>=170
        })
     
   }
console.log(snake.wasEat+"age:"+snake.age)
  snake.tailSize++
  snake.wasEat++
  snake.age+=snake.wasEat*30
    apple.appleX=Math.floor(Math.random()*30)+5
    apple.appleY=Math.floor(Math.random()*30)+5

  }


  })

    })
    //all the first time draw one big rect things
    this.context.fillStyle="black"
  this.context.fillRect(0,0,800,800)

  }
  pickOne = () => {
    let index = 0;

    let r = Math.random();
    while (r > 0) {
  
      r -= this.deadSnakes[index].fitness;
      index += 1;
    
    }
    index -= 1;


    return this.deadSnakes[index];

  }
loop(){
this.update()

this.draw()

this.test.forEach((t)=>{t.draw()})
  this.test.forEach(t=>{t.update()})
  this.appleTest.forEach(t=>{t.draw()})
}




  render() {
    return (
    
      <div className="App" style={{ width: "100%", height: "100%", backgroundColor: "white" }}>

        <canvas ref={this.canvasRef} id="canvas" width="800" height="800" style={{ backgroundColor: "black", border: "solid", borderColor: "white", margin: 150,marginBottom:0 }}></canvas>


  
<div ><p>GENERATİONS :{this.generations}</p></div>
      
      
      </div>
    );
  }

}
 
class AlertAK{
constructor(context,brain,deadSnakes){

this.fitness=0
this.age=0
this.wasEat=0
this.context=context
this.x=20
this.y=20
this.velocityX=0
this.velocityY=-1
this.tail=[]
this.tailSize=5
this.gridSize=20
this.arrayyy=[]
this.dead=null
if (brain) {
  this.brain = brain.copy();
  this.mutate();
} else {
  this.brain = new NeuralNetwork(6, 36, 4);
}

}

  draw=()=>{

this.tail.forEach(t=>{
this.context.fillStyle="red"

  this.context.fillRect(t.x*this.gridSize,t.y*this.gridSize,this.gridSize-5,this.gridSize-5)

})

  }


  turnOn=()=>{
      this.velocityY = -1
      this.velocityX = 0

    }
    turnDown=()=>{
      this.velocityY = 1
      this.velocityX = 0

    }
    turnLeft=()=>{
      this.velocityX = -1
      this.velocityY = 0
    }
    turnRight=()=>{

          this.velocityX = 1
          this.velocityY = 0

    }
    mutate(){
      this.brain.mutate((x)=>{
        if(Math.random()<0.016){
          let offset=Math.random()
          let total=offset+x
          return total
        }
       else{return x}
      })



    }
    think=()=>{
        /*Input=[
     this.tail.forEach((snake)=>{
      return this.x-snake.x


     }) 
     this.tail.forEach((snake)=>{
      return this.y-snake.y


     })
      ] */
        const HEIGHT=40;
        const apple=new Apple()
      
      const inputs=[
     (0-this.x)/HEIGHT,(0-this.y)/HEIGHT,
      (40-this.x)/HEIGHT,(40-this.y)/HEIGHT,
    // this.ownCloseX/HEIGHT,this.ownCloseY/HEIGHT,
      (apple.appleX-this.x)/HEIGHT,(apple.appleY-this.y)/HEIGHT
     
      ];
      //range 0,1
      const output=this.brain.predict(inputs)
      if (output[0]>0.50&& output[0]<=0.55&& this.velocityY !== 1) {
         this.turnOn()
      }
      //SOLA DÖNÜŞ
      else if (output[1]>0.55&&output[1]<=0.60 && this.velocityX !== 1) {
      this.turnLeft()
      }
      else if (output[2]>0.6&&output[2]<=0.65 && this.velocityX !== -1) {
      this.turnRight()
      }
      //AŞAĞI DÖNÜŞ
      else if (output[3]>0.7 && this.velocityY !== -1) {
      this.turnDown()
      }


      }
  update=()=>{
    // console.log(this.brain)
    this.age+=1
    
    
this.think()
this.x+=this.velocityX
this.y+=this.velocityY
// // this.tail.forEach((t)=>{
// //   if(this.x===t.x,this.y===t.y){
// //     this.dead=true


// }

// })

  if(this.x>43||this.x<-3){


    this.fitness=0
    this.tailSize=5
    this.dead=true
  }
else if(this.y>43||this.y<-3){
  this.tailSize=5
  this.dead=true
  this.fitness=0





}
    this.tail.push({x:this.x,y:this.y})

if(this.tail.length>this.tailSize){

  this.tail.shift()

  }

 // Yılan kendi üstüne bastı mı?
 
    } 
   
}

class Apple{
constructor(context,generation){
  this.generations=generation
this.context=context
this.gridSize=20
this.appleX=Math.floor(Math.random()*30)+5
this.appleY=Math.floor(Math.random()*30)+5


}

draw(){
  this.context.fillStyle="white"
     this.context.font = "30px Arial";
     this.context.fillText("Generations: ", 10, 50);
     this.context.fillText(this.generations-1, 185, 50);
  this.context.fillStyle = "blue"
  this.context.fillRect(this.appleX * this.gridSize, this.appleY * this.gridSize, this.gridSize - 5, this.gridSize - 5)
}

}








