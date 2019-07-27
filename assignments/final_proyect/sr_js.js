let w = window.innerWidth;
let h = window.innerHeight;
let d;
// VARIOUS FUNCTIONS -----------------------------------------------------------
var documentTitle = document.title + ` `;

(function titleMarquee() {
    document.title = documentTitle = documentTitle.substring(1) + documentTitle.substring(0,1);
    setTimeout(titleMarquee, 200);
})();

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

// FUNTIONS TO CHANCE ORIGIN OF COORDINATES AND POSITION IT IN THE MIDDLE ------

function cX(x){
  return x + w/2;
}

function cY(y){
  return -y + h/2;
}
// DRAWING IN CANVAS -----------------------------------------------------------

let canvas = document.querySelector(`canvas`);
canvas.width= w;
canvas.height= h*0.85;

let c = canvas.getContext(`2d`);

function Line(x, y, type){
  this.x = x;
  this.y = y;
  this.original_x = x;
  this.original_y = y;
  this.type = type;
  this.pass1 = false;
  this.color = random_rgba();


  this.draw = function(){
    c.beginPath();
    c.moveTo(w/2,h/2);
    c.lineTo(cX(this.x),cY(this.y));
    c.strokeStyle = this.color;
    c.lineWidth = 4;
    c.stroke();
  }

  this.update = function(){

    // These are if funtions to correct the length
    if (this.x > 0 && this.pass1 == true){
      this.x = this.original_x;
      this.y = this.original_y;
      this.pass1 = false;
    }

    if ( this.x < 0 ){
      this.pass1 = true;
    }

    if (this.x < 0 && this.pass2 == true){
      this.x = this.original_x;
      this.y = -this.original_y;
      this.pass2 = false;
    }

    if ( this.x > 0 ){
      this.pass2 = true;
    }


    d = new Date();
    switch (this.type){
      case 1:
      speed = d.getSeconds();
        break;

      case 2:
      speed = d.getMinutes();
        break;

      case 3:
      speed = d.getHours();
    }

    this.x = (this.x)*Math.cos(-speed/5000) - (this.y)*Math.sin(-speed/5000);
    this.y = (this.x)*Math.sin(-speed/5000) + (this.y)*Math.cos(-speed/5000);
    this.draw();
  }
}

let lines = [];
lines[0] = new Line(0, h/4, 1);
lines[1] = new Line(0, h/5, 2);
lines[2] = new Line(0, h/6, 3);

for (var i = 0; i < 3; i++) {
  lines[i].draw();
}

let ccolor = random_rgba();

let size;
if (innerWidth > 980){
  size = 30;
}
else {
  size = 70;
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.beginPath();
  c.arc(w/2, h/2, size, 0, Math.PI * 2,false);
  c.strokeStyle = ccolor;
  c.stroke();
  for (var i = 0; i < 3; i++) {
    lines[i].update();
  }
}

animate();
