<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/personalHome">
            <span class="menu-title">Home Page</span>
            <i class="mdi mdi-home menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item" v-for="(scheme,index) in schemes" :key="scheme.id">
          <span class="nav-link" v-b-toggle="scheme.code" >
<!--          <span class="nav-link"-->
<!--                :aria-expanded="'true'"-->
<!--                :aria-controls="''+scheme.code"-->
<!--          >-->
            <span class="menu-title">Scheme {{ scheme.code }}</span>
            <i class="menu-arrow"></i>
            <i :class="[arrow,index%2==0?'mdi-clipboard-text':'mdi-clipboard-text-outline']"></i>
          </span>
          <!--          id里不能有空格-->
<!--          <b-collapse accordion="sidebar-accordion" :id="scheme.code" v-model="test">-->
            <b-collapse accordion="sidebar-accordion" :id="scheme.code">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link overview" :to="'/scheme/'+scheme.id+'/overview'">Overview</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link deposit" :to="'/scheme/'+scheme.id+'/deposit'">Deposit</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link withdraw" :to="'/scheme/'+scheme.id+'/withdraw'">Withdraw</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link trade" :to="'/scheme/'+scheme.id+'/trade'">Trade</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link invest" :to="'/scheme/'+scheme.id+'/invest'">Invest</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>


<!--        <li class="nav-item" v-on:click="collapseAll">-->
<!--          <router-link class="nav-link" to="/dashboard">-->
<!--            <span class="menu-title">Dashboard</span>-->
<!--            <i class="mdi mdi-chart-areaspline menu-icon"></i>-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <span class="nav-link" v-b-toggle="'ui-basic'">-->
<!--            <span class="menu-title">Basic UI Elements</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--            <i class="mdi mdi-crosshairs-gps menu-icon"></i>-->
<!--          </span>-->
<!--          <b-collapse accordion="sidebar-accordion" id="ui-basic">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/basic-ui/buttons/">Buttons</router-link>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/basic-ui/dropdowns/">Dropdowns</router-link>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/basic-ui/typography/">Typography</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </b-collapse>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <span class="nav-link" v-b-toggle="'charts-dropdown'">-->
<!--            <span class="menu-title">Charts</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--            <i class="mdi mdi-chart-bar menu-icon"></i>-->
<!--          </span>-->
<!--          <b-collapse accordion="sidebar-accordion" id="charts-dropdown">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/charts/chartjs/">Chart js</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </b-collapse>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <span class="nav-link" v-b-toggle="'table-dropdown'">-->
<!--            <span class="menu-title">Tables</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--            <i class="mdi mdi-table-large menu-icon"></i>-->
<!--          </span>-->
<!--          <b-collapse accordion="sidebar-accordion" id="table-dropdown">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/tables/basic-tables/">Basic Table</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </b-collapse>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <span class="nav-link" v-b-toggle="'icons-dropdown'">-->
<!--            <span class="menu-title">Icons</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--            <i class="mdi mdi-contacts menu-icon"></i>-->
<!--          </span>-->
<!--          <b-collapse accordion="sidebar-accordion" id="icons-dropdown">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link" to="/icons/mdi-icons/">MDI</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </b-collapse>-->
<!--        </li>-->
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'sidebar',
  async created() {
    let info = await this.$axios.get("getSchemeMenu");
    for(let index in info.data.schemes){
      info.data.schemes[index].code = String.fromCharCode(65+parseInt(index));
    }
    this.schemes = info.data.schemes;
    this.$store.commit("setSchemeNum",info.data.schemes.length);
  },
  updated(){ //在得到菜单数据之后，即数据更新之后，展开对应的菜单
    this.setActive();
  },
  data() {
    return {
      schemes:[],
      arrow:"mdi menu-icon menu_icon",
      path:this.$route.path,
    }
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
    setActive(){
      if(this.$route.params.id){//如果id参数存在
        for(let item of this.schemes){
          if(item.id == this.$route.params.id){ // 1=='1' true  1==='1' false 0==''==false true
            let node = document.getElementById(item.code);
            if(!node.classList.contains('show')){ //如果没有展开就展开它
              this.$root.$emit("bv::toggle::collapse",item.code); //展开对应方案的下拉菜单
            }
            break;
          }
        }
      }
    }
  },
  mounted() {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    });
  },
  watch: {
    $route() {
      if (document.querySelector('#sidebar').classList.contains('active')){
        document.querySelector('#sidebar').classList.toggle('active'); //手机端控制，如果菜单弹出来就隐藏
      }

      this.setActive(); // 对应菜单展开
    }
  },
}
</script>
<style lang="scss">
/*.menu-icon{*/
/*  color: #bec5ff !important;*/
/*}*/
.nav-item {
  color: black !important;
}

.nav-link {
  font-size: 0.85rem !important;

  &:before {
    font-size: 0.85rem !important;
  }
}

.overview:before {
  content: '\F127' !important;
}

.deposit:before {
  content: '\F028C' !important;
}

.withdraw:before {
  content: '\FA9B' !important;
}

.trade:before {
  content: '\F584' !important;
}

.invest:before {
  content: '\F812' !important;
}
</style>
