# typejs6

js 数据类型检查，支持自定义类。其中使用了 es6 技术，对低版本 js 有要求的请慎用。

## Installation

```shell
npm install typejs6
```

## API

### type

return string

```js
import { type, typeTag } from "typejs6";

type("foo"); // "String"
type([1, 2]); // "Array"
type(3); // "Number"
type(true); // "Boolean"
type(undefined); // "Undefined"
type(null); // "Null"
// .....
type(new Map()); // "Map "
type(function* () {}); // "GeneratorFunction "
type(Promise.resolve()); // "Promise "
type(Math); // "Math "
type(new Set()); // "Set "
type(new WeakMap()); // "WeakMap "
type(new WeakSet()); // "WeakSet "
type(Symbol()); // "Symbol "
type(new ArrayBuffer(32)); // "ArrayBuffer"
type(new DataView(buf)); // "DataView"
// ....
```

### type.is...

return Boolean

```js
import { type, typeTag } from "typejs6";

// 扩展
type.isNaN(NaN); //  true
type.isFalse(NaN | null | undefined | false | NaN); //  true
type.isInteger(100.1); // false
// -----

type.isString("foo"); // true
type.isArray([1, 2]); // true
type.isNumber(3); // true
type.isBoolean(true); // true
type.isUndefined(undefined); // true
type.isNull(null); // true
// .....
type.isMap(new Map()); // true
type.isGeneratorFunction(function* () {}); // true
type.isPromise(Promise.resolve()); // true
type.isMath(Math); // true
type.isSet(new Set()); // true
type.isWeakMap(new WeakMap()); // true
type.isWeakSet(new WeakSet()); // true
type.isSymbol(Symbol()); // true
type.isArrayBuffer(new ArrayBuffer(32)); // true
type.isDataView(new DataView(new ArrayBuffer(32))); // true
// .....
```

### typeTag

给自定义类，快速添加数据类型。 也可以手动添加 `get [Symbol.toStringTag](){}` 和 typeTag 效果是一样的。

```js
import { type, typeTag } from "typejs6";

// typeTag快速添加类型标签
class MyClass {}
typeTag(MyClass, "MyClass");
let x = new MyClass();
console.log(type(x)); // MyClass
console.log(type.isMyClass(x)); // true

// 手动添加(效果同上)
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}
let x = new MyClass();
console.log(type(x)); // MyClass
console.log(type.isMyClass(x)); // true
```
