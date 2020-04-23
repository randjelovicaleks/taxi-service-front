<template>
  <div>
    <NavBar />
    <div class="container pt-5 col-8">
      <mdb-tooltip material trigger="hover" :options="{placement: 'bottom'}">
        <span slot="tip">Drive by app is with note, but drive by phone is without note</span>
        <mdb-card slot="reference">
          <h4 class="card-header indigo white-text text-center font-weight-bold py-3">My drives</h4>
          <mdb-card-body>
            <p v-if="drives.length < 1" class="text-center">No drives</p>
            <mdb-tbl v-else>
              <mdb-tbl-head>
                <tr>
                  <th class="font-weight-bold text-center">Starting address</th>
                  <th class="font-weight-bold text-center">Order date and time</th>
                  <th class="font-weight-bold text-center">Customer</th>
                  <th class="font-weight-bold text-center">Note</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body v-if="drives.length > 1">
                <tr v-for="drive in drives" :key="drive.id">
                  <td class="text-center">{{drive.startingAddress}}</td>
                  <td class="text-center">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center" v-if="drive.customerDTO != null">{{drive.customerDTO.name + ' ' + drive.customerDTO.surname}}</td>
                  <td class="text-center" v-else>{{drive.customerName}}</td>
                  <td class="text-center" v-if="drive.note != null">{{drive.note}}</td>
                  <td class="text-center" v-else>Drive has no note</td>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
          </mdb-card-body>
        </mdb-card>
      </mdb-tooltip>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import {
  mdbCard,
  mdbCardBody,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbTooltip
} from "mdbvue";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "AllDrivesDriver",
  components: {
    mdbCard,
    mdbCardBody,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbTooltip,
    NavBar
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drives: [],
      drive: {
        startingAddress: "",
        orderDate: null,
        note: ""
      }
    };
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/drive/driver/" + this.token.id).then(response => {
      this.drives = response.data;
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

.removeDecoration {
  text-decoration: none;
  color: rgb(17, 16, 16);
  font-family: "Raleway", sans-serif;
}
</style>