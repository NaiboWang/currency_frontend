<template>
  <el-row class="center_layout">
    <el-col :span="6" style="margin-right:10px">
      <el-select style="width: 100%" v-model="searchDict.fields" @change="detectChange" multiple
                 placeholder="Please choose query fields">
        <el-option
            v-for="item in searchDict.queryFields"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-col>

    <el-col :span="10">
      <!--        注意下面js函数默认传参，与python不同！第一个参数必须显式指定为undefined，不能省略！省略会把第二个参数activesearch的true赋值给函数的第一个参数！-->
      <el-input v-model="searchDict.query" @keyup.enter="getData(undefined,activeSearch=true)"
                placeholder="please input keywords to search"
                clearable>
        <template #append>
          <el-button @click="getData(undefined,activeSearch=true)" icon="el-icon-search"></el-button>
        </template>
      </el-input>
    </el-col>
    <el-col :span="1">
      <el-button @click="dialogFormVisible=true" type="primary" plain style="margin-left: 5px">Advanced Search
      </el-button>
    </el-col>
  </el-row>
  <slot>Put your tables here</slot>
  <!-- 分页区域 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchDict.queryInfo.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchDict.queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchDict.total"
      background
  ></el-pagination>
  <el-dialog title="Advanced Search" v-model="dialogFormVisible">
    <el-form>
      <el-form-item v-for="queryField in searchDict.queryFields" :label="queryField.label+queryField.comment"
                    :key="queryField.label"
                    prop="queryField.value">

        <el-input v-model="searchDict.queryInfo.multiConditions[queryField.value]" v-if="queryField.type=='text'"
                  autocomplete="off"></el-input>
        <!--number-->
        <div v-if="queryField.type=='number'" style="width: 100%">
          <el-input v-model="searchDict.queryInfo.multiConditions[queryField.value +'_from']" style="width: 49%"
                    placeholder="From"
                    type="number" autocomplete="off"></el-input>
          <el-input v-model="searchDict.queryInfo.multiConditions[queryField.value +'_to']"
                    style="width: 49%; float: right"
                    placeholder="To"
                    type="number" autocomplete="off"></el-input>
        </div>

        <!--datetime-->
        <div v-if="queryField.type=='datetime'" style="width: 100%">
          <el-input v-model="searchDict.queryInfo.multiConditions[queryField.value +'_from']" style="width: 47%"
                    placeholder="From"
                    type="datetime-local" autocomplete="off"></el-input>
          <label style="width: 4%;margin-left: 2%">To</label>
          <el-input v-model="searchDict.queryInfo.multiConditions[queryField.value +'_to']"
                    style="width: 47%; float: right"
                    placeholder="To"
                    type="datetime-local" autocomplete="off"></el-input>
        </div>

      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="getData(advance=1,activeSearch=true)">Search</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "SearchBox",
  emits:['getData'], //标记事件名称
  async mounted() {
    this.searchDict.queryFields = this.params.queryFields;
    for (let item of this.searchDict.queryFields) {
      if (item.type == 'number' || item.type == 'datetime') {
        this.searchDict.queryInfo.multiConditions[item.value + '_from'] = '';
        this.searchDict.queryInfo.multiConditions[item.value + '_to'] = '';
      } else {
        this.searchDict.queryInfo.multiConditions[item.value] = '';
      }
    }
    this.searchDict.queryInfo.pageSize = this.pageSize;
    this.searchDict.queryInfo.sortProp = this.params.sortProp;
    this.searchDict.fields.push(this.params.defaultSearchProp);
    await this.getData();
  },
  props: {
    params:{
      required:true,
    },
    pageSize: {
      default: 10,
    },

  },
  data() {
    return {
      dialogFormVisible: false,
      searchDict: {
        query: '',
        fields: [],
        queryInfo: {
          pageNum: 1,
          pageSize: 10,
          sortProp: "",
          order: -1,
          advance: 0,
          multiConditions: {},
        },
        queryFields: [],
        total: 0,
      }
    }
  },
  methods: {
    detectChange(values) {
      //全部删除选项时恢复默认选项
      if (values.length == 0) {
        this.searchDict.fields = [];
        this.searchDict.fields.push(this.defaultSearchProp);
      }
    },
    // 分页
    handleSizeChange(newSize) {
      this.searchDict.queryInfo.pageSize = newSize;
      this.getData();
    },
    handleCurrentChange(newSize) {
      this.searchDict.queryInfo.pageNum = newSize;
      this.getData();
    },
    sortData: async function (column) {
      //默认排序元素
      if (column.prop == null) {
        this.searchDict.queryInfo.sortProp = 'updated_time';
      } else {
        this.searchDict.queryInfo.sortProp = column.prop;
      }
      this.searchDict.queryInfo.pageNum = 1; //排序后回到第一页
      this.searchDict.queryInfo.order = column.order == "ascending" ? 1 : -1;
      await this.getData();
    },
    getData: async function (advance = 0, activeSearch = false) {
      if (this.searchDict.fields.length == 0) {
        this.$message.error("Please select at least one query field!");
        return false;
      }
      if (activeSearch) {
        this.searchDict.queryInfo.advance = advance;
        this.searchDict.queryInfo.pageNum = 1;
      }
      let queryInfo = this.$lodash.clone(this.searchDict.queryInfo);
      queryInfo.queryFields = JSON.stringify(this.searchDict.queryFields);
      queryInfo.multiConditions = JSON.stringify(queryInfo.multiConditions);
      if (this.searchDict.queryInfo.advance == 1) {
        queryInfo.query = '';
      } else {
        queryInfo.query = this.searchDict.query;
      }
      queryInfo.fields = [];
      for (let field of this.searchDict.fields) {
        let type = "text";
        for (let item of this.searchDict.queryFields) {
          if (item.value == field) {
            type = item.type;
            break;
          }
        }
        queryInfo.fields.push({name: field, type: type, query: queryInfo.query});
      }
      queryInfo.fields = JSON.stringify(queryInfo.fields);
      let data = await this.$axios.post(this.params.apiAddress, queryInfo);
      this.searchDict.total = data.total;
      this.dialogFormVisible = false;
      this.$emit("getData",data.data);
    },
  },
}
</script>

<style scoped>
.el-form {
  text-align: left;
}

/deep/ .el-form-item__label {
  text-align: left !important;
  float: initial !important;
}
</style>
