# typejs6

> js 数据类型检查，支持自定义类。其中使用了 es6 技术，对低版本 js 有要求的请慎用。

## Installation

```shell
npm install typejs6
```

## API

### type.configWarn = true ｜？

脚手架压缩代码的同时会串改自定义类 name，typejs6 会检查自定义类是否安全并输出`warn`提示。
确保类型安全可使用 typeTag 标记类型。

如果不存在压缩情况可以关闭提示`type.configWarn=false` 。

```js
type.configWarn = true; // 默认开启
type.configWarn = false; // 关闭提示
```

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
```

### type.is...

type.is{Type}(value) > Boolean

```js
import { type, typeTag } from "typejs6";

// 常用工具扩展
type.isInteger(100.1); // false
type.isNaN(NaN); //  true
type.isFalse(" " | 0 | NaN | null | undefined | false); //  true
type.isEmpty({} | [] | set | map | isFalse()); // true; 不支持DOM & 0=fasle

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

自定义类标记类型，也可以手动添加 `get [Symbol.toStringTag](){}` 和 typeTag 效果一样。

```js
import { type, typeTag } from "typejs6";

function MyClass() {}
typeTag(MyClass, "MyClass");

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

## version

- 0.3.0

  - 支持同时支持 es、cjs
  - isFalse 支持对无字符 string
  - isEmpty 支持空对象判断， 不支持 DOM & 0=fasle
