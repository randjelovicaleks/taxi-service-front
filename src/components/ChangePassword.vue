<template>
  <div>
    <NavBar />
    <div class="mt-5">
      <mdb-card class="col-4 mx-auto padding-reset shadow">
        <mdb-card-header class="pt-2" dark color="indigo">
          <mdb-card-title class="pt-3 text-center">Change password</mdb-card-title>
        </mdb-card-header>
        <mdb-card-body>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="oldPassword" label="Old password" icon="unlock" type="password" />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="newPassword" label="New password" icon="lock" type="password" />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input
                v-model="confirmingNewPassword"
                type="password"
                label="Confirm new password"
                icon="exclamation-triangle"
              />
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <mdb-card-footer class="white d-flex justify-content-end">
          <mdb-btn color="indigo dark text-white" icon="paper-plane" @click="save" rounded>Send</mdb-btn>
        </mdb-card-footer>
        <mdb-alert
          v-if="showAlert"
          @closeAlert="showAlert=false"
          dismiss
          :color="colorAlert"
        >{{textAlert}}</mdb-alert>
      </mdb-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import {
  mdbRow,
  mdbCol,
  mdbInput,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardTitle,
  mdbCardFooter,
  mdbAlert
} from "mdbvue";

const baseUrl = "http://localhost:8080/api/user";

export default {
  name: "ChangePassword",
  components: {
    NavBar,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardTitle,
    mdbCardFooter,
    mdbAlert
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      oldPassword: '',
      newPassword: '',
      confirmingNewPassword: '',
      showAlert: false,
      textAlert: '',
      colorAlert: ''
    };
  },
  methods: {
    save: function() {
      if (this.newPassword != this.confirmingNewPassword) {
        this.colorAlert = "danger";
        this.textAlert = "Passwords do not match.";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
        return;
      }

      if (this.oldPassword === '' || this.newPassword === '' || this.confirmingNewPassword === '') {
        this.colorAlert = "danger";
        this.textAlert = "You need to enter all fields.";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .post(baseUrl + "/password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(() => {
          this.colorAlert = "success";
          this.textAlert = "You successfully changed your password.";
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          this.clearAll();
        });
    },
    clearAll: function() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmingNewPassword = '';
    }
  }
};
</script>

<style scoped>

.padding-reset {
  padding: 0;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}

</style>