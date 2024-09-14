<template>
  <div>
    <div class="test">
      <el-input v-model="input" style="width: 240px" placeholder="请输入代办事项" />
      <el-button type="primary" class="btn" @click="addTodoData">添加代办</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="代办事项" prop="todoName" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogVisible" title="Tips" width="500">
    <el-input v-model="updateData" style="width: 240px" placeholder="更改代办" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="yes"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="">
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
type todo = {
  id: number
  todoName: string
}
let input = ref('')
let tableData: Array<todo> = reactive([])
let dialogVisible = ref(false)
let updateData = ref('')
let mid = ref('')

// 更新代办
function yes() {
  let one = mid.value
  tableData.forEach((item) => {
    if (item.id === one) {
      item.todoName = updateData.value
      updateData.value = ''
    }
  })
  dialogVisible.value = false
}

function handleEdit(index: number, data: any) {
  updateData.value = data.todoName
  mid.value = data.id
  dialogVisible.value = true
}

// 删除代办
function handleDelete(index: number, data: any) {
  tableData.forEach((item) => {
    if (item.id === data.id) {
      tableData.splice(index, 1)
    }
  })
}

// 添加代办事项
function addTodoData() {
  if (input.value === '') {
    ElMessage('请输入代办事项')
  } else {
    let obj: todo = {
      id: uuidv4(),
      todoName: input.value
    }
    tableData.unshift(obj)
    input.value = ''
  }
}
</script>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  width: 50%;
  margin-bottom: 20px;
}
.btn {
  width: 100px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
