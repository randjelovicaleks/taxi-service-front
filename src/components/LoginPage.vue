<template>
  <div class="form-elegant">
    <mdb-row class="d-flex justify-content-center marginTop responsive">
      <mdb-col md="4">
        <mdb-card class="shadow">
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5">
                <strong>Sign in</strong>
              </h3>
            </div>
            <mdb-input v-model="username" label="Your username" type="text" icon="user" />
            <mdb-input
              v-model="password"
              label="Your password"
              type="password"
              containerClass="mb-0"
              icon="lock"
            />
            <div class="text-center mb-3">
              <mdb-btn
                type="button"
                color="indigo dark text-white"
                rounded
                class="btn-block"
                @click="login"
              >Sign in</mdb-btn>
            </div>
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font grey-text d-flex justify-content-end">
              Not a member?<router-link to="/signup">Sign up</router-link>
            </p>
          </mdb-modal-footer>
        </mdb-card>
        <mdb-alert
          v-if="showAlert"
          @closeAlert="showAlert=false"
          dismiss
          color="danger"
          class="mt-3"
        >Username or password are incorrect.</mdb-alert>
      </mdb-col>
    </mdb-row>
  </div>
</template>


<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbInput,
  mdbBtn,
  mdbModalFooter,
  mdbAlert
} from "mdbvue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbModalFooter,
    mdbAlert
  },
  data() {
    return {
      username: '',
      password: '',
      token: null,
      showAlert: false
    };
  },
  methods: {
    login: function() {
      axios
        .post("http://localhost:8080/auth/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.token = response.data;
          sessionStorage.setItem("token", JSON.stringify(this.token));
          this.checkRole(this.token);
        })
        .catch(() => {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
        });
    },
    checkRole: function(token) {
      if (token.role.authority == "ROLE_CUSTOMER") {
        this.$router.push("/customer/home");
      } else if (token.role.authority == "ROLE_DRIVER") {
        this.$router.push("/driver/home");
      } else if (token.role.authority == "ROLE_DISPATCHER") {
        this.$router.push("/dispatcher/home");
      }
    }
  }
};
</script>

<style scoped>
.form-elegant .font {
  font-size: 1rem;
}
.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}

.marginTop {
  margin-top: 10%;
}
</style>
