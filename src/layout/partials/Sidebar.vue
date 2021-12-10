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
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'scheme1'">
            <span class="menu-title">Scheme 1</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-clipboard-text menu-icon menu_icon"></i>
          </span>
          <!--          id里不能有空格-->
          <b-collapse accordion="sidebar-accordion" id="scheme1">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link overview" to="/scheme/1/overview">Overview</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link deposit" to="/scheme/1/deposit">Deposit</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link withdraw" to="/scheme/1/withdraw">Withdraw</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link trade" to="/scheme/1/trade">Trade</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link invest" to="/scheme/1/invest">Invest Plan</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>


        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/dashboard">
            <span class="menu-title">Dashboard</span>
            <i class="mdi mdi-chart-areaspline menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'ui-basic'">
            <span class="menu-title">Basic UI Elements</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-crosshairs-gps menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="ui-basic">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/basic-ui/buttons/">Buttons</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/basic-ui/dropdowns/">Dropdowns</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/basic-ui/typography/">Typography</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'charts-dropdown'">
            <span class="menu-title">Charts</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-chart-bar menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="charts-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/charts/chartjs/">Chart js</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'table-dropdown'">
            <span class="menu-title">Tables</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-table-large menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="table-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/tables/basic-tables/">Basic Table</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'icons-dropdown'">
            <span class="menu-title">Icons</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-contacts menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="icons-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/icons/mdi-icons/">MDI</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      collapses: [
        {show: false},
        {show: false},
        {show: false}
      ]
    }
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
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
    })
  },
  watch: {
    $route() {
      document.querySelector('#sidebar').classList.toggle('active');
    }
  }
}
</script>
<style lang="scss">
/*.menu-icon{*/
/*  color: #bec5ff !important;*/
/*}*/
.nav-item{
  color:black!important;
}
.nav-link{
  font-size: 0.85rem!important;
  &:before{
    font-size:0.85rem!important;
  }
}
.overview:before{
    content: '\F127'!important;
}
.deposit:before{
  content: '\F028C'!important;
}
.withdraw:before{
  content: '\FA9B'!important;
}
.trade:before{
  content: '\F584'!important;
}
.invest:before{
  content: '\F812'!important;
}
</style>
