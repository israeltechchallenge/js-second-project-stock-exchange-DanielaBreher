/*
class Element {
  constructor(tag) {
    this.tag = tag;
    this.elem = this.createElement(tag);
  }

  createElement(tag) {
    const elem = document.createElement(tag);
    return elem;
  }

  appendTo(selector) {
    const wrap = document.querySelector(selector);
    wrap.append(this.elem);
  }

  write(text) {
    this.elem.innerHTML = text;
  }

  addClass(name) {
    this.elem.classList.add(name);
  }
}

for (let i = 0; i < 10; i++) {
  const div = new Element("div");
  div.appendTo(".canvas");
  div.write("value");
  div.addClass("box");
}

const div = new Element("div");
div.appendTo(".canvas");
div.write("value");
div.addClass("box");

console.log(div);
//div.write("value");

class Box extends Element {
  constructor(selector) {
    super("div");

    this.appendTo(selector);
    this.write("value");
    this.addClass("box");
  }
}

new Box(".canvas");

new Box(".canvas2");

*/
