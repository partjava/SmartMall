<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getProductById } from '../data/products'

const router = useRouter()
const route = useRoute()
const store = useStore()

const product = ref(null)
const num = ref(1)

onMounted(() => {
  const id = route.params.id
  product.value = getProductById(id)
  if (!product.value) {
    ElMessage.error('商品不存在')
    router.push('/')
  }
})

// 加入购物车
const addToCart = () => {
  if (!product.value) return
  store.dispatch('addToCart', { ...product.value, num: num.value })
  ElMessage.success('加入成功')
}
</script>

<template>
  <div class="detail-page" v-if="product">
    <!-- 头部 -->
    <div class="pd-tb-20" style="position: relative; width: 100%;">
      <div class="back-btn" @click="router.go(-1)">
        <span>返回上一页</span>
      </div>
      <h2 class="text-center">详情信息</h2>
    </div>

    <!-- 商品详情 -->
    <div class="detail-content">
      <img
        style="height: 400px; box-shadow: 4px 4px 14px #929292; border-radius: 4px; margin: 6px 0; object-fit: contain;"
        :src="product.img"
        :alt="product.title"
      >
      <p class="py-10">{{ product.title }}</p>
      <p class="py-10 text-red">￥{{ product.price }}</p>
      <p class="py-10 text-gray">{{ product.content }}</p>
      <div class="pb-15">
        <el-input-number v-model="num" :min="1" :max="100" />
      </div>
      <div class="add-cart-btn" @click="addToCart">
        <span>加入购物车</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  width: 1250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
}
.detail-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail-content p {
  padding: 10px 0;
}
.pd-tb-20 {
  padding: 20px 0;
}
.back-btn {
  width: 100px;
  color: #5e4032;
  padding: 16px 20px;
  cursor: pointer;
  text-align: center;
  position: absolute;
  border: 1px solid #5e4032;
  left: 0;
  transition: all 0.3s;
}
.back-btn:hover {
  background: #5e4032;
  color: #fff;
}
.add-cart-btn {
  width: 100px;
  background: #5e4032;
  color: #fff;
  padding: 16px 20px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}
.add-cart-btn:hover {
  background: #4a3328;
}

/* 响应式 */
@media (max-width: 1300px) {
  .detail-page {
    width: 100%;
    padding: 30px 20px;
  }
}
</style>
