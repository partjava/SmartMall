<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useStore()

const username = computed(() => store.state.username)
const cartCount = computed(() => store.getters.cartCount)
const activeCategory = computed(() => store.state.activeCategory)

const leftNav = [
  { title: '高处理器', keyword: '处理器' },
  { title: '好评多', keyword: '好评' },
  { title: '回头客多', keyword: '回头客' },
  { title: '质量好', keyword: '质量' },
  { title: '像素高', keyword: '像素' },
  { title: '内存大', keyword: '内存' }
]

// 跳转
const go = (url) => {
  // 点击首页时清除分类筛选
  if (url === '/') {
    store.commit('CLEAR_CATEGORY')
  }
  router.push(url)
}

// 左侧导航点击 —— 跳转首页并筛选
const clickLeftNav = (keyword) => {
  store.commit('SET_CATEGORY', keyword)
  router.push('/')
}

// 退出
const handleLogout = () => {
  store.dispatch('logout')
  ElMessage.success('退出成功')
  setTimeout(() => {
    router.push('/Login')
  }, 1000)
}
</script>

<template>
  <div class="page-wrapper">
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="rongqi1280 navbar-inner">
        <div class="navbar-left">
          <span class="navbar-logo" @click="go('/')">我的手机购买网站</span>
        </div>
        <div class="navbar-right">
          <div class="nav-links">
            <span @click="go('/')">首页</span>
            <span @click="go('/Fenlei')">分类</span>
            <span class="nav-cart" @click="go('/Shopcart')">
              购物车
              <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
            </span>
            <span @click="go('/Order')">我的订单</span>
            <span @click="go('/About')">我的推荐</span>
          </div>
          <div class="flex items-center">
            <div class="text-xl font-bold text-white mr-30">{{ username }}</div>
            <el-button
              style="width: 60px; height: 40px; color: #fff;"
              color="#5e4032"
              @click="handleLogout"
            >
              退出
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main-content">
      <div class="flex mb-40">
        <!-- 左侧导航（可点击筛选） -->
        <div class="left-sidebar">
          <div
            v-for="(item, i) in leftNav"
            :key="i"
            class="left-nav-item"
            :class="{ active: activeCategory === item.keyword }"
            @click="clickLeftNav(item.keyword)"
          >
            <span>{{ item.title }}</span>
          </div>
        </div>

        <!-- 轮播图 -->
        <div class="carousel-area">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="i in 7" :key="i">
              <img
                style="width: 100%; height: 100%; object-fit: cover;"
                :src="require(`../assets/free/banner${i}.jpg`)"
                alt="轮播图"
              >
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 子路由内容 -->
      <router-view />

      <!-- 间距 -->
      <div style="width: 100%; height: 100px;"></div>

      <!-- 底部 -->
      <div class="footer">
        <div class="rongqi1280" style="display: flex; flex-direction: column;">
          <div class="footer-divider">-----------------------------------------</div>
          <div class="footer-title">
            <span class="text-2xl font-bold">我的网站</span>
          </div>
          <div class="footer-divider">-----------------------------------------</div>
          <div class="footer-copyright mt-8">
            Copyright © 2024 myxm. All Rights Reserved. 未经授权禁止转载
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  background: #fff;
}

/* 导航栏 */
.navbar {
  background: #A9A9A9;
}
.navbar-inner {
  display: flex;
  justify-content: center;
}
.navbar-left {
  padding: 40px 0;
  display: flex;
  align-items: center;
}
.navbar-logo {
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-right: 40px;
}
.navbar-right {
  width: 1040px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav-links span {
  font-size: 18px;
  margin-right: 30px;
  cursor: pointer;
  color: #fff;
  transition: color 0.3s;
}
.nav-links span:hover {
  color: #5e4032;
}
.nav-cart {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: -8px;
  right: -16px;
  background: #ff3833;
  color: #fff;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}

/* 主体 */
.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 左侧栏 */
.left-sidebar {
  background: #A9A9A9;
  width: 160px;
  text-align: center;
}
.left-nav-item {
  color: #A9A9A9;
  cursor: pointer;
  padding: 30px 0;
  transition: all 0.3s;
}
.left-nav-item:hover,
.left-nav-item.active {
  color: #fff;
  background: #5e4032;
}

/* 轮播 */
.carousel-area {
  width: 1200px;
}
:deep(.el-carousel__container) {
  height: 600px;
}

/* 底部 */
.footer {
  width: 100%;
  height: 200px;
  background: #A9A9A9;
  color: #fff;
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer-divider {
  padding: 6px 0;
}
.footer-title {
  padding: 6px 0;
}
.footer-copyright {
  font-size: 12px;
  opacity: 0.8;
}

/* 响应式 */
@media (max-width: 1300px) {
  .navbar-right {
    width: auto;
    flex: 1;
  }
  .carousel-area {
    width: 100%;
  }
  .left-sidebar {
    display: none;
  }
}
</style>
