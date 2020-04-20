<template>
  <div>
    <NavBar />
    <div class="container pt-5">
      <mdb-card >
        <h4 class="card-header indigo white-text text-center font-weight-bold text-uppercase py-3">All customers</h4>
        <mdb-card-body>
          <mdb-tbl>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Name</th>
                <th class="font-weight-bold text-center">Surname</th>
                <th class="font-weight-bold text-center">Username</th>
                <th class="font-weight-bold text-center">Address</th>
                <th class="font-weight-bold text-center">Phone number</th>
                <th class="font-weight-bold text-center">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="customer in customers" :key="customer.id">
                  <td class="text-center">{{customer.name}}</td>
                  <td class="text-center">{{customer.surname}}</td>
                  <td class="text-center">{{customer.username}}</td>
                  <td class="text-center">{{customer.address}}</td>
                  <td class="text-center">{{customer.phoneNumber}}</td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded text-white" size="md" icon="trash" @click="remove(customer.id)">Delete</mdb-btn>
                  </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import {
      mdbCard,
      mdbCardBody,
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbBtn,
    } from "mdbvue"; 

const baseUrl = 'http://localhost:8080/api/customer';

export default {
  name: "AllCustomers",
  components: {
      mdbCard,
      mdbCardBody,
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbBtn,
      NavBar,
  },
  data() {
    return {
      customers: [],
      customer: {
          name: '',
          surname: '',
          username: '',
          address: '',
          phoneNumber: ''
      },
      token: JSON.parse(sessionStorage.getItem("token")),
    }
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + '/all').then((response) => {
      this.customers = response.data;
    });
  },
  methods: {
      remove: function(id) {
          axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;
          axios.delete(baseUrl + '/delete/' + id)
          .then(() => {
              location.reload();
          });
      }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

.removeDecoration {
    text-decoration: none;
    color: rgb(17, 16, 16);
    font-family: 'Raleway', sans-serif;
}
</style>