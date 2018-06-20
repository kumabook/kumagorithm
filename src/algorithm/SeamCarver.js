const SeamCarver = function(imageData) {
  this.imageData = imageData;
  this.energyTo = [];
  this.edgeTo = [];
  this.energies = [];
};

SeamCarver.prototype.getPixel = function(x, y) {
  //  ((50*(imageData.width*4)) + (200*4)) + 2]
  const w = this.imageData.width;
  const offset = y * w * 4 + x * 4;
  return {
    r: this.imageData.data[offset],
    g: this.imageData.data[offset + 1],
    b: this.imageData.data[offset + 2],
    a: this.imageData.data[offset + 3],
  };
};

SeamCarver.prototype.setPixel = function(imageData, x, y, pixel) {
  const w      = imageData.width;
  const offset = y * w * 4 + x * 4;
  imageData.data[offset] = pixel.r;
  imageData.data[offset + 1] = pixel.g;
  imageData.data[offset + 2] = pixel.b;
  imageData.data[offset + 3] = pixel.a;
};

SeamCarver.prototype.width = function() {
  return this.imageData.width;
};

SeamCarver.prototype.height = function() {
  return this.imageData.height;
};

SeamCarver.prototype.energy = function(x, y) {
  if (x < 0 || y < 0 || x >= this.width() || y >= this.height())
    throw new Error("out of index");
  if (x == 0 || x == this.width()-1 || y == 0 || y == this.height()-1) return 1000;
  const left = this.getPixel(x - 1, y);
  const right = this.getPixel(x + 1, y);
  const dxr = left.r - right.r;
  const dxg = left.g - right.g;
  const dxb = left.b - right.b;
  const dx = dxr*dxr + dxg*dxg + dxb*dxb;

  const top = this.getPixel(x, y - 1);
  const bottom = this.getPixel(x, y + 1);
  const dyr = top.r - bottom.r;
  const dyg = top.g - bottom.g;
  const dyb = top.b - bottom.b;
  const dy = dyr*dyr + dyg*dyg + dyb*dyb;

  return Math.sqrt(dx + dy);
};

SeamCarver.prototype.relax = function(x, y, dx, dy) {
  //System.out.println(String.format("relax (%d, %d) %f, (%d, %d) %f, edge %f",
  //      x, y, energyTo[y][x], dx, dy, energyTo[dy][dx], energies[dy][dx]));
  if (this.energyTo[dy][dx] > this.energyTo[y][x] + this.energies[dy][dx]) {
    this.energyTo[dy][dx] = this.energyTo[y][x] + this.energies[dy][dx];
    this.edgeTo[dy][dx] = { x: x, y: y };
  }
};

SeamCarver.prototype.findVerticalSeam = function() {
  this.energies = [];
  this.edgeTo = [];
  for (let y = 0; y < this.height(); y++) {
    this.energies[y] = [];
    this.edgeTo[y] = [];
    for (let x = 0; x < this.width(); x++) {
      this.energies[y][x] = this.energy(x, y);
    }
  }

  this.energyTo = [];
  for (let y = 0; y < this.height(); y++) {
    this.energyTo[y] = [];
    for (let x = 0; x < this.width(); x++) {
      if (y == 0) {
        this.energyTo[y][x] = this.energies[y][x];
      } else {
        this.energyTo[y][x] = Infinity;
      }
    }
  }

  for (let y = 0; y < this.height() - 1; y++) {
    for (let x = 0; x < this.width(); x++) {
      this.relax(x, y, x, y + 1);
      if (x > 0)
        this.relax(x, y, x - 1, y + 1);
      if (x < this.width() - 1)
        this.relax(x, y, x + 1, y + 1);
    }
  }

  let path = [];
  let bottom = this.height() - 1;
  let min = Infinity;
//  console.log(this.energyTo);
  for (let x = 0; x < this.width(); x++) {
    if (this.energyTo[this.height() - 1][x] < min) {
      min = this.energyTo[this.height() - 1][x];
      let p = { x: x, y: bottom };
      path = [];
      for (let i = 0; i < this.height(); i++) {
        path[this.height() - 1 - i] = p.x;
        p = this.edgeTo[p.y][p.x];
      }
    }
  }

  return path;
};

SeamCarver.prototype.findHorizontalSeam = function() {
  const reverse = new ImageData(this.height(), this.width());
  for (let x = 0; x < this.width(); x++) {
    for (let y = 0; y < this.height(); y++) {
      this.setPixel(reverse, y, x, this.getPixel(x, y));
    }
  }
  const sc = new SeamCarver(reverse);
  const seam = sc.findVerticalSeam();
  return seam;
};

SeamCarver.prototype.removeHorizontalSeam = function(seam) {
  if (this.height() <= 1 || this.width() != seam.length) {
    throw new Error('wrong arguments');
  }
  let p = new ImageData(this.width(), this.height()-1);
  let offset = seam[0];
  for (let x = 0; x < seam.length; x++) {
    if (seam[x] < 0 || seam[x] >= this.height() || Math.abs(seam[x] - offset) > 1) {
      throw new Error("Invalid seam: wrong value");
    }
    offset = seam[x];

    for (let y = 0; y < this.height() - 1; y += 1) {
      if (y >= offset) {
        this.setPixel(p, x, y, this.getPixel(x, y + 1));
      } else {
        this.setPixel(p, x, y, this.getPixel(x, y));
      }
    }
  }
  this.imageData = p;
};

SeamCarver.prototype.removeVerticalSeam = function(seam) {
  if (this.width() <= 1 || this.height() != seam.length) {
    throw new Error("Invalid seam: wrong length");
  }
  const p = new ImageData(this.width()-1, this.height());
  let offset = seam[0];
  for (let y = 0; y < seam.length; y++) {
    if (seam[y] < 0 || seam[y] >= this.width() || Math.abs(seam[y] - offset) > 1) {
      throw new Error("Invalid seam: wrong value");
    }
    offset = seam[y];
    for (let x = 0; x < this.width() - 1; x++) {
      if (x >= offset) {
        this.setPixel(p, x, y, this.getPixel(x + 1, y));
      } else {
        this.setPixel(p, x, y, this.getPixel(x, y));
      }
    }
  }
  this.imageData = p;
};

module.exports = SeamCarver;
