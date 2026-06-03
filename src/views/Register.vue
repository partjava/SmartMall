<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  password2: ''
})
const loading = ref(false)

const handleRegister = () => {
  if (!form.username.trim()) {
    ElMessage.warning('请输入账号名')
    return
  }
  if (form.username.length < 3) {
    ElMessage.warning('账号名至少3个字符')
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
  if (form.password !== form.password2) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  loading.value = true

  setTimeout(() => {
    localStorage.setItem('REGISTERED_USERNAME', form.username)
    ElMessage.success('注册成功，请登录')
    loading.value = false
    setTimeout(() => {
      router.push('/Login')
    }, 1000)
  }, 500)
}
</script>

<template>
  <div class="register-page">
    <!-- 顶部横幅 -->
    <div class="top-banner">本网站提供多种手机购买。</div>

    <!-- 主体区域 -->
    <div class="register-body">
      <!-- 左侧品牌展示 -->
      <div class="register-left">
        <div class="brand-area">
          <img class="brand-logo" src="../assets/free/logo.jpg" alt="Logo">
          <div class="brand-name">手机购买</div>
          <div class="brand-slogan">注册即享专属优惠</div>
        </div>
        <img class="brand-img" src="../assets/free/about1.jpg" alt="">
      </div>

      <!-- 右侧注册表单 -->
      <div class="register-right">
        <div class="form-wrapper">
          <h2 class="form-title">账号注册</h2>
          <p class="form-subtitle">创建您的账号，开始购物之旅</p>

          <div class="form-item">
            <label>账号名</label>
            <el-input
              v-model="form.username"
              placeholder="请输入账号名（至少3个字符）"
              size="large"
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
            />
          </div>

          <div class="form-item">
            <label>确认密码</label>
            <el-input
              v-model="form.password2"
              type="password"
              placeholder="请再次输入密码"
              size="large"
              show-password
              @keyup.enter="handleRegister"
            />
          </div>

          <el-button
            type="danger"
            size="large"
            class="register-btn"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>

          <div class="form-footer">
            <span>已有账号？</span>
            <span class="link" @click="$router.push('/Login')">去登录</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="register-footer">
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
.register-page {
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
.register-body {
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
.register-left {
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
.register-right {
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
.register-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 8px;
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

/* 底部 */
.register-footer {
  text-align: center;
  padding: 20px 0;
  font-size: 12px;
  color: #999;
}
.register-footer span {
  margin: 0 12px;
  cursor: pointer;
}
.register-footer span:hover {
  color: #5e4032;
}

/* 响应式 */
@media (max-width: 768px) {
  .register-body {
    flex-direction: column;
    margin: 20px;
    border-radius: 8px;
  }
  .register-left {
    width: 100%;
    padding: 40px 20px;
  }
  .brand-img {
    display: none;
  }
  .register-right {
    width: 100%;
    padding: 40px 24px;
  }
}
</style>
