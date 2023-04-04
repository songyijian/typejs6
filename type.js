// 集成属性代理的type函数
export const type = observe(_type);
type.configWarn = true;

/**
 * @Description:  判断数据类型
 * @param {*} arg 数据
 * @return {string} 类型 Number、Array、Object ....
 */
function _type(arg) {
  const typeName = Object.prototype.toString.call(arg).slice(8, -1);
  if (typeName == "Object") {
    const flag = arg.constructor.name;
    if (flag !== "Object") {
      type.configWarn &&
        console.warn(
          `[type]:'${flag}' No attribute label defined. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag`
        );
      return flag;
    }
  }
  return typeName;
}

export function typeTag(classObjct, className) {
  const toStringTag = classObjct.prototype[Symbol.toStringTag];
  if (typeof Symbol !== "undefined" && Symbol.toStringTag && !toStringTag) {
    classObjct.prototype[Symbol.toStringTag] = className;
  }
}

//false
export function isFalse(o) {
  return (
    !o || o === "null" || o === "undefined" || o === "false" || o === "NaN"
  );
}

//整数
export function isInteger(o) {
  try {
    return type(o) === "Number" && o % 1 === 0;
  } catch (e) {
    return false;
  }
}

// 自定义判断函数map
const isBase = { isFalse, isInteger, isNaN: isNaN };

// 属性代理
function observe(data) {
  return new Proxy(data, {
    get(data, target) {
      if (target.startsWith("is") && target.length >= 3) {
        if (isBase[target]) return isBase[target];
        return (object) => _type(object) === target.substring("2");
      }
      return Reflect.get(data, target);
    },
  });
}
