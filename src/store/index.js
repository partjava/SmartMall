import { createStore } from 'vuex'

// 从 localStorage 读取初始数据
const savedUser = localStorage.getItem('USERNAME') || ''
const savedCart = JSON.parse(localStorage.getItem('shopcart_') || '[]')
const savedOrders = JSON.parse(localStorage.getItem('myorder_') || '[]')

export default createStore({
  state: {
    // 用户状态
    isLoggedIn: !!savedUser,
    username: savedUser,
    // 购物车
    cart: savedCart,
    // 订单
    orders: savedOrders,
    // 当前选中的商品分类（用于首页左侧导航联动）
    activeCategory: ''
  },
  getters: {
    // 购物车商品总数
    cartCount(state) {
      return state.cart.reduce((sum, item) => sum + Number(item.num || 1), 0)
    },
    // 购物车总价
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + Number(item.price) * Number(item.num || 1), 0)
    }
  },
  mutations: {
    // 登录
    LOGIN(state, username) {
      state.isLoggedIn = true
      state.username = username
      localStorage.setItem('USERNAME', username)
    },
    // 退出
    LOGOUT(state) {
      state.isLoggedIn = false
      state.username = ''
      localStorage.removeItem('USERNAME')
    },
    // 加入购物车
    ADD_TO_CART(state, product) {
      const existing = state.cart.find(item => item.title === product.title)
      if (existing) {
        existing.num = Number(existing.num || 0) + Number(product.num || 1)
      } else {
        state.cart.push({ ...product, num: Number(product.num || 1) })
      }
      localStorage.setItem('shopcart_', JSON.stringify(state.cart))
    },
    // 更新购物车商品数量
    UPDATE_CART_NUM(state, { index, num }) {
      if (state.cart[index]) {
        state.cart[index].num = num
        localStorage.setItem('shopcart_', JSON.stringify(state.cart))
      }
    },
    // 删除购物车商品
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1)
      localStorage.setItem('shopcart_', JSON.stringify(state.cart))
    },
    // 清空购物车
    CLEAR_CART(state) {
      state.cart = []
      localStorage.setItem('shopcart_', JSON.stringify(state.cart))
    },
    // 结算（购物车 -> 订单）
    CHECKOUT(state, items) {
      items.forEach(item => {
        state.orders.push({ ...item })
      })
      // 从购物车中移除已结算的商品
      const checkoutTitles = items.map(i => i.title)
      state.cart = state.cart.filter(item => !checkoutTitles.includes(item.title))
      localStorage.setItem('shopcart_', JSON.stringify(state.cart))
      localStorage.setItem('myorder_', JSON.stringify(state.orders))
    },
    // 删除订单
    REMOVE_ORDER(state, index) {
      state.orders.splice(index, 1)
      localStorage.setItem('myorder_', JSON.stringify(state.orders))
    },
    // 初始化购物车（从 localStorage 同步）
    INIT_CART(state) {
      const saved = JSON.parse(localStorage.getItem('shopcart_') || '[]')
      state.cart = saved
    },
    // 初始化订单（从 localStorage 同步）
    INIT_ORDERS(state) {
      const saved = JSON.parse(localStorage.getItem('myorder_') || '[]')
      state.orders = saved
    },
    // 设置商品分类筛选
    SET_CATEGORY(state, category) {
      state.activeCategory = category
    },
    // 清除分类筛选
    CLEAR_CATEGORY(state) {
      state.activeCategory = ''
    }
  },
  actions: {
    login({ commit }, username) {
      commit('LOGIN', username)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    checkout({ commit, state }, selectedItems) {
      commit('CHECKOUT', selectedItems)
    }
  }
})
