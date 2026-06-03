<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useStore()
const selectedItems = ref([])

const cartList = computed(() => store.state.cart)

// 选中变化
const handleSelectionChange = (val) => {
  selectedItems.value = val
}

// 总价
const totalPrice = computed(() => {
  return selectedItems.value.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.num || 1)
  }, 0)
})

// 修改数量
const handleNumChange = (row) => {
  const index = cartList.value.findIndex(item => item.title === row.title)
  if (index !== -1) {
    store.commit('UPDATE_CART_NUM', { index, num: row.num })
  }
}

// 删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm('是否确认删除该商品', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 找到在 store 中的实际 index
    const storeIndex = cartList.value.findIndex(item => item.title === row.title)
    if (storeIndex !== -1) {
      store.commit('REMOVE_FROM_CART', storeIndex)
      ElMessage.success('删除成功')
    }
  }).catch(() => {})
}

// 清空购物车
const handleClear = () => {
  ElMessageBox.confirm('是否确认清空购物车', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.commit('CLEAR_CART')
    selectedItems.value = []
    ElMessage.success('清空购物车成功')
  }).catch(() => {})
}

// 结算
const handleCheckout = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请先选择要结算的商品')
    return
  }
  ElMessageBox.confirm(
    `共 ${selectedItems.value.length} 种商品，合计 ${totalPrice.value} 元`,
    '结算确认',
    {
      confirmButtonText: '确定支付',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    store.dispatch('checkout', selectedItems.value)
    selectedItems.value = []
    ElMessage.success('结算成功')
  }).catch(() => {})
}
</script>

<template>
  <div class="cart-page">
    <el-card>
      <el-table
        empty-text="购物车是空的"
        @selection-change="handleSelectionChange"
        :data="cartList"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="商品名称" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column label="商品图">
          <template #default="{ row }">
            <div style="display: flex; align-items: center; width: 150px;">
              <img style="width: 60px; height: 60px; object-fit: contain;" :src="row.img" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template #default="{ row }">
            <el-input-number
              v-model="row.num"
              :min="1"
              :max="100"
              @change="handleNumChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120">
          <template #default="{ row }">
            <span style="color: red;">￥{{ Number(row.price) * Number(row.num || 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template #default="{ $index, row }">
            <el-button size="small" type="danger" @click="handleDelete($index, row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部操作 -->
      <div class="cart-footer">
        <el-button type="danger" size="large" @click="handleClear">清除购物车</el-button>
        <div class="cart-checkout">
          <span class="cart-total">合计：￥{{ totalPrice }}</span>
          <el-button type="primary" size="large" @click="handleCheckout">立即结算</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.cart-page {
  width: 1360px;
}
.cart-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.cart-checkout {
  display: flex;
  align-items: center;
  gap: 20px;
}
.cart-total {
  font-size: 18px;
  font-weight: bold;
  color: #eb5f3e;
}

/* 响应式 */
@media (max-width: 1400px) {
  .cart-page {
    width: 100%;
  }
}
</style>
