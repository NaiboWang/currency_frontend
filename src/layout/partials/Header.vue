<template>
  <b-navbar id="template-header" class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
            toggleable="lg">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/">
        <img src="@/assets/images/logo.png" alt="logo" class="logo_home"/>
      </router-link>
      <router-link class="navbar-brand brand-logo-mini" to="/">
        <img src="@/assets/images/logo_mini.png" alt="logo" class="logo_home_mini"/>
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto">
      <b-navbar-nav class="navbar-nav-right ml-auto">
        <b-nav-item-dropdown right class="nav-profile">
          <template slot="button-content">
            <span class="nav-link dropdown-toggle" id="profileDropdown" href="javascript:void(0);"
                  data-toggle="dropdown" aria-expanded="false">
              <div class="nav-profile-img">
                <img :src="staticURL+'pics/'+$store.state.userInfo.profile" alt="image">

                <!--                <span class="availability-status online"></span>-->
              </div>
              <div class="nav-profile-text">
                <p class="mb-1 text-black">{{ $store.state.userInfo.nickname }}</p>
              </div>
            </span>
          </template>
          <b-dropdown-item class="preview-item" @click="$router.push('/basicInfo').catch(err => {})">
            <i class="mdi mdi-account mr-2 text-info"></i> Basic Info
          </b-dropdown-item>
          <b-dropdown-item class="preview-item" @click="$router.push('/changePassword').catch(err => {})">
            <i class="mdi mdi-cached mr-2 text-info"></i> Change Password
          </b-dropdown-item>
          <b-dropdown-item class="preview-item" @click="logout">
            <i class="mdi mdi-logout mr-2 text-info menu_link"></i> Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
      <button class="navbar-toggler navbar-toggler-right align-self-center" type="button"
              @click="toggleMobileSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
import getIdentity from "../../store/userInfo";

export default {
  name: 'app-header',
  methods: {
    toggleSidebar: () => {
      document.querySelector('body').classList.toggle('sidebar-icon-only');
    },
    toggleMobileSidebar: () => {
      document.querySelector('#sidebar').classList.toggle('active');
    },
    logout: async function () {
      await this.$axios.get("logout");
      await this.$router.push("/login");
    },
  }
}
</script>

<style lang="less" scoped>
.logo_home {
  width: 222px !important;
  height: 27px !important;
}

.logo_home_mini {
  height: 30px !important;
  width: 30px !important;
}

.menu_link {
  text-decoration: none;
  color: black;

  i {
    margin-right: 0.5rem !important;
  }
}
</style>
