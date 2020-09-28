// const ex = require ('./exportee.js')

// console.log(ex);
// console.log(ex.num);

// console.log("\n");
// console.log("\n");

// for ( const a in ex) {
//   console.log(`${a}: ${ex[a]}`)
// }

const path = require("path");

console.log(path.dirname(require.main.filename));
