import React,{Component} from 'react';
import './App.css';
export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
         snakeX:5,
        snakeY:5,
        SnakeSize:15 
    }
    const canvasRef=React.createRef()
 
  }
  componentDidMount(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const game=new SnakeGame(context);
    game.init();

  }
render(){
  return (
    <div className="App" style={{width:"100%",height:"100%",backgroundColor:"black"}}>
  
      <canvas ref={this.canvasRef} id="canvas" width="400" height="400" style={{backgroundColor:"white",border:"solid",borderColor:"white",margin:150}}></canvas>
     
        <p>merhba dünya</p>
    </div>
  );
}

}



class SnakeGame {
  constructor(context) {

    this.context=context
    // Basılan tuşları algılıyoruz:
    document.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  init() {
    
    // Yeni oyun için ilk değer atamaları:
    this.positionX = this.positionY = 10;
    this.appleX = this.appleY = 5;
    this.tailSize = 5;
    this.trail = [];
    this.gridSize = this.tileCount = 20;
    this.velocityX = this.velocityY = 0;

    // Oyun döngümüz çalışmaya başlıyor.
    // Her saniyede 15 kez çalışacak, yani 15 FPS olacak.
    // Üç boyutlu çok daha büyük oyunlar genelde 60 FPS üzerinde çalışıyor.
    this.timer = setInterval(this.loop.bind(this), 1000 / 15);
  }

  reset() {
    // Oyun göngüsünü durdur:
    clearInterval(this.timer);
    
    // Oyun ile alakalı detayları en baştaki haline geri döndür:
    this.init();
  }

  // Oyun döngümüz
  loop() {
    // Matematiksel hesaplamaları yap:
    this.update();
    
    // Sonrasında ekrana çizimi gerçekleştir
    this.draw();
  }

  update() {
    // Yılanın başını X ve Y koordinat düzleminde gittiği yöne hareket ettir
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    // Yılan sağ, sol, üst ya da alt kenarlara değdi mi?
    // Değdiyse ekranın diğer tarafından devam ettir
    if (this.positionX < 0) {
      this.reset();
      } else if (this.positionY < 0) {
      this.reset();
   } else if (this.positionX > this.tileCount - 1) {
    this.reset();
  
    } else if (this.positionY > this.tileCount - 1) {
      this.reset();
    
    }

    // Yılan kendi üstüne bastı mı?
    this.trail.forEach(t => {
      if (this.positionX === t.positionX && this.positionY === t.positionY) {
        // Bastıysa game over olduk, oyunu resetle:
        this.reset();
      }
    });

    // Yılanın başını yılanın herbir karesini hafızada tuttuğumuz diziye koy
    this.trail.push({positionX: this.positionX, positionY: this.positionY});

    // Yılanın başını hareket ettirdik, şimdi kuyruktan kırpmamız gerekiyor
    while (this.trail.length > this.tailSize) {
      this.trail.shift();
    }

    // Yılan elma yedi mi?
    if (this.appleX === this.positionX && this.appleY === this.positionY) {
      // Yediyse yılanın boyutu uzat:
      this.tailSize++;
      
      // Ekrana yeni bir elma koymak lazım.
      // Rasgele X ve Y koordinatı üretip oraya elmayı atalım:
      this.appleX = Math.floor(Math.random() * this.tileCount);
      this.appleY = Math.floor(Math.random() * this.tileCount);
    }
  }

  // Ekrana çizim gerçekleştiriyor:
  draw() {
    // İlk olarak siyah arkaplanı çiziyoruz
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 400, 400);

    // Skoru ekranın sol üst köşesine yazdıralım
    this.context.fillStyle = 'white';
    this.context.font = '20px Arial';

    // Yılanın herbir karesini sırayla ekrana çiziyoruz
    this.context.fillStyle = 'yellow';
    this.trail.forEach(t => {
      this.context.fillRect(t.positionX * this.gridSize, t.positionY * this.gridSize, this.gridSize - 5, this.gridSize - 5);
    });

    // Son olarak elmayı ekrana çizdirelim:
    this.context.fillStyle = 'pink';
    this.context.fillRect(this.appleX * this.gridSize, this.appleY * this.gridSize, this.gridSize - 5, this.gridSize - 5);
  }

  // Kullanıcı websayfasındayken bir tuşa bastığında çağrılıyor:
  onKeyPress(e) {
    // Kullanıcı sol oka bastı, yılan sağa gitmiyorsa yılanı sola döndür
    if (e.keyCode === 37 && this.velocityX !== 1) {
      this.velocityX = -1;
      this.velocityY = 0;
    }
    
    // Kullanıcı yukarı oka bastı, yılan aşağı gitmiyorsa yılanı yukarı döndür
    else if (e.keyCode === 38 && this.velocityY !== 1) {
      this.velocityX = 0;
      this.velocityY = -1;
    }
    
    // Kullanıcı sağ oka bastı, yılan sola gitmiyorsa yılanı sağa döndür
    else if (e.keyCode === 39 && this.velocityX !== -1) {
      this.velocityX = 1;
      this.velocityY = 0;
    }
    
    // Kullanıcı aşağı oka bastı, yılan yukarı gitmiyorsa yılanı aşağı döndür
    if (e.keyCode === 40 && this.velocityY !== -1) {
      this.velocityX = 0
      this.velocityY = 1;
    }
  }
}