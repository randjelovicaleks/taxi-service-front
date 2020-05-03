<template>
  <div class="form-elegant">
    <mdb-row class="d-flex justify-content-center mt-2">
      <mdb-col md="4">
         <mdb-alert
          v-if="showAlert"
          @closeAlert="showAlert=false"
          dismiss
          color="danger"
          class="mt-3"
        >{{textAlert}}</mdb-alert>
        <mdb-card class="shadow">
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5">
                <strong>Sign up</strong>
              </h3>
            </div>
            <mdb-input v-model="name" label="Your name" type="text" icon="address-card" />
            <mdb-input
              v-model="surname"
              label="Your surname"
              type="text"
              containerClass="mb-0"
              icon="address-card"
              far
            />
            <mdb-input v-model="username" label="Your username" type="text" icon="user" />
            <mdb-input
              v-model="password"
              label="Your password"
              type="password"
              containerClass="mb-0"
              icon="lock"
            />
            <mdb-input
              v-model="confirmingPassword"
              label="Confirm your password"
              type="password"
              containerClass="mb-0"
              icon="exclamation-triangle"
            />
            <mdb-input
              v-model="address"
              label="Your address"
              type="text"
              containerClass="mb-0"
              icon="map-marker-alt"
            />
            <mdb-input v-model="phoneNumber" label="Your phone number" type="text" icon="phone" />
            <div class="text-center mb-3">
              <mdb-btn
                type="button"
                color="indigo dark text-white"
                rounded
                class="btn-block"
                @click="signup"
              >Sign up</mdb-btn>
            </div>
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font grey-text d-flex justify-content-end">
              Already a member?
              <router-link to="/login">Sign in</router-link>
            </p>
          </mdb-modal-footer>
        </mdb-card>
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
  mdbAlert,
} from "mdbvue";
import axios from "axios";

export default {
  name: "RegistrationPage",
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbModalFooter,
    mdbAlert,
  },
  data() {
    return {
      name: '',
      surname: '',
      username: '',
      password: '',
      confirmingPassword: '',
      address: '',
      phoneNumber: '',
      customer: null,
      showAlert: false,
      textAlert: '',
    };
  },
  methods: {
    signup: function() {
      if (this.password != this.confirmingPassword) {
        this.textAlert = "Passwords do not match"
        this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          return;
      }

      if (this.name === '' || this.surname === '' || this.username === '' || this.password === '' || this.confirmingPassword === '' ||
      this.address === '' || this.phoneNumber === '') {
          this.textAlert = "You need to enter all fields"
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          return;
      }

      axios
        .post("http://localhost:8080/auth/registration", {
          name: this.name,
          surname: this.surname,
          username: this.username,
          password: this.password,
          address: this.address,
          phoneNumber: this.phoneNumber
        })
        .then(data => {
          this.customer = data.customer; 
          this.$router.push("login");
        })
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
</style>