class Component {
    constructor() { }
    add () { }
    scan () { }
}

class Leaf extends Component {
    constructor(name) {
        super();
        this.name = name;
    }
    add () {
        return Error('leaf can not add subtree');
    }
    scan () {
        console.log('leaf is ', this.name);
    }
}

class Composite extends Component {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
    }
    add (ins) {
        this.children.push(ins);
    }
    scan () {
        console.log('composite scan ....');
        this.children.forEach((child) => {
            child.scan();
        });
    }
}

const root = new Composite('root');
const branch1 = new Composite('分支1');
const branch2 = new Composite('分支2');
root.add(branch1);
root.add(branch2);
const leaf1 = new Leaf('叶子1');
const leaf2 = new Leaf('叶子2');
const leaf3 = new Leaf('叶子3');
const leaf4 = new Leaf('叶子4');
branch1.add(leaf1);
branch1.add(leaf2);
branch1.add(leaf3);
branch2.add(leaf4);

root.scan();


// ===== 图形 ======
class Graphic {
    draw () { }
}

class Circle extends Graphic {
    draw () {
        console.log('draw circle');
    }
}

class CompositeGraphic extends Graphic {
    constructor() {
        super();
        this.children = [];
    }
    add (ins) {
        this.children.push(ins);
    }
    draw () {
        console.log('composite draw....');
        this.children.forEach((child) => {
            child.draw();
        });
    }
}

