<template>
  <mdb-navbar expand="large" dark color="indigo">
    <mdb-navbar-brand class="font-weight-bold logo" icon="taxi">
      <b>Blue Taxi Service</b>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <!--Items for customer-->
        <mdb-nav-item v-if="token.role.authority == 'ROLE_CUSTOMER'">
          <router-link to="/customer/home" class="removeDecoration">Home page</router-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_CUSTOMER'">
          <router-link to="/customer/profile" class="removeDecoration">Profile</router-link>
        </mdb-nav-item>

        <!--Items for dispatcher/admin-->
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/home" class="removeDecoration">Home page</router-link>
        </mdb-nav-item>

        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/all/customers" class="removeDecoration">Customers</router-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/all/drivers" class="removeDecoration">Drivers</router-link>
        </mdb-nav-item>

        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/all/vehicles" class="removeDecoration">Vehicles</router-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/profile" class="removeDecoration">Profile</router-link>
        </mdb-nav-item>

        <!--Items for driver-->
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DRIVER'">
          <router-link to="/driver/home" class="removeDecoration">Home page</router-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DRIVER'">
          <router-link to="/driver/drives" class="removeDecoration">Drives</router-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DRIVER'">
          <router-link to="/driver/profile" class="removeDecoration">Profile</router-link>
        </mdb-nav-item>

        <!--Items for everyone -->
        <mdb-nav-item>
          <router-link to="/change/password" class="removeDecoration">Change password</router-link>
        </mdb-nav-item>
        <mdb-nav-item>
          <router-link to="/" class="removeDecoration" @click="logout">Log out</router-link>
        </mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
} from "mdbvue";

export default {
  name: "NavBar",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token"))
    };
  },
  methods: {
    logout: function() {
      sessionStorage.removeItem("token");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway&display=swap");

.removeDecoration {
  text-decoration: none;
  color: #fff;
  font-family: "-apple-system", sans-serif;
}

.logo {
  font-family: "Pacifico", cursive;
}
</style>