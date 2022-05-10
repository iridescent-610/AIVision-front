<template>
  <div
      class="app-container"
  >
    <div style="font-size: 18px; line-height: 25px; margin: 9px 0 16px 0;">
      <span>
        已结束任务列表
      </span>
    </div>
    <el-table
        style="width: auto"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        fit
        class="table"
        highlight-current-row
    >
      <el-table-column align="left" label="ID" prop="id" width="100"/>
      <el-table-column
          align="left"
          label="设备ID"
          prop="deviceId"
          width="100"
      />
      <el-table-column
          align="left"
          label="AIX任务ID"
          prop="taskId"
          width="120"
      />
      <el-table-column align="left" label="状态" prop="status" width="110"/>
      <el-table-column
          align="left"
          label="开始时间"
          prop="begin"
          width="100"
      />
      <el-table-column align="left" label="结束时间" prop="end" width="100"/>
      <el-table-column
          align="left"
          label="持续时长(分钟)"
          prop="durationMin"
          width="200"
      />
      <el-table-column align="left" label="任务日志" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.logs | ellipsis }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="205">
        <template slot-scope="scope">
          <el-button @click="deleteById(scope.row.id)">删除</el-button>
          <el-button @click="showLog(scope.row.logs)">完整日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: flex-end">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="slot, prev, pager, next"
          :total="totalCount"
      >
        <span class="pagination-total">共 {{ totalCount }} 条</span>
      </el-pagination>
    </div>
    <el-dialog title="任务日志" :visible.sync="dialogVisible" width="1500px">
      <el-input
          type="textarea"
          wrap="off"
          style="width: 100%; font-size: 17px"
          readonly="true"
          resize="none"
          :autosize="{ minRows: 1, maxRows: 26 }"
          v-model="logs"
      >
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
import * as task_api from "../aix-finished-task";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      totalCount: 0,
      pageSize: 9,
      currentPage: 1,
      logs: "",
      dialogVisible: false,
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 60) {
        return value.slice(0, 60) + "...";
      }
      return value;
    },
  },
  methods: {
    deleteById(id) {
      this.$confirm("确认删除？")
          .then((_) => {
            task_api.deleteById(id).then((response) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.refreshPage();
            });
          })
          .catch((_) => {
          });
    },
    showLog(logs) {
      this.dialogVisible = true;
      this.logs = logs;
    },
    handleCurrentChange(cur) {
      this.currentPage = cur;
      this.refreshPage();
    },
    refreshPage() {
      task_api.getTaskCount().then((response) => {
        this.totalCount = response.data;
      });
      task_api
          .getTaskListByPage(this.currentPage, this.pageSize)
          .then((response) => {
            this.list = response.data;
            this.listLoading = false;
          });
    },
  },
  created() {
    this.listLoading = true;
    task_api.getTaskCount().then((response) => {
      this.totalCount = response.data;
    });

    task_api.getTaskListByPage(1, this.pageSize).then((response) => {
      this.list = response.data;
      this.listLoading = false;
    });
    // const win = this
    // // 定义复制按钮
    // const btn = new ClipboardJS('.copyBtn')
    // btn.on('success', function(e) {
    //   console.info('Action:', e.action)
    //   console.info('Text:', e.text)
    //   console.info('Trigger:', e.trigger)
    //   win.copySuccess()
    //   e.clearSelection()
    // })
  },
};
</script>

<style lang="less" scoped>
.table {
  border: 1px solid rgba(207, 216, 220, 1);
  border-radius: 4px;

  &:before {
    content: unset;
  }

  &:after {
    content: unset;
  }

  /deep/ table {
    border: unset !important;
  }

  /deep/ thead {
    line-height: 14px;
  }

  /deep/ th {
    background-color: rgba(248, 249, 249, 1) !important;
    color: rgba(38, 50, 56, 1);
    font-size: 14px;
    font-weight: 400;
    border: unset;
  }

  /deep/ tbody td {
    height: 40px;
    line-height: 40px;
    padding: 0;
    color: rgba(73, 93, 103, 1);
    font-size: 14px;
  }

  /deep/ .card {
    border-radius: unset;
    border: unset !important;
  }

  .action-button {
    &:focus {
      outline: unset;
    }
  }
}

.pagination-total {
  color: rgba(69, 90, 100, 0.65);
  font-size: 14px !important;
  font-weight: normal;
}
</style>
