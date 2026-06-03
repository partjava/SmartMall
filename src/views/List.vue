<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import products, { searchProducts } from '../data/products'

const router = useRouter()
const store = useStore()

const keyword = ref('')

// 监听左侧导航的分类筛选
const activeCategory = computed(() => store.state.activeCategory)
watch(activeCategory, (val) => {
  keyword.value = ''
})

// 搜索 + 分类联动
const displayList = computed(() => {
  let list = products
  // 如果有分类筛选，先按关键词匹配分类
  if (activeCategory.value) {
    const kw = activeCategory.value.toLowerCase()
    list = list.filter(p =>
      p.content.toLowerCase().includes(kw) ||
      p.desc.toLowerCase().includes(kw) ||
      p.title.toLowerCase().includes(kw)
    )
  }
  // 再按搜索框关键词过滤
  if (keyword.value) {
    list = searchProducts(keyword.value, list)
  }
  return list
})

// 跳转详情
const goDetail = (item) => {
  router.push({ name: 'Details', params: { id: item.id } })
}

// 加入购物车
const addToCart = (item) => {
  store.dispatch('addToCart', { ...item, num: 1 })
  ElMessage.success('加入成功')
}
</script>

<template>
  <div class="list-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="search-inner">
        <el-input
          v-model="keyword"
          style="border-radius: 0;"
          placeholder="请输入手机名称搜索"
          clearable
        />
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="rongqi1280 product-grid">
      <div
        v-for="item in displayList"
        :key="item.id"
        class="product-card"
        @click="goDetail(item)"
      >
        <div class="product-card-inner">
          <img
            v-if="item.img"
            :src="item.img"
            class="product-img"
            :alt="item.title"
          >
          <div class="text-lg font-bold mt-12">{{ item.title }}</div>
          <div class="text-red mt-16">￥{{ item.price }}</div>
          <div class="product-desc">{{ item.content }}</div>
          <div class="add-cart-btn" @click.stop="addToCart(item)">
            <span>加入购物车</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 无数据 -->
    <div v-if="displayList.length === 0" class="text-center text-white text-2xl py-20">
      暂无相关商品
    </div>
  </div>
</template>

<style scoped>
.list-page {
  background: #A9A9A9;
  padding: 20px 0 40px 0;
}
.search-bar {
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
}
.search-inner {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 23%);
  grid-gap: 2.55%;
}
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;
  background: #fff;
  border: 2px solid #f1f1f1;
  min-height: 400px;
  cursor: pointer;
  transition: all 0.3s;
}
.product-card:hover {
  transform: translate(0, -2px);
  box-shadow: 1px 1px 20px #4c2423;
}
.product-card-inner {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-img {
  width: 260px;
  height: 260px;
  object-fit: contain;
}
.product-desc {
  line-height: 30px;
  color: #929292;
  padding: 8px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.add-cart-btn {
  border: 1px solid #5e4032;
  padding: 10px 45px;
  font-size: 14px;
  color: #5e4032;
  cursor: pointer;
  border-radius: 2px;
  margin-bottom: 15px;
  transition: all 0.3s;
}
.add-cart-btn:hover {
  background: #5e4032;
  color: #fff;
}

/* 响应式 */
@media (max-width: 1300px) {
  .product-grid {
    grid-template-columns: repeat(3, 30%);
    grid-gap: 2%;
  }
  .product-img {
    width: 200px;
    height: 200px;
  }
  .search-inner {
    width: 80%;
  }
}
@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 45%);
  }
}
@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .product-img {
    width: 180px;
    height: 180px;
  }
}
</style>
