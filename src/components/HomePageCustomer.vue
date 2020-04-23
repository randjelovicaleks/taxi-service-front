<template>
  <div>
    <NavBar />
    <div class="row mt-5">
      <mdb-card class="col-4 mx-auto">
        <mdb-card-header class="pt-2" dark color="indigo">
          <mdb-card-title class="pt-3 text-center">
            <strong>Reserve drive</strong>
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
              <mdb-input v-model="note" type="textarea" label="Note" icon="pen" :rows="2" />
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <mdb-card-footer class="white d-flex justify-content-end">
          <mdb-btn color="indigo dark text-white" icon="paper-plane" @click="save()" rounded>Send</mdb-btn>
        </mdb-card-footer>
      </mdb-card>
  
      <mdb-card class="col-6 mx-auto">
        <h4 class="card-header indigo white-text text-center font-weight-bold py-4">All my drives</h4>
        <mdb-card-body>
          <p v-if="drives.length < 1" class="text-center">No drives</p>
          <mdb-tbl v-else>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Starting address</th>
                <th class="font-weight-bold text-center">Order date and time</th>
                <th class="font-weight-bold text-center">Note</th>
                <th class="font-weight-bold text-center">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="drive in drives" :key="drive.id">
                  <td class="text-center">{{drive.startingAddress}}</td>
                  <td class="text-center">{{new Date(drive.orderDate).toLocaleString()}}</td>
                  <td class="text-center">{{drive.note}}</td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded text-white" size="md" icon="edit" @click="openEditModal(drive)">Edit</mdb-btn>
                  </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </div>
    <!--Modal for editing drive-->
     <mdb-modal :show="editing" @close="closeModal">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h3" class="w-100 font-weight-bold">Edit drive <mdb-icon icon="taxi" size="lg" /></mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="orderDateEdit" icon="calendar"  class="mb-5" type="datetime-local"  />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driveEdit.startingAddress" icon="map-marker-alt" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driveEdit.note" icon="pen" :rows="2" class="mb-5" type="textarea" />
                </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="edit" color="indigo dark text-white"><mdb-icon icon="paper-plane" /> Send</mdb-btn>
            </mdb-modal-footer>
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
  mdbModalBody,
  mdbModalFooter,
  mdbIcon,
} from "mdbvue";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "HomePageCustomer",
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
    mdbModalBody,
    mdbModalFooter,
    mdbIcon,
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drives: [],
      drive: {},
      startingAddress: "",
      orderDate: null,
      note: "",
      driveEdit: {},
      editing: false,
      orderDateEdit: null,
    };
  },
  created() {
     axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

     axios.get(baseUrl + '/drive/customer/' + this.token.id)
     .then((response) => {
       this.drives = response.data;
     })
  },
  methods: {
    save: function() {
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
    },
    openEditModal: function(drive) {
      this.driveEdit = drive;
      this.editing = true;
      this.orderDateEdit = new Date(drive.orderDate).toLocaleString();
    },
    closeModal: function() {
      this.editing = false;
    },
    edit: function() {
      axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

      axios.put(baseUrl + '/customer/update/drive/' + this.token.id, {
        id: this.driveEdit.id,
        startingAddress: this.driveEdit.startingAddress,
        orderDate: this.orderDateEdit,
        note: this.driveEdit.note,
      }).then(() => {
        this.closeModal();
        location.reload();
      })
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");
</style>