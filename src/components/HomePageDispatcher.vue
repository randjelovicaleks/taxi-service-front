<template>
  <div>
    <NavBar />
    <div class="row mt-5">
      <mdb-card class="col-4 padding-reset mx-auto shadow">
        <mdb-card-header class="pt-2" dark color="indigo">
          <mdb-card-title class="pt-3 text-center">
            <strong>Add drive</strong>
          </mdb-card-title>
        </mdb-card-header>
        <mdb-card-body>
          <mdb-row>
            <mdb-col>
              <mdb-input
                v-model="driveForReserve.startingAddress"
                label="Starting address"
                icon="map-marker-alt"
              />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input v-model="driveForReserve.orderDate" icon="calendar" type="datetime-local" />
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col>
              <mdb-input
                v-model="driveForReserve.customerName"
                type="text"
                label="Customer name"
                icon="user"
              />
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <mdb-card-footer class="white d-flex justify-content-end">
          <mdb-btn
            color="indigo dark text-white"
            icon="angle-right"
            @click="openModal(driveForReserve)"
            rounded
          >Next</mdb-btn>
        </mdb-card-footer>
         <mdb-alert
          v-if="showAlertCard"
          @closeAlert="showAlertCard=false"
          dismiss
          color="danger"
          class="mt-3"
        >You need to enter all fileds</mdb-alert>
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
                <th class="font-weight-bold text-center">Price</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="drive in drivesByPhone" :key="drive.id">
                <td class="text-center">{{drive.startingAddress}}</td>
                <td class="text-center">{{new Date(drive.orderDate).toLocaleString()}}</td>
                <td class="text-center">{{drive.customerName}}</td>
                <td class="text-center">{{drive.driverDTO.name + ' ' + drive.driverDTO.surname}}</td>
                <td
                  class="text-center"
                >{{drive.dispatcherDTO.name + ' ' + drive.dispatcherDTO.surname}}</td>
                <td class="text-center" v-if="drive.price != 0">{{drive.price}}</td>
                <td class="text-center" v-else>Driver has not entered kilometers yet</td>
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
    <!--Modal for choosing free driver-->
    <mdb-modal :show="choosing" @close="closeModal">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h3" class="w-100 font-weight-bold">Choose free driver</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-row>
          <mdb-col>
            <select class="browser-default custom-select mt-3" v-model="idDriver">
              <option v-for="d in drivers" :key="d.id" :value="d.id">{{d.name + ' ' + d.surname}}</option>
            </select>
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="send" color="indigo dark text-white">
          <mdb-icon icon="paper-plane" />Send
        </mdb-btn>
      </mdb-modal-footer>
       <mdb-alert
          v-if="showAlertModal"
          @closeAlert="showAlertModal=false"
          dismiss
          color="danger"
          class="mt-3"
        >You need to choose driver</mdb-alert>
    </mdb-modal>
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
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbIcon,
  mdbAlert,
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
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbIcon,
    mdbAlert
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drivers: [],
      driver: {},
      drive: {},
      drivesByPhone: [],
      drivesByApp: [],
      choosing: false,
      driveForReserve: {
        startingAddress: '',
        orderDate: null,
        customerName: ''
      },
      idDriver: '',
      freeDate: null,
      showAlertCard: false,
      showAlertModal: false,
    };
  },
  created() {
    axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/drive/all/app").then(response => {
      this.drivesByApp = response.data;
    });

    axios.get(baseUrl + "/drive/all/phone").then(response => {
      this.drivesByPhone = response.data;
    });
  },
  methods: {
    closeModal: function() {
      this.choosing = false;
    },
    openModal: function(driveForReserve) {
      if (driveForReserve.startingAddress === '' || driveForReserve.orderDate === null || driveForReserve.customerName === '') {
        this.showAlertCard = true;
        setTimeout(() => {
          this.showAlertCard = false;
        }, 3500);
        return;
      }
      this.choosing = true;

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .post(baseUrl + "/dispatcher/find/free/drivers", {
          freeDate: driveForReserve.orderDate
        })
        .then(response => {
          this.drivers = response.data;
        });
    },
    send: function() {
      if (this.idDriver === '') {
        this.showAlertModal = true;
        setTimeout(() => {
          this.showAlertModal = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .post(
          baseUrl + "/dispatcher/create/" + this.token.id + "/" + this.idDriver,
          {
            startingAddress: this.driveForReserve.startingAddress,
            orderDate: this.driveForReserve.orderDate,
            customerName: this.driveForReserve.customerName
          }
        )
        .then(() => {
          this.closeModal();
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

.padding-reset {
  padding: 0;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}
</style>