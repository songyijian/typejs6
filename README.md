# typejs6

> js 数据类型检查支持自定义类。

## version

- 0.3.0

  - 同时支持 es、cjs
  - isFalse 支持对无字符 string 判断
  - isEmpty 支持空对象判断。注意：不支持 DOM , 0=fasle

- 0.3.1
  - fix: isEmpty 对于 null 判断异常

## Installation

```shell
npm install typejs6
```

## API

### type.configWarn

代码压缩混淆会串改 class 名称。typejs6 会检查类型安全并输出`warn`提示。

您可以使用`typeTag`修复漏洞，如果你确认安全可全局忽略该警告。

```js
//关闭提示
type.configWarn = false;
```

### type

type(value) >String

```js
import { type, typeTag } from "typejs6";

// js内置对象 & 自定义对象
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
...

```

### type.is...

type.is{Type}(value) > Boolean

```js
import { type, typeTag } from "typejs6";

// 扩展
type.isInteger(100.1); // false
type.isNaN(NaN); //  true
type.isFalse(" "|0|NaN|null|undefined|false); //  true
type.isEmpty({}|[]|set|map|isFalse()); // true; 注意：0=fasle,不支持DOM

// js内置对象 & 自定义对象
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
...
```

### typeTag

使用 typeTag 标记类型，保证混淆代码下的类型安全

```js
import { type, typeTag } from "typejs6";

function MyClass() {}
typeTag(MyClass, "MyClass");

let a = new MyClass();

type(a); // MyClass
type.isMyClass(a); // true
```

也可以手动添加 `get [Symbol.toStringTag](){}` 和 typeTag 效果一样。

```js
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}
```
