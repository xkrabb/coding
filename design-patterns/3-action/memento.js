/**
 * 备忘录模式，隐藏对象内部细节情况，实现撤销与恢复
 * 命令直接操作备忘录对象，备忘录操作命令对象
 *
 */

class Originator {
    constructor(text) {
        this.text = text || '';
    }
    insertImg(imgName) {
        this.text = this.text + 'img:' + imgName;
    }
    writeWord(word) {
        this.text = this.text + word;
    }
    undo(state) {
        this.text = state.getState();
    }
}

// 备忘对象，或者直接用对象维护
class Memento {
    constructor(state) {
        this.state = state;
        this.updateTime = +new Date();
    }
    getState() {
        return this.state;
    }
    getTime() {
        return this.updateTime;
    }
}

// 对外提供的操作
class Caretaker {
    constructor(originator) {
        this.originator = originator;
        this.history = [];
    }
    insertImg(imgName) {
        this.history.push(new Memento(this.originator.text));
        this.originator.insertImg(imgName);
    }
    writeWord(word) {
        this.history.push(new Memento(this.originator.text));
        this.originator.writeWord(word);
    }
    undo() {
        const last = this.history.pop();
        this.originator.undo(last || '');
    }
}

const ori = new Originator();
const cmd = new Caretaker(ori);

cmd.writeWord('hello ');
cmd.writeWord('word ');
cmd.insertImg('笑脸图片.png ');
console.log('cur show', cmd.originator.text);

cmd.undo();

cmd.insertImg('哈哈大笑图片.png');
console.log('cur show', cmd.originator.text);
