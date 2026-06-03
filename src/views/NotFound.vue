<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="nf-content">
      <div class="nf-code">404</div>
      <div class="nf-text">抱歉，您访问的页面不存在</div>
      <div class="nf-desc">请检查地址是否正确，或返回首页</div>
      <el-button type="primary" size="large" @click="router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.nf-content {
  text-align: center;
}
.nf-code {
  font-size: 120px;
  font-weight: bold;
  color: #5e4032;
  line-height: 1;
  margin-bottom: 20px;
}
.nf-text {
  font-size: 24px;
  color: #333;
  margin-bottom: 12px;
}
.nf-desc {
  font-size: 14px;
  color: #999;
  margin-bottom: 40px;
}
</style>
