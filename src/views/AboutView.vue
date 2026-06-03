<script setup>
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

onMounted(() => {
  ElMessage.info('欢迎访问手机推荐页面')
})

const showMessage = () => {
  ElMessage.success('欢迎来到华为荣耀手机主场')
}
</script>

<template>
  <div class="about-page">
    <!-- 精品推荐 -->
    <div class="about-content">
      <div class="about-hero">
        <img style="width: 500px;" src="../assets/free/about1.jpg" alt="">
        <div class="text-gray-dark">
          <p class="mb-8">
            <span class="text-4xl font-bold">我的手机</span>
            <el-button type="primary" class="ml-8" @click="showMessage">你好</el-button>
          </p>
          <p class="mb-8">主打想要高性能、高质量、高像素、高电池、高外观、高配置、什么都高高高</p>
          <p style="line-height: 34px; font-size: 20px;">
            如果你正在寻找一款高端智能手机，那么华为 Mate 70 RS 非凡大师和荣耀 Magic7 Pro
            绝对值得考虑。华为 Mate 70 RS 非凡大师，作为一款顶级旗舰，拥有卓越的性能和奢华的设计。
            荣耀 Magic7 Pro 也不逊色，具备强大的人工智能功能，能为你的生活和工作带来极大便利。
            这两款手机在外观设计上尽显时尚与大气，配置上更是一流，无论是处理器性能、拍照效果还是续航能力，
            都能满足你的各种需求。选择它们，开启非凡的智能生活之旅。
          </p>
        </div>
      </div>
    </div>

    <!-- 焦点图 -->
    <div style="width: 100%; padding: 40px 0;">
      <img style="width: 1360px;" src="../assets/free/about2.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
.about-page {
  width: 1360px;
  margin: auto;
}
.about-content {
  width: 100%;
}
.about-hero {
  display: flex;
  align-items: center;
}
.about-hero img {
  margin-right: 20px;
}
.text-gray-dark {
  color: #333;
}

/* 响应式 */
@media (max-width: 1400px) {
  .about-page {
    width: 100%;
    padding: 0 20px;
  }
}
@media (max-width: 900px) {
  .about-hero {
    flex-direction: column;
  }
  .about-hero img {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;
  }
}
</style>
