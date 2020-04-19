<template>
  <div>
    <NavBar />
    <div class="mt-5 container col-6">
      <mdb-card class="d-flex justify-content-center">
        <mdb-card-header class="pt-2" dark color="indigo">
          <mdb-card-title class="pt-3">
            <strong>About you</strong>
          </mdb-card-title>
        </mdb-card-header>
        <mdb-card-body>
          <mdb-row>
            <mdb-col>
              <mdb-input
                v-model="customer.name"
                type="text"
                :disabled="editable"
                icon="address-card"
              />
            </mdb-col>
            <mdb-col>
              <mdb-input
                v-model="customer.surname"
                type="text"
                :disabled="editable"
                icon="address-card"
                far
              />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input
                v-model="customer.address"
                type="text"
                :disabled="editable"
                icon="map-marker-alt"
              />
            </mdb-col>
            <mdb-col>
              <mdb-input
                v-model="customer.phoneNumber"
                type="text"
                :disabled="editable"
                icon="phone"
              />
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <mdb-card-footer class="white d-flex justify-content-end">
          <mdb-btn v-if="editable" dark color="indigo" icon="edit" far rounded @click="edit">Edit</mdb-btn>
          <mdb-btn
            v-if="!editable"
            dark
            color="indigo"
            icon="paper-plane"
            far
            rounded
            @click="save(customer)"
          >Send</mdb-btn>
        </mdb-card-footer>
        <mdb-alert v-if="showAlert" @closeAlert="showAlert=false" dismiss color="success">You successfully edit your info.</mdb-alert>
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
	mdbAlert,
} from "mdbvue";

const baseUrl = "http://localhost:8080/api/customer";

export default {
  name: "CustomerProfile",
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
		mdbAlert,
  },
  data() {
    return {
      customer: {
        name: '',
        surname: '',
        address: '',
        phoneNumber: ''
      },
      token: JSON.parse(sessionStorage.getItem("token")),
			editable: true,
			showAlert: false,
    };
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/" + this.token.id).then(response => {
      this.customer = response.data;
    });
  },
  methods: {
    edit: function() {
      this.editable = false;
    },
    save: function(customer) {
      axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

      axios
        .put(baseUrl + "/update", {
          id: this.token.id,
          name: customer.name,
          surname: customer.surname,
          address: customer.address,
          phoneNumber: customer.phoneNumber
        })
        .then(response => {
					customer = response.data;
					this.showAlert = true;
          setTimeout(() => {this.showAlert = false;}, 3500);
          this.editable = true;
        })
        .catch(() => {
          this.editable = true;
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

.position {
  margin-left: 50%;
  position: relative;
}
</style>