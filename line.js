class Line{
  constructor(i,w,h,color){
    this.x = i * w * 2;
    this.w = w;
    this.h = h;
    this.color = color;
    this.goX = this.x; // lerp position
    this.active = false;
  }
  
  draw(){
    noStroke();
    this.x += (this.goX - this.x) * 0.05; // lerp
    fill(this.color);
    rect(this.x,height-this.h,this.w,this.h);
    if(this.active) {
      stroke(0);
      noFill();
      rect(this.x,0,this.w,height);
    }
  }
}