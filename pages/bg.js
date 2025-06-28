const canvas = document.getElementsByClassName("canvasBg")[0];
const ctx = canvas.getContext("2d");

let lastTime = performance.now();
let delta = 0;

let timeTillSpawnSquare = 0;

let sqaures = [];

function randomColorBetween(color1, color2) {
    // Convert a hex color code to its RGB components
    const hexToRgb = (hex) => {
        hex = hex.replace("#", "");
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16),
        ];
    };

    // Convert RGB components to a hex color code
    const rgbToHex = (r, g, b) => {
        const toHex = (c) => c.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    // Interpolate between two values
    const interpolate = (start, end, t) => Math.round(start + (end - start) * t);

    // Generate a random number between 0 and 1
    const t = Math.random();

    // Get RGB values for both colors
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    // Interpolate each channel
    const r = interpolate(r1, r2, t);
    const g = interpolate(g1, g2, t);
    const b = interpolate(b1, b2, t);

    // Convert back to hex and return
    return rgbToHex(r, g, b);
}




class vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Sqaure {
  constructor(pos, rot, rotSpeed, riseSpeed, size, color) {
    this.pos = pos;
    this.rot = rot;
    
    this.color = color

    this.rotSpeed = rotSpeed;
    this.riseSpeed = riseSpeed;
    this.size = size;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color;

    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();

//     ctx.save();
//     ctx.translate(this.pos.x, this.pos.y);
//     ctx.rotate(this.rot);
//     ctx.fillStyle = this.color;

//     // Draw a circle
//     ctx.beginPath();
//     ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
//     ctx.fill();

//     ctx.restore();
  }

  tick() {
    this.draw(ctx);
    this.pos.y += this.riseSpeed * delta;
    this.rot += this.rotSpeed * delta;
  }
}

function animate() {
  const currentTime = performance.now();
  delta = (currentTime - lastTime) / 1000; // Calculate delta time in seconds
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // tick all sqaures

  for (let i = 0; i < sqaures.length; i++) {
    sqaures[i].tick();
    if (sqaures[i].pos.y > canvas.height+50) {
      sqaures.splice(i, 1);
      i--;
    }
  }
  
  timeTillSpawnSquare -= delta;
  if (timeTillSpawnSquare <= 0) {
    timeTillSpawnSquare = Math.random() * 0.3 + 0.3;
    spawnSquare();
  }

  requestAnimationFrame(animate); // Call animate again for the next frame
}

function spawnSquare(init) {
  const size = Math.random() * 50 + 20; // Random size between 20 and 70
  
  // const size = Math.random() * 20 + 10;
  
  const pos = new vec2(
    Math.random() * (canvas.width - size),
    init ? Math.random() * (canvas.height - size) : 0
  );

  let rotSpeed = Math.random() * 3;

  const newSquare = new Sqaure(
    pos,
    Math.random() * 360,
    rotSpeed,
    (size / 70) * 100,
    size,
    // randomColorBetween("#e6e6e6", "#dbd9d9")
    randomColorBetween("#ADD8E6", "#3498db")
  );
  sqaures.push(newSquare);

}

function initialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  for (let i = 0; i < 50; i++) {
    spawnSquare(true);
  }
  
  // for (let i = 0; i < 200; i++) {
  //   spawnSquare(true);
  // }
}

// Start the animation
initialize();
animate();
