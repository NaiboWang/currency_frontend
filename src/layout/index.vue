<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header/>
      <div class="container-fluid page-body-wrapper">
        <Sidebar/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div> <!-- content wrapper ends -->
          <Footer/>
        </div> <!-- main panel ends -->
      </div> <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
  import Header from "./partials/Header";
  import Sidebar from "./partials/Sidebar";
  import Footer from "./partials/Footer";
  import getIdentity from "../store/userInfo";
  export default {
    name: "layout",
    async created() { //注意生命周期，父组件的mounted是在子组件mounted之后执行的，所以这里要用created
      await this.getIdentity();
    },
    components: {
      Header,
      Sidebar,
      Footer
    },
    methods: {
      toggleSidebar: () => {
        document.querySelector('body').classList.toggle('sidebar-icon-only');
      },
      toggleMobileSidebar: () => {
        document.querySelector('#sidebar').classList.toggle('active');
      },
      getIdentity: async function () {
        let userInfo = await getIdentity();
        if (userInfo.role == "guest") {
          this.$message.error('Sorry, you have not logged in or you are not authorised user!');
          await this.$router.push("/login");
        }
      },
      logout: async function () {
        await this.$axios.get("logout");
        await this.$router.push("/login");
      },
    }
  }
</script>



