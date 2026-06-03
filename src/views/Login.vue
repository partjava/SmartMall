<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const store = useStore()

const form = reactive({
  username: '',
  password: ''
})
const loading = ref(false)

// 如果从注册页跳过来，自动填充用户名
onMounted(() => {
  const registered = localStorage.getItem('REGISTERED_USERNAME')
  if (registered) {
    form.username = registered
    localStorage.removeItem('REGISTERED_USERNAME')
  }
})

// 表单验证 + 登录
const handleLogin = () => {
  if (!form.username.trim()) {
    ElMessage.warning('请输入手机号/用户名')
    return
  }
  if (!form.password.trim()) {
    ElMessage.warning('请输入密码')
    return
  }
  if (form.password.length < 6) {
    ElMessage.warning('密码长度不能少于6位')
    return
  }

  loading.value = true

  setTimeout(() => {
    store.dispatch('login', form.username)
    ElMessage.success('登录成功')
    loading.value = false

    const redirect = route.query.redirect || '/'
    setTimeout(() => {
      router.push(redirect)
    }, 1000)
  }, 500)
}
</script>

<template>
  <div class="login-page">
    <!-- 顶部横幅 -->
    <div class="top-banner">本网站提供多种手机购买。</div>

    <!-- 主体区域 -->
    <div class="login-body">
      <!-- 左侧品牌展示 -->
      <div class="login-left">
        <div class="brand-area">
          <img class="brand-logo" src="../assets/free/logo.jpg" alt="Logo">
          <div class="brand-name">手机购买</div>
          <div class="brand-slogan">高品质 · 高服务 · 高保障</div>
        </div>
        <img class="brand-img" src="../assets/free/about1.jpg" alt="">
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-right">
        <div class="form-wrapper">
          <h2 class="form-title">账号登录</h2>
          <p class="form-subtitle">欢迎回来，请登录您的账号</p>

          <div class="form-item">
            <label>手机号 / 用户名</label>
            <el-input
              v-model="form.username"
              placeholder="请输入手机号或用户名"
              size="large"
              @keyup.enter="handleLogin"
            />
          </div>

          <div class="form-item">
            <label>密码</label>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码（至少6位）"
              size="large"
              show-password
              @keyup.enter="handleLogin"
            />
          </div>

          <div class="form-options">
            <span class="text-sm text-blue cursor-pointer">忘记密码？</span>
          </div>

          <el-button
            type="danger"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>

          <div class="form-footer">
            <span>还没有账号？</span>
            <span class="link" @click="$router.push('/Register')">立即注册</span>
          </div>

          <div class="third-party">
            <div class="divider-text">
              <span>其他登录方式</span>
            </div>
            <div class="third-party-icons">
              <img src="../assets/free/icon-qq.svg" alt="QQ">
              <img src="../assets/free/icon-zfb.svg" alt="支付宝">
              <img src="../assets/free/icon-wx.svg" alt="微信">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="login-footer">
      <span class="cursor-pointer">帐号用户协议</span>
      <span class="cursor-pointer">隐私声明</span>
      <span class="cursor-pointer">常见问题</span>
      <span class="cursor-pointer">帮助中心</span>
      <div class="mt-8" style="color: rgba(0,0,0,.3); font-size: 12px;">
        Copyright © 2024 myxm. All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* 顶部横幅 */
.top-banner {
  text-align: center;
  padding: 16px 0;
  background: #dedede;
  font-size: 14px;
  color: #666;
}

/* 主体 */
.login-body {
  flex: 1;
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 60px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  overflow: hidden;
}

/* 左侧品牌 */
.login-left {
  width: 45%;
  background: linear-gradient(135deg, #5e4032 0%, #8b6f5e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
}
.brand-area {
  text-align: center;
  z-index: 1;
}
.brand-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid rgba(255,255,255,0.3);
}
.brand-name {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
}
.brand-slogan {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}
.brand-img {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 250px;
  opacity: 0.15;
  transform: rotate(-15deg);
}

/* 右侧表单 */
.login-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}
.form-wrapper {
  width: 100%;
  max-width: 360px;
}
.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}
.form-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 40px;
}
.form-item {
  margin-bottom: 24px;
}
.form-item label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}
.form-options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}
.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
}
.form-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #999;
}
.form-footer .link {
  color: #5e4032;
  cursor: pointer;
  font-weight: 500;
}
.form-footer .link:hover {
  text-decoration: underline;
}

/* 第三方登录 */
.third-party {
  margin-top: 40px;
}
.divider-text {
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}
.divider-text::before,
.divider-text::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #e0e0e0;
}
.divider-text::before { left: 0; }
.divider-text::after { right: 0; }
.divider-text span {
  font-size: 12px;
  color: #999;
  background: #fff;
  padding: 0 12px;
  position: relative;
}
.third-party-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
}
.third-party-icons img {
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: transform 0.3s;
  opacity: 0.6;
}
.third-party-icons img:hover {
  transform: scale(1.2);
  opacity: 1;
}

/* 底部 */
.login-footer {
  text-align: center;
  padding: 20px 0;
  font-size: 12px;
  color: #999;
}
.login-footer span {
  margin: 0 12px;
  cursor: pointer;
}
.login-footer span:hover {
  color: #5e4032;
}

/* 响应式 */
@media (max-width: 768px) {
  .login-body {
    flex-direction: column;
    margin: 20px;
    border-radius: 8px;
  }
  .login-left {
    width: 100%;
    padding: 40px 20px;
  }
  .brand-img {
    display: none;
  }
  .login-right {
    width: 100%;
    padding: 40px 24px;
  }
}
</style>
