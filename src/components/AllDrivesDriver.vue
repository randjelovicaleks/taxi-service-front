<template>
  <div>
    <NavBar />
    <div class="container pt-5 col-8">
      <mdb-tooltip material trigger="hover" :options="{placement: 'bottom'}">
        <span slot="tip">Drive by app is with note, but drive by phone is without note</span>
        <mdb-card slot="reference" class="shadow">
          <h4 class="card-header indigo white-text text-center py-3">My drives</h4>
          <mdb-card-body>
            <p v-if="drives.length < 1" class="text-center">No drives</p>
            <mdb-tbl v-else>
              <mdb-tbl-head>
                <tr>
                  <th class="font-weight-bold text-center">Starting address</th>
                  <th class="font-weight-bold text-center">Order date and time</th>
                  <th class="font-weight-bold text-center">Customer</th>
                  <th class="font-weight-bold text-center">Note</th>
                  <th class="font-weight-bold text-center">Price</th>
                  <th class="font-weight-bold text-center">Options</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body v-if="drives.length > 1">
                <tr v-for="drive in drives" :key="drive.id">
                  <td class="text-center font-modifier">{{drive.startingAddress}}</td>
                  <td class="text-center font-modifier">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center font-modifier" v-if="drive.customerDTO != null">{{drive.customerDTO.name + ' ' + drive.customerDTO.surname}}</td>
                  <td class="text-center font-modifier" v-else>{{drive.customerName}}</td>
                  <td class="text-center font-modifier" v-if="drive.note != null">{{drive.note}}</td>
                  <td class="text-center font-modifier" v-else>Drive has no note</td>
                  <td class="text-center font-modifier">{{drive.price}}</td>
                  <td class="text-center font-modifier" v-if="drive.price === 0">
                    <mdb-btn
                      type="button"
                      color="indigo dark py-2 px-3 pz-2 rounded text-white"
                      size="md"
                      icon="plus"
                      @click="openModal(drive.id)"
                    >Add kilometers</mdb-btn>
                  </td>
                  <td class="text-center" v-else>Price for drive is calculated</td>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
          </mdb-card-body>
        </mdb-card>
      </mdb-tooltip>
    </div>
    <mdb-modal :show="adding" @close="closeModal">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h3" class="w-100">Add kilometers</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-row>
          <mdb-col>
            <mdb-label>Kilometers</mdb-label>
            <mdb-input v-model="kilometers" class="mb-5" type="number" />
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="save" color="indigo dark text-white">
          <mdb-icon icon="paper-plane" /> Send
        </mdb-btn>
      </mdb-modal-footer>
       <mdb-alert
          v-if="showAlert"
          @closeAlert="showAlert=false"
          dismiss
          color="danger"
          class="mt-3"
        >You need to enter kilometers.</mdb-alert>
    </mdb-modal>
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
  mdbTooltip,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbInput,
  mdbModalFooter,
  mdbLabel,
  mdbModalTitle,
  mdbIcon,
  mdbCol,
  mdbRow,
  mdbAlert
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
    NavBar,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbInput,
    mdbModalFooter,
    mdbLabel,
    mdbModalTitle,
    mdbIcon,
    mdbCol,
    mdbRow,
    mdbAlert
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drives: [],
      drive: {
        startingAddress: '',
        orderDate: null,
        note: '',
        price: 0
      },
      adding: false,
      idDrive: '',
      kilometers: 0,
      showAlert: false,
    };
  },
  created() {
    axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/drive/driver/" + this.token.id).then(response => {
      this.drives = response.data;
    });
  },
  methods: {
    openModal: function(id) {
      this.adding = true;
      this.idDrive = id;
    },
    closeModal: function() {
      this.adding = false;
    },
    save: function() {

      if (this.kilometers === '' || this.kilometers < 0) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios.put(baseUrl + "/driver/calculate/price/" + this.token.id + "/" + this.idDrive + "/" + this.kilometers)
        .then(() => {
          this.closeModal();
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
.removeDecoration {
  text-decoration: none;
  color: rgb(17, 16, 16);
  font-family: "Raleway", sans-serif;
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