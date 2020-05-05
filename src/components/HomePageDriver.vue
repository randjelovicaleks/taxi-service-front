<template>
  <div>
    <NavBar />
    <div class="container pt-5 col-8">
      <mdb-card class="shadow">
        <h4 class="card-header indigo white-text text-center py-3">All drives without driver</h4>
        <mdb-card-body>
          <p v-if="drives.length < 1" class="text-center">No drives</p>
          <mdb-tbl v-else>
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
                  <td class="text-center font-modifier">{{drive.startingAddress}}</td>
                  <td class="text-center font-modifier">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center font-modifier">{{drive.customerDTO.name + ' ' + drive.customerDTO.surname}}</td>
                  <td class="text-center font-modifier" v-if="drive.note != ''">{{drive.note}}</td>
                  <td class="text-center font-modifier" v-else>Drive does not have note</td>
                  <td class="text-center font-modifier">
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
     takeDrive: function(idDrive) {
        axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

        axios.put(baseUrl + '/driver/take/drive/' + idDrive + '/' +this.token.id, {
            id: this.drive.id,
        }).then(() => {
          location.reload();
        })
     }
  }
};
</script>

<style scoped>
.removeDecoration {
    text-decoration: none;
    color: rgb(17, 16, 16);
    font-family: 'Raleway', sans-serif;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}

.font-modifier {
  font-size: 0.9rem;
  font-weight: 350;
}
</style>