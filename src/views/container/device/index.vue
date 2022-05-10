<template>
  <div
    class="app-container"
  >
    <div style="font-size: 18px; line-height: 25px; margin: 9px 0 16px 0;">
      <span>
        已注册算力设备
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
      <el-table-column align="left" label="ID" prop="id" width="80" />
      <el-table-column
        align="left"
        label="名称"
        prop="deviceName"
        width="100"
      />
      <el-table-column align="left" label="描述" prop="info" width="155" />
      <el-table-column
        align="left"
        label="创建者ID"
        prop="userId"
        width="120"
      />
      <el-table-column
        align="left"
        label="创建时间"
        prop="createdTime"
        width="100"
      />
      <el-table-column
        align="left"
        label="活动时间"
        prop="lastLogin"
        width="100"
      />
      <el-table-column
        align="left"
        label="GPU驱动"
        prop="driverVersion"
        width="120"
      />
      <el-table-column
        align="left"
        label="CUDA版本"
        prop="cudaVersion"
        width="140"
      />
      <el-table-column align="left" label="GPU数量" width="120">
        <template slot-scope="scope">
          <el-popover placement="right" width="100%" trigger="hover">
            <el-table :data="scope.row.gpus">
              <el-table-column prop="id" label="编号" width="55" />
              <el-table-column prop="name" label="型号" width="150" />
              <el-table-column prop="calPower" label="算力" width="50" />
              <el-table-column prop="powerLimit" label="额定功率" width="99" />
              <el-table-column prop="memAll" label="显存总量" width="99" />
            </el-table>
            <el-button slot="reference">{{ scope.row.gpuNum }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="显存(MB)"
        prop="gpuMemSum"
        width="120"
      />
      <el-table-column
        align="left"
        label="算力"
        prop="calPowerSum"
        width="100"
      />
      <el-table-column align="left" label="操作" width="105">
        <template slot-scope="scope">
          <el-button @click="jumpToManageDialog(scope.row)">修改</el-button>
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
    <el-dialog title="设备管理" :visible.sync="dialogVisible" width="1000px">
      <el-form label-position="right" label-width="auto">
        <el-form-item style="margin-right: 450px" label="ID">
          <el-input v-model="dialogDeviceInfo.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 450px" label="创建用户ID">
          <el-input
            v-model="dialogDeviceInfo.userId"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <div style="display: flex">
            <el-input
              style="margin-right: 20px"
              v-model="inputDeviceName"
            ></el-input>
            <el-button
              style="margin-right: 450px"
              size="small"
              @click="updateName"
              >提交修改</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <div style="display: flex">
            <el-input
              style="margin-right: 20px"
              v-model="inputDeviceInfo"
            ></el-input>
            <el-button
              style="margin-right: 250px"
              size="small"
              @click="updateInfo"
              >提交修改</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="Token">
          <el-input
            style="margin-right: 0px"
            v-model="dialogDeviceInfo.token"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <!--      <div style="display: flex">-->
      <!--        <div style="margin-right: 5px; font-size: 17px; ">Token:</div>-->
      <!--        <div><span style="font-size: 17px; color: darkred; margin-right: 20px;">{{ dialogDeviceInfo.token }}</span>-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <el-link class="copyBtn" style="font-size: 17px; " :data-clipboard-text="dialogDeviceInfo.token">复制</el-link>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <span slot="footer" class="dialog-footer">-->
      <!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import * as device_api from "../aix-device";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      totalCount: 0,
      pageSize: 9,
      currentPage: 1,
      dialogVisible: false,
      inputDeviceName: "",
      inputDeviceInfo: "",
      dialogDeviceInfo: {
        deviceName: "unknown",
        id: "",
        userId: "",
        info: "",
        token: "",
      },
    };
  },
  methods: {
    updateName() {
      device_api
        .updateDeviceNameById(
          this.dialogDeviceInfo.id + "",
          this.inputDeviceName
        )
        .then((response) => {
          this.refreshPage();
        });
    },
    updateInfo() {
      device_api
        .updateDeviceInfoById(
          this.dialogDeviceInfo.id + "",
          this.inputDeviceInfo
        )
        .then((response) => {
          this.refreshPage();
        });
    },
    jumpToManageDialog(device) {
      this.dialogVisible = true;
      // this.dialogDeviceIndex = index
      this.dialogDeviceInfo = device;
      this.inputDeviceName = device.deviceName;
      this.inputDeviceInfo = device.info;
      // this.$router.push({
      //   path: `/detail/${token}`
      // })
    },
    handleCurrentChange(cur) {
      this.currentPage = cur;
      this.refreshPage();
    },
    refreshPage() {
      device_api.getDeviceCount().then((response) => {
        this.totalCount = response.data;
      });

      device_api
        .getClientListByPage(this.currentPage, this.pageSize)
        .then((response) => {
          this.list = response.data;
          this.listLoading = false;
        });
    },
  },
  created() {
    this.listLoading = true;
    device_api.getDeviceCount().then((response) => {
      this.totalCount = response.data;
    });

    device_api.getClientListByPage(1, this.pageSize).then((response) => {
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
