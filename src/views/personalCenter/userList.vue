<template>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/personalHome' }">{{$store.state.userInfo.role=='user'?'Personal Center':'Management Center'}}</el-breadcrumb-item>
    <el-breadcrumb-item>User Management</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <search-box :params="searchParams" @get-data="(data) => searchData = data" ref="searchBox">
      <el-table ref="tableRef" :data="searchData" @sort-change="(column) => $refs.searchBox.sortData(column)" border stripe class="left_layout">
        <el-table-column header-align="center" :sortable="'custom'" align="center" label="ID" type="index"></el-table-column>
        <el-table-column header-align="center"  :sortable="'custom'" align="center" label="Username" prop="username"></el-table-column>
        <el-table-column header-align="center"  :sortable="'custom'" align="center" label="Nickname" prop="nickname"></el-table-column>
        <el-table-column header-align="center" :sortable="'custom'" align="center" label="Role" prop="role"></el-table-column>
        <el-table-column header-align="center" align="center" :sortable="'custom'" label="Deposit" prop="deposit"
                         width="130px"></el-table-column>
        <el-table-column :sortable="'custom'" header-align="center" align="center" label="Register Time" prop="register_time"
                         width="160px"></el-table-column>
        <el-table-column header-align="center" align="center" :sortable="'custom'" label="Status" prop="status"
                         width="110px">
          <template v-slot="scope">
            <el-switch @change="changeUserStatus(scope.row,scope.row.id,scope.row.status)" v-model="scope.row.status">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column header-align="center" align="center" label="Operations" width="220px">
          <template v-slot="scope">
            <el-popconfirm
                confirmButtonText='Yes'
                cancelButtonText='No'
                icon="el-icon-info"
                iconColor="grey"
                title="Do you really want to reset this user's password?"
                @confirm='resetPassword(`${scope.row.id}`)'
            >
              <template  #reference>
                <el-button
                    type="primary"
                    icon="el-icon-setting"
                    size="medium"
                >Reset Password
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </search-box>
    <!-- 表格数据 -->

  </el-card>
</template>

<script>
export default {
  name: "userList",
  data() {
    return {
      searchData: [],
      searchParams: {
        queryFields: [
          {
            label: 'User Name',
            value: 'username',
            comment: "",
            type:"text",
          },
          {
            label: 'Nick Name',
            value: 'nickname',
            comment: "",
            type:"text",
          },
          {
            label: 'Role',
            value: 'Role',
            comment: "",
            type:"text",
          },
          {
            label: 'Register Time',
            value: 'register_time',
            comment: ' (Must specify time, not only date)',
            type:"datetime",
          },
        ],
        apiAddress: 'getUserList',
        sortProp: "id",
        defaultSearchProp: "username",
      },
    };
  },
  methods: {
    changeUserStatus: async function(row,id,status){
      let info = await this.$axios.get("changeUserStatus",{
        params:{
          "id":id,
          "status":status,
        }
      });
      if(!info){
        row.status = !status;
      }
    },
    resetPassword: async function(id){
      await this.$axios.get("resetPassword",{
        params:{
          "id":id,
        }
      });
    },
  },
}
</script>

<style scoped>
.el-tag{
  margin-right:8px;
  margin-top:2px;
}
</style>
