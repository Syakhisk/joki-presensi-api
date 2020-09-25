let data = "VU5ZVWRld2ExMjM=";
let buff = new Buffer.from(data, "base64");
// let buff = new Buffer.from(data);
// let base64data = buff.fromString("base64");

console.log(buff.toString());

// console.log(base64data);
// VU5ZVWRld2ExMjM=
