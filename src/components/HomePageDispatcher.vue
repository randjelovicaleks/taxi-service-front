<template>
  <div>
    <NavBar />
    <div class="row mt-5">
      <mdb-card class="col-4 mx-auto">
        <mdb-card-header class="pt-2" dark color="indigo">
          <mdb-card-title class="pt-3">
            <strong>Add drive</strong>
          </mdb-card-title>
        </mdb-card-header>
        <mdb-card-body>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="startingAddress" label="Starting address" icon="map-marker-alt" />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="orderDate" icon="calendar" type="datetime-local" />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="customerName" type="text" label="Customer name" icon="user" />
            </mdb-col>
          </mdb-row>
           <mdb-row>
            <mdb-col>
               <mdb-label >Choose the driver</mdb-label>
                <select class="browser-default custom-select mt-3 " v-model="idDriver">
                  <option v-for="d in drivers" :key="d.id" v-value="d.id">{{d.name + ' ' + d.surname}}</option>
                </select>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <mdb-card-footer class="white d-flex justify-content-end">
          <mdb-btn color="indigo dark text-white" icon="paper-plane" @click="save()" rounded>Send</mdb-btn>
        </mdb-card-footer>
      </mdb-card>
      
      <b-tabs content-class="mt-3" class="col-7 mx-auto">
        <!--Drives by phone-->
        <b-tab title="Drives by phone" active>  
          <p v-if="drivesByPhone.length < 1" class="text-center">No drives</p>     
          <mdb-tbl v-else>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Starting address</th>
                <th class="font-weight-bold text-center">Order date and time</th>
                <th class="font-weight-bold text-center">Customer</th>
                <th class="font-weight-bold text-center">Driver</th>
                <th class="font-weight-bold text-center">Dispatcher</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="drive in drivesByPhone" :key="drive.id">
                  <td class="text-center">{{drive.startingAddress}}</td>
                  <td class="text-center">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center">{{drive.customerName}}</td>
                  <td class="text-center">{{drive.driverDTO.name + ' ' + drive.driverDTO.surname}}</td>
                  <td class="text-center">{{drive.dispatcherDTO.name + ' ' + drive.dispatcherDTO.surname}}</td>                 
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>      
        </b-tab>
        <!--Drives by app-->
        <b-tab title="Drives by app">
          <p v-if="drivesByApp.length < 1" class="text-center">No drives</p>
          <mdb-tbl v-else>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Starting address</th>
                <th class="font-weight-bold text-center">Order date and time</th>
                <th class="font-weight-bold text-center">Customer</th>
                <th class="font-weight-bold text-center">Driver</th>
                <th class="font-weight-bold text-center">Note</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="drive in drivesByApp" :key="drive.id">
                  <td class="text-center">{{drive.startingAddress}}</td>
                  <td class="text-center">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center">{{drive.customerDTO.name + ' ' + drive.customerDTO.surname}}</td>
                  <td class="text-center">{{drive.driverDTO.name + ' ' + drive.driverDTO.surname}}</td>
                  <td class="text-center">{{drive.note}}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>    
        </b-tab>
      </b-tabs>
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
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbLabel,
} from "mdbvue";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "HomePageDispatcher",
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
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbLabel,
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drivers: [],
      driver: {},
      drive: {},
      drivesByPhone:[],
      drivesByApp:[],
      startingAddress: "",
      orderDate: null,
      customerName: '',
      idDriver: '',
    };
  },
  created() {
     axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

     axios.get(baseUrl + '/drive/all/app')
     .then((response) => {
       this.drivesByApp = response.data;
     })

     axios.get(baseUrl + '/drive/all/phone')
     .then((response) => {
       this.drivesByPhone = response.data;
     })
  },
  methods: {
    /*save: function() {
      axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

      axios.post(baseUrl + '/customer/create/' + this.token.id, {
          startingAddress: this.startingAddress,
          orderDate: this.orderDate,
          note: this.note
        })
        .then(() => {
          console.log("Voznja je uspesno kreirana");
          location.reload();
        });
    },*/
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");
</style>