<template>
  <div>
    <NavBar />
    <div class="container pt-5 col-8">
      <mdb-card class="shadow">
        <h4 class="card-header indigo white-text text-center py-3">All customers</h4>
        <mdb-card-body>
          <mdb-tbl>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Name</th>
                <th class="font-weight-bold text-center">Surname</th>
                <th class="font-weight-bold text-center">Username</th>
                <th class="font-weight-bold text-center">Address</th>
                <th class="font-weight-bold text-center">Phone number</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="customer in customers" :key="customer.id">
                  <td class="text-center font-modifier">{{customer.name}}</td>
                  <td class="text-center font-modifier">{{customer.surname}}</td>
                  <td class="text-center font-modifier">{{customer.username}}</td>
                  <td class="text-center font-modifier">{{customer.address}}</td>
                  <td class="text-center font-modifier">{{customer.phoneNumber}}</td>
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

    axios.get(baseUrl).then((response) => {
      this.customers = response.data;
    });
  },
};
</script>

<style scoped>
.font-modifier {
  font-size: 0.9rem;
  font-weight: 350;
}

.removeDecoration {
    text-decoration: none;
    color: rgb(17, 16, 16);
    font-family: 'Raleway', sans-serif;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}
</style>