const r = l(i);
r.configWarn = !0;
function i(t) {
  const n = Object.prototype.toString.call(t).slice(8, -1);
  if (n == "Object") {
    const e = t.constructor.name;
    if (e !== "Object")
      return r.configWarn && console.warn(
        `[type]:'${e}' No attribute label defined. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag`
      ), e;
  }
  return n;
}
function a(t, n) {
  const e = t.prototype[Symbol.toStringTag];
  typeof Symbol < "u" && Symbol.toStringTag && !e && (t.prototype[Symbol.toStringTag] = n);
}
function c(t) {
  return r.isString(t) ? !t.trim() : !t;
}
function u(t) {
  if (t === 0 || typeof t == "function")
    return !1;
  if (typeof t == "object") {
    if (t === null)
      return !0;
    const n = typeof t[Symbol.iterator] == "function" ? [...t] : { ...t };
    return Object.keys(n).length === 0;
  }
  return c(t);
}
function s(t) {
  try {
    return r(t) === "Number" && t % 1 === 0;
  } catch {
    return !1;
  }
}
const o = { isFalse: c, isInteger: s, isEmpty: u, isNaN };
function l(t) {
  return new Proxy(t, {
    get(n, e) {
      return e.startsWith("is") && e.length >= 3 ? o[e] ? o[e] : (f) => i(f) === e.substring("2") : Reflect.get(n, e);
    }
  });
}
export {
  r as type,
  a as typeTag
};
