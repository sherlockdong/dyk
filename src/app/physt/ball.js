class Ball {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.vx = Math.random() * 8 + 2;  // Randomized velocity
      this.vy = Math.random() * -8 - 2; // Randomized launch angle
      this.history = [];  
      this.gravity = 0.2;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
  
      if (this.y > 400 - this.r) {
        this.y = 400 - this.r;
        return false; // Stop motion when it hits the ground
      } else {
        this.history.push([this.vx, this.vy, this.x, this.y]); 
        return true; // Ball is still moving
      }
    }
  
    display(p5) {
      p5.fill(0);
      p5.ellipse(this.x, this.y, this.r * 2);
    }
  }
  
  export default Ball;
  