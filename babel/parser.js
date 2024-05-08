const parser = require("@babel/parser");
const babel = require("@babel/core");

const add = (a, b) => {
  return a + b;
}
add(1, 2)

const code = parser.parse(
  `const add = (a, b) => {
    return a + b;
  }
  add(1, 2)`)

console.log('logger: ', code.program, code.program.body[0].declarations, code.program.body[1].expression)