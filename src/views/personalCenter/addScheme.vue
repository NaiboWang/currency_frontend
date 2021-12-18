<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-clipboard-text"></i>
      </span> Scheme > New </h3>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">

          <div class="card">
            <div style="margin:0 auto;min-width:40%">
            <div class="card-body">
              <h3 class="card-title" style="font-size:1.5rem">New Scheme</h3>
              <form class="forms-sample" style="text-align: left">
                <div class="form-group">
                  <label style="font-family: ubuntu-regular">Scheme Description</label>
                  <b-form-select v-model="form.selected" :options="options" style="font-family: ubuntu-regular"></b-form-select>
                </div>
                <div class="form-group" v-if="form.selected==2">
                  <label style="font-family: ubuntu-regular">Custom Description</label>
                  <b-form-input v-model="form.desc" id="feedback-user"  style="font-size: 1rem"></b-form-input>
                  <b-form-invalid-feedback :state="validation">
                    Your scheme description must be 5-30 characters long.
                  </b-form-invalid-feedback>
                </div>
                <button type="button" @click="newScheme" class="btn btn-info mr-2">Submit</button>

              </form>
            </div>
            </div>
          </div>

      </div>
    </div>
    <b-modal centered id="bv-modal-scheme-new">
      <template #modal-title>
        New Scheme
      </template>
      <div class="d-block text-center">
        <h4>Do you really want to add this new scheme?</h4>
      </div>
      <template #modal-footer>

        <b-button size="sm" variant="dark" @click="$bvModal.hide('bv-modal-scheme-new')">
          No
        </b-button>
        <b-button size="sm" variant="info" @click="submitScheme">
          Yes
        </b-button>

      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        selected: "Robustness Scheme",
        desc:"",
      },
      validation:true,
      options: [
        // { value: null, text: 'Please select an option' },
        { value: "Robustness Scheme", text: 'Robustness Scheme' },
        { value: "Radical Scheme", text: 'Radical Scheme' },
        { value: 2, text: 'Custom Description' },
      ]
    }
  },
  methods: {
    newScheme: function (){
      if(this.form.selected == 2){
        this.validation = this.form.desc.length > 4 && this.form.desc.length < 31;
      }else{
        this.validation = true;
      }
      if(this.validation){ // 如果表单验证通过
        this.$bvModal.show('bv-modal-scheme-new');
      }
    },
    submitScheme: async function(){
      let info = await this.$axios.post('addScheme', this.form);
      if (info) {
        this.$store.commit("setSchemeNum",info.data.id); //更新菜单项生成新的Scheme，注意$store.state.scheme_num需要绑定到layout的index.vue的sidebar组件的key上，才能实现当key变化时刷新sidebar组件的功能
        await this.$router.push('/scheme/' + info.data.id + "/overview");
      }
    },
  },
}
</script>

<style scoped>
.el-card {
  min-height: 630px;
}
</style>
