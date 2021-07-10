const ls = localStorage
//使用的是 localStorage 这个源对象

export default {
  setItem(name, value) {
    ls.setItem(name, JSON.stringify(value))
    //定义一个 setItem 的方法，用的是 localStorage 里 setItem 的方法
  },
  getItem(name) {
    try {
      return JSON.parse(ls.getItem(name))
    } catch (e) {
      return null
    }
  },
  removeItem(name) {
    ls.removeItem(name)
  }
}
