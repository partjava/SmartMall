<script setup>
import { onMounted } from 'vue'

// 版权保护：禁止右键菜单、禁止复制、禁止图片拖拽
onMounted(() => {
  // 禁止右键菜单
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
  // 禁止复制
  document.addEventListener('copy', (e) => {
    e.preventDefault()
    return false
  })
  // 禁止剪切
  document.addEventListener('cut', (e) => {
    e.preventDefault()
    return false
  })
  // 禁止图片拖拽
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault()
      return false
    }
  })
  // 禁止 F12 / Ctrl+Shift+I / Ctrl+U 查看源码
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C') ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault()
      return false
    }
  })
})
</script>

<template>
  <div id="app">
    <!-- 版权水印 -->
    <div class="watermark" aria-hidden="true">
      <div v-for="i in 30" :key="i" class="watermark-text">myxm © 2024</div>
    </div>

    <!-- 页面切换动画 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 版权水印 */
.watermark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  opacity: 0.08;
}
.watermark-text {
  transform: rotate(-25deg);
  font-size: 16px;
  color: #000;
  white-space: nowrap;
  padding: 20px 80px;
  user-select: none;
}
</style>
