// import { type, typeTag } from "./type";
import { type, typeTag } from "typejs6";

function logType(a) {
  const rtype = type(a);
  console.log("type:", rtype);
}

logType("foo"); // "String"
logType([1, 2]); // "Array"
logType(3); // "Number"
logType(true); // "Boolean"
logType(undefined); // "Undefined"
logType(null); // "Null"
// .....

logType(new Map()); // "Map "
logType(function* () {}); // "GeneratorFunction "
logType(Promise.resolve()); // "Promise "
logType(JSON); // "Promise "
logType(Math); // "Math "
logType(new Set()); // "Set "
logType(new WeakMap()); // "WeakMap "
logType(new WeakSet()); // "WeakSet "
logType(Symbol()); // "Symbol "
logType(new ArrayBuffer(32)); // "ArrayBuffer"
logType(new DataView(new ArrayBuffer(32))); // "DataView"
// .....

function isLogType(isT, a) {
  const rvalue = type[isT](a);
  console.log("type." + isT, rvalue);
}

isLogType("isInteger", 100.1); // false
isLogType("isNaN", NaN); // true

isLogType("isString", "foo"); // true
isLogType("isArray", [1, 2]); // true
isLogType("isNumber", 3); // true
isLogType("isBoolean", true); // true
isLogType("isUndefined", undefined); // true
isLogType("isNull", null); // true
// .....

isLogType("isMap", new Map()); // true
isLogType("isGeneratorFunction", function* () {}); // true
isLogType("isPromise", Promise.resolve()); // true
isLogType("isPromise", JSON); // true
isLogType("isMath", Math); // true
isLogType("isSet", new Set()); // true
isLogType("isWeakMap", new WeakMap()); // true
isLogType("isWeakSet", new WeakSet()); // true
isLogType("isSymbol", Symbol()); // true
isLogType("isArrayBuffer", new ArrayBuffer(32)); // true
isLogType("isDataView", new DataView(new ArrayBuffer(32))); // true
// .....

// 自定义类 =========
type.configWarn = false; // 关闭提示

class MyClass {
  // get [Symbol.toStringTag]() {
  //   return "MyClass";
  // }
}
// typeTag(MyClass, "MyClass"); // 添加

let x = new MyClass();
console.log(type(x)); // MyClass
console.log(type.isMyClass(x)); // true
