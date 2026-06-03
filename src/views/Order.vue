<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useStore()

const orderList = computed(() => store.state.orders)

// 删除订单
const handleDelete = (index) => {
  ElMessageBox.confirm('是否确认删除该订单', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.commit('REMOVE_ORDER', index)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<template>
  <div class="order-page">
    <el-card>
      <el-table
        empty-text="暂无订单"
        :data="orderList"
        style="width: 100%"
      >
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="title" label="商品名称" />
        <el-table-column label="商品图">
          <template #default="{ row }">
            <div style="display: flex; align-items: center; width: 120px;">
              <img style="width: 80px; height: 80px; object-fit: contain;" :src="row.img" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品单价" />
        <el-table-column prop="num" label="购买数量" />
        <el-table-column label="商品总价">
          <template #default="{ row }">
            <span style="color: red;">￥{{ Number(row.price) * Number(row.num || 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template #default="{ $index }">
            <el-button size="small" type="danger" @click="handleDelete($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.order-page {
  width: 1360px;
}

/* 响应式 */
@media (max-width: 1400px) {
  .order-page {
    width: 100%;
  }
}
</style>
