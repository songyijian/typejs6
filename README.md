# typejs6

js 数据类型检查，支持自定义类。其中使用了 es6 技术，对低版本 js 有要求的请慎用。

> 注意：使用脚手架会压缩自定义类标准 name，因此需要使用 typeTag 标记类型，否者 type 会输出`warn`提示。如果确认不存在 bulid 压缩的情况完全可以忽略控制台的提示。

## Installation

```shell
npm install typejs6
```

## API

### type

type(value) >String

```js
import { type, typeTag } from "typejs6";

// js内置对象&自定义对象
type("foo"); // "String"
type([1, 2]); // "Array"
type(3); // "Number"
type(true); // "Boolean"
type(undefined); // "Undefined"
type(null); // "Null"
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

type.is{Type}(value) > string

```js
import { type, typeTag } from "typejs6";

// 常用工具扩展
type.isNaN(NaN); //  true
type.isFalse(NaN | null | undefined | false | NaN); //  true
type.isInteger(100.1); // false

// js内置对象&自定义对象
type.isString("foo"); // true
type.isArray([1, 2]); // true
type.isNumber(3); // true
type.isBoolean(true); // true
type.isUndefined(undefined); // true
type.isNull(null); // true
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

给自定义类添加数据类型。 也可以手动添加 `get [Symbol.toStringTag](){}` 和 typeTag 效果一样。

```js
import { type, typeTag } from "typejs6";

function MyClass() {}
typeTag(MyClass, "MyClass"); // 添加类型标签

let a = new MyClass();
type(a); // MyClass
type.isMyClass(a); // true

// 手动添加，效果同typeTag
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}
```
