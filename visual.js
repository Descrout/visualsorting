


class Visual {
  constructor(lineSize) {
    this.lineCount = floor(width / (lineSize * 2));
    this.lines = [];
    this.checking = [];
    this.min = undefined;
    this.done = false;
    this.x = 0;
    this.y = 0;
    this.state = undefined;

    const rainbow = [
      color(255, 0, 0),
      color(255, 127, 0),
      color(255, 255, 0),
      color(0, 255, 0),
      color(0, 0, 255),
      color(75, 0, 130),
      color(148, 0, 211)
    ];

    for (let i = 0; i < this.lineCount; i++) {
      const colorCount = (this.lineCount - 1) / (rainbow.length - 1);
      const j = round(i / colorCount); // mapping magic

      this.lines.push(new Line(i, lineSize, map(i, 0, this.lineCount, 0, height), rainbow[j]));
    }

  }

  draw() {
    this.lines.forEach((e, i) => {
      if (this.checking.includes(i)) e.active = true;
      else e.active = false;
      e.draw();
    });
  }

  swap(i, j) {
    [this.lines[i], this.lines[j]] = [this.lines[j], this.lines[i]]; // actual swap

    //change line lerp positions
    this.lines[j].goX = this.lines[j].w * 2 * j;
    this.lines[i].goX = this.lines[i].w * 2 * i;
  }

  setState(state) {
    this.state = state;
    switch (state) {
      case "shuffle":
        this.checking = [];
        this.x = this.lineCount - 1;
        break;
      case "bubblesort":
        this.x = 0;
        this.y = 0;
        this.done = true;
        break;
      case "static":
        this.checking = [];
        break;
      case "selectionsort":
        this.x = 0;
        this.y = 1;
        this.min = 0;
        break;
    }
  }

  //fisher-yates shuffle algorithm
  shuffle() {
    if (this.x >= 0) {
      const j = Math.floor(Math.random() * (this.x + 1));
      this.swap(this.x, j);
      this.x--;
    }
  }

  //Sort algorithms without loops
  //60FPS
  bubbleSort() {
    if (this.x < this.lineCount - 1) {
      if (this.y < this.lineCount - this.x - 1) {
        this.checking = [this.y, this.y + 1];
        if (this.lines[this.y].h > this.lines[this.y + 1].h) {
          this.swap(this.y, this.y + 1);
          this.done = false;
        }
        this.y++;
      } else {
        this.y = 0;
        this.x++;
        if (this.done) this.setState("static");
        this.done = true;
      }
    } else this.setState("static");
  }

  selectionSort() {
    if (this.x < this.lines.length) {
      if (this.y < this.lines.length) {
        this.checking = [this.y, this.min];
        if (this.lines[this.y].h < this.lines[this.min].h) {
          this.min = this.y;
        }
        this.y++;
      } else {
        this.swap(this.x, this.min);
        this.x++;
        this.min = this.x;
        this.y = this.x + 1;
      }
    } else this.setState("static");
  }

}