const process = require("process");
const fs = require("fs");
const haystackName = process.argv[3];
const base = 257;
const mod = 1000000007;

const needle = process.argv[2] || "";
const needleSize = needle.length;
const needleHash = hash(needle);
let haystack = fs.readFileSync(haystackName, { encoding: "utf8" }) || "";
const haystackSize = haystack.length - needleSize;

console.log('Searching "' + needle + '":' + needleHash + ' in "' + haystackName + '":' + haystackSize);
if (haystackSize < 0) {
	console.log(-1);
	return;
}

console.time("search");
let power = 1;
for (let i = 0; i < needleSize; i++) {
	power *= base;
}

let h = hash(haystack);
let array = [];
if (needleHash === h) {
	if (equals(0)) {
		array.push(0);
	}
}
for (let i = 0; i < haystackSize; i++) {
	h = (h * base + haystack.charCodeAt(i + needleSize) - haystack.charCodeAt(i) * power) % mod;
	
	//console.log(h + ":" + i);
	if (h === needleHash) {
		if (equals(i + 1)) {
			array.push(i + 1);
		}
	}
}

console.timeEnd("search");
console.log(array.length);

function hash(t) {
	let v = 0;
	for (let i = 0; i < needleSize; i++) {
		v = (v * base + t.charCodeAt(i)) % mod;
	}
	return v;
}


function equals(j) {
	for (let i = j, k = 0; k < needleSize; i++, k++) {
		if (haystack.charCodeAt(i) !== needle.charCodeAt(k)) {
			return false;
		}
	}
	return true;
}