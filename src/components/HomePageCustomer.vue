<template>
  <div>
    <NavBar />
    <mdb-row class="mt-5 overflow-fix">
      <mdb-card class="col-4 padding-reset mx-auto shadow">
      <mdb-card-header dark color="indigo">
        <mdb-card-title class="pt-3 text-center">Reserve drive</mdb-card-title>
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
        <mdb-alert
          v-if="showAlertAdd"
          @closeAlert="showAlertAdd=false"
          dismiss
          color="danger"
        >{{textAlertAdd}}</mdb-alert>
      </mdb-card>

      <mdb-card class="col-6 padding-reset mx-auto shadow">
        <h4 class="card-header indigo white-text text-center py-4">All my drives</h4>
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
                <td class="text-center font-modifier">{{drive.startingAddress}}</td>
                <td class="text-center font-modifier">{{new Date(drive.orderDate).toLocaleString()}}</td>
                <td class="text-center font-modifier" v-if="drive.note != ''">{{drive.note}}</td>
                <td class="text-center font-modifier" v-else>Drive does not have note</td>
                <td class="text-center font-modifier">
                  <mdb-btn
                    type="button"
                    color="indigo dark py-2 px-3 pz-2 rounded text-white"
                    size="md"
                    icon="edit"
                    @click="openEditModal(drive)"
                  >Edit</mdb-btn>
                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>
    <!--Modal for editing drive-->
    <mdb-modal :show="editing" @close="closeModal">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h3" class="w-100 font-weight-bold">
          Edit drive
          <mdb-icon icon="taxi" size="lg" />
        </mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-row>
          <mdb-col>
            <mdb-input v-model="orderDateEdit" icon="calendar" class="mb-5" type="datetime-local"/>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-input
              v-model="driveEdit.startingAddress"
              icon="map-marker-alt"
              type="text"
              class="mb-5"
            />
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-input v-model="driveEdit.note" icon="pen" :rows="2" class="mb-5" type="textarea" />
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="edit" color="indigo dark text-white">
          <mdb-icon icon="paper-plane" />Send
        </mdb-btn>
      </mdb-modal-footer>
       <mdb-alert
          v-if="showAlertEdit"
          @closeAlert="showAlertEdit=false"
          dismiss
          color="danger"
        >{{textAlertEdit}}</mdb-alert>
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
  mdbAlert
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
    mdbAlert,
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      drives: [],
      drive: {},
      startingAddress: '',
      orderDate: null,
      note: '',
      orderDateEdit: null,
      driveEdit: {},
      editing: false,
      showAlertEdit: false,
      showAlertAdd: false,
      textAlertAdd: '',
      textAlertEdit: '',
    };
  },
  created() {
    axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/drive/customer/" + this.token.id).then(response => {
      this.drives = response.data;
    });
  },
  methods: {
    save: function() {

      if (this.startingAddress === '' || this.orderDate == null) {
        this.showAlertAdd = true;
        this.textAlertAdd = 'You need to enter starting address and order date';
        setTimeout(() => {
          this.showAlertAdd = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .post(baseUrl + "/customer/create/" + this.token.id, {
          startingAddress: this.startingAddress,
          orderDate: this.orderDate,
          note: this.note
        })
        .then(() => {
          location.reload();
        }).catch(() => {
          this.showAlertAdd = true;
          this.textAlertAdd = 'You need to enter valid order date';
          setTimeout(() => {
            this.showAlertAdd = false;
          }, 3500);
        })
    },
    openEditModal: function(drive) {
      this.driveEdit = drive;
      this.editing = true;
    },
    closeModal: function() {
      this.editing = false;
    },
    edit: function() {
      if (this.driveEdit.startingAddress === '' || this.orderDateEdit == null) {
        this.showAlertEdit = true;
        this.textAlertEdit = 'You need to enter starting address and order date'
        setTimeout(() => {
          this.showAlertEdit = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .put(baseUrl + "/customer/update/drive/" + this.token.id, {
          id: this.driveEdit.id,
          startingAddress: this.driveEdit.startingAddress,
          orderDate: this.orderDateEdit,
          note: this.driveEdit.note
        })
        .then(() => {
          this.closeModal();
          location.reload();
        }).catch(() => {
          this.showAlertEdit = true;
          this.textAlertEdit = 'You need to enter valid order date'
          setTimeout(() => {
            this.showAlertEdit = false;
          }, 3500);
        })
    }
  }
};
</script>

<style scoped>
.padding-reset {
  padding: 0;
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