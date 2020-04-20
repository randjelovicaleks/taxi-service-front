<template>
  <mdb-navbar expand="large" dark color="indigo">
    <mdb-navbar-brand class="removeDecoration font-weight-bold" icon="taxi"><b>Blue Taxi</b></mdb-navbar-brand>
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
          <router-link to="/dispatcher/profile" class="removeDecoration">Profile</router-link>
        </mdb-nav-item>
        <mdb-dropdown tag="li" class="nav-item" v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Users</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
              <mdb-dropdown-item >
                <router-link to="/dispatcher/all/customers">Customers</router-link>
              </mdb-dropdown-item>
              <mdb-dropdown-item>
                <router-link to="/dispatcher/all/drivers">Drivers</router-link>
              </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DISPATCHER'">
          <router-link to="/dispatcher/all/vehicles" class="removeDecoration">Vehicles</router-link>
        </mdb-nav-item>
      
        <!--Items for driver-->
        <mdb-nav-item v-if="token.role.authority == 'ROLE_DRIVER'">
          <router-link to="/driver/profile" class="removeDecoration">Profile</router-link>
        </mdb-nav-item>

        <!--Logout item is for everyone -->
        <mdb-nav-item>
          <router-link to="/login" class="removeDecoration" @click="logout">Log out</router-link>
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
        mdbDropdown,
        mdbDropdownToggle,
        mdbDropdownMenu,
        mdbDropdownItem } 
      from 'mdbvue';

export default {
    name: 'NavBar',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbDropdown,
      mdbDropdownToggle,
      mdbDropdownMenu,
      mdbDropdownItem

    },
    data() {
        return {
            token: JSON.parse(sessionStorage.getItem('token')),
        }
    },
    methods: {
        logout: function() {
            sessionStorage.removeItem('token');
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');

.removeDecoration {
    text-decoration: none;
    color: #fff;
    font-family: 'Raleway', sans-serif;
}

</style>