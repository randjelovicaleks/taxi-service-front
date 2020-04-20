<template>
  <div>
    <NavBar />
    <div class="container pt-5">
      <mdb-card >
        <h4 class="card-header indigo white-text text-center font-weight-bold text-uppercase py-3">All drives</h4>
        <mdb-card-body>
          <mdb-tbl>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Starting address</th>
                <th class="font-weight-bold text-center">Order date and time</th>
                <th class="font-weight-bold text-center">Customer</th>
                <th class="font-weight-bold text-center">Note</th>
                <th class="font-weight-bold text-center">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="drive in drives" :key="drive.id">
                  <td class="text-center">{{drive.startingAddress}}</td>
                  <td class="text-center">{{drive.orderDate}}</td>
                  <td class="text-center">cao</td>
                  <td class="text-center">{{drive.note}}</td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded text-white" size="md" icon="taxi" @click="takeDrive(drive.id)">Take a drive</mdb-btn>
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

const baseUrl = 'http://localhost:8080/api';

export default {
  name: "HomePageDriver",
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
     token: JSON.parse(sessionStorage.getItem("token")),
      drives: [],
      drive: {
          startingAddress: '',
          orderDate: null,
          note: '',
         // customer: {
         //     name: '',
         //     surname: '',
         // }
      },
    }
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + '/drive/all/without/driver').then((response) => {
      this.drives = response.data;
    });
  },
  methods: {
     
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