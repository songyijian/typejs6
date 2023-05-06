// 集成属性代理的type函数
export const type = observe(_type);
type.configWarn = true;

/**
 * @Description:  判断数据类型
 * @param {*} arg 数据
 * @return {string} 类型 Number、Array、Object ....
 * @Author: yijian
 * @Version: 0.1.0
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
/**
 * @Description:
 * @param {*} classObjct
 * @param {*} className
 * @return {*}
 * @Author: yijian
 * @Version: 0.1.0
 */
export function typeTag(classObjct, className) {
  const toStringTag = classObjct.prototype[Symbol.toStringTag];
  if (typeof Symbol !== "undefined" && Symbol.toStringTag && !toStringTag) {
    classObjct.prototype[Symbol.toStringTag] = className;
  }
}

// 假 false
function isFalse(o) {
  if (type.isString(o)) return !Boolean(o.trim());
  return !Boolean(o);
}

function isEmpty(o) {
  if (o === 0 || typeof o === "function") return false;
  if (typeof o === "object") {
    const box = typeof o[Symbol.iterator] === "function" ? [...o] : { ...o };
    return Object.keys(box).length === 0;
  }
  return isFalse(o);
}

//整数
function isInteger(o) {
  try {
    return type(o) === "Number" && o % 1 === 0;
  } catch (e) {
    return false;
  }
}

// 自定义判断函数map
const isBase = { isFalse, isInteger, isEmpty, isNaN: isNaN };

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
