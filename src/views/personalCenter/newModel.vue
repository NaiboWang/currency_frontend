<template>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/personalHome' }">Personal Center</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path:'/personalModelManagement'}">Personal Model Management</el-breadcrumb-item>
    <el-breadcrumb-item>New Model</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-alert title="Add new model info" type="info" center show-icon :closable="false"></el-alert>
    <!-- 步骤条 -->
    <el-form
        class="form_center_layout"
        ref="modelInfoFormRef"
        :model="modelInfoForm"
        :rules="modelInfoFormRules"
        label-width="200px"
    >
      <el-form-item label="Model Name" prop="modelName">
        <el-input v-model="modelInfoForm.modelName"></el-input>
      </el-form-item>
      <el-form-item label="Model Description" prop="modelDescription">
        <el-input type="textarea" v-model="modelInfoForm.modelDescription"></el-input>
      </el-form-item>
      <el-form-item style="text-align: left" label="Framework" prop="modelFramework">
        <el-select v-model="modelInfoForm.modelFramework" placeholder="Please select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model.number="modelInfoForm.price"></el-input>
      </el-form-item>
      <el-form-item label="Tags" prop="tags">
        <el-input type="textarea" v-model="modelInfoForm.tags"
                  placeholder="Use comma (,) to separate tags, such as: Face Recognition, Image Classification"></el-input>
      </el-form-item>
      <el-form-item style="text-align: left" label="Model File">
        <el-upload
            class="upload-demo"
            :action="$axios.defaults.baseURL+'uploadModel'"
            :on-success="handleSuccess"
            :limit="1"
            :data="mId"
            with-credentials
            :on-remove="handleRemove"
        >
          <el-button size="small" type="primary">Upload</el-button>
        </el-upload>
      </el-form-item>
<!--      控制form规则的是item不是里面的内容-->
      <el-form-item style="text-align: left" label="File Name at Server" prop="filename">
        {{modelFilename}}
      </el-form-item>
      <el-form-item style="text-align: left" label="Status" prop="status">
        <el-switch v-model="modelInfoForm.status">
        </el-switch>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="medium" @click="uploadModel">Add Model
    </el-button>
  </el-card>
</template>

<script>
export default {
  name: "newModel",
  async created() {
    this.$store.commit("setActivePath", "/personalModelManagement")
    await this.getModel();
  },
  methods: {
    getModel: async function () {
      if (this.$route.params.id != -1) {
        let modelInfo = await this.$axios.get("queryModel", {
          params: {
            "id": this.$route.params.id,
          }
        });
        this.modelInfoForm = modelInfo.data;
      }
    },
    handleSuccess(response, file, fileList) {
      if (response) {
        this.$message.success("Upload Success!");
        this.modelInfoForm.filename = response["filename"];
        console.log(fileList);
      }
    },
    handleRemove(file, fileList) {
      this.modelInfoForm.filename = "";
    },
    uploadModel: async function () {
      this.$refs.modelInfoFormRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        this.$confirm('Do you really want to add new model?', 'Confirm', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'success'
        }).then(async () => {
          const info = await this.$axios.post('manageModel', {"params": JSON.stringify(this.modelInfoForm)});
          if (info) {
            this.$message.success('Model Upload Success, please log in!');
          }
        }).catch(() => {
        });
      })
    },
  },
  data() {
    const checkPrice = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please input Integer'));
      } else {
        if (value < 0) {
          callback(new Error('The price must be at least 0'));
        } else {
          callback();
        }
      }
    };
    return {
      options: [
        {
          value: "sklearn",
          label: "Scikit-learn",
        },
        {
          value: "pytorch",
          label: "PyTorch",
        }
      ],
      modelInfoForm: {
        id: this.$route.params.id,
        modelName: "",
        modelDescription: "",
        modelFramework: "sklearn",
        tags: "",
        filename: "",
        price: 0,
        status: true,
      },
      fileLists: [],
      // 表单验证
      modelInfoFormRules: {
        modelName: [
          {required: true, message: 'Please enter model name', trigger: 'blur'},
          {min: 2, message: 'The length of model should at least 2 characters', trigger: 'blur'}
        ], price: [
          {validator: checkPrice, required: true, trigger: 'blur'}
        ], modelFramework: [
          {required: true}
        ], filename: [
          {required: true,min: 1, message: 'Please upload model file!', trigger: 'blur'}
        ]
      },
      mId: {"mId": this.$route.params.id},
    };
  },
  computed:{
    title(){
      if(this.$route.params.id == "-1") {
          return "add this new"
      }
      return "update this";
    },
    modelFilename(){
      if(this.modelInfoForm.filename==""){
        return "Waiting for upload..."
      }else{
        return this.modelInfoForm.filename;
      }
    }
  }
}
</script>

<style scoped>

</style>
