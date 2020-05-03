<template>
  <div>
    <NavBar />
    <div class="container pt-5 col-8">
      <mdb-card class="shadow">
        <h4 class="card-header indigo white-text text-center font-weight-bold py-3">All vehicles</h4>
        <mdb-tooltip material trigger="hover" :options="{placement: 'right'}">
          <span slot="tip">Add new vehicle</span>
          <!--Modal for adding vehicle-->

          <mdb-btn
            type="button"
            slot="reference"
            color="indigo dark text-white"
            class="py-2 px-3 pz-2 rounded col-1"
            size="sm"
            icon="plus"
            @click.native="adding = true"
          ></mdb-btn>
          <mdb-modal :show="adding" @close="closeModalAdd">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h3" class="w-100 font-weight-bold">
                Add new vehicle
                <mdb-icon icon="taxi" size="lg" />
              </mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="vehicle.model" label="Model" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input
                    v-model="vehicle.manufacturer"
                    label="Manufacturer"
                    type="text"
                    class="mb-5"
                  />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input
                    v-model="vehicle.firstRegistration"
                    label="First registration"
                    class="mb-5"
                    type="text"
                  />
                </mdb-col>
                <mdb-col>
                  <mdb-input
                    v-model="vehicle.registrationNumber"
                    label="Registartion number"
                    type="text"
                    class="mb-5"
                  />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input
                    v-model="vehicle.vehicleNumber"
                    label="Vehicle number"
                    class="mb-5"
                    type="text"
                  />
                </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="add" color="indigo dark text-white">
                <mdb-icon icon="paper-plane" /> Send
              </mdb-btn>
            </mdb-modal-footer>
            <mdb-alert
              v-if="showAlertAdd"
              @closeAlert="showAlertAdd=false"
              dismiss
              color="danger"
              class="mt-3"
            >You need to enter all fields</mdb-alert>
          </mdb-modal>
        </mdb-tooltip>
        <mdb-card-body>
          <mdb-tbl>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Model</th>
                <th class="font-weight-bold text-center">Manufacturer</th>
                <th class="font-weight-bold text-center">First registration</th>
                <th class="font-weight-bold text-center">Registartion number</th>
                <th class="font-weight-bold text-center">Vehicle number</th>
                <th class="font-weight-bold text-center">Driver</th>
                <th class="font-weight-bold text-center">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="vehicle in vehicles" :key="vehicle.id">
                <td class="text-center font-fix">{{vehicle.model}}</td>
                <td class="text-center">{{vehicle.manufacturer}}</td>
                <td class="text-center">{{vehicle.firstRegistration}}</td>
                <td class="text-center">{{vehicle.registrationNumber}}</td>
                <td class="text-center">{{vehicle.vehicleNumber}}</td>
                <td class="text-center" v-if="vehicle.driverDTO === null">Vehicle has no driver</td>
                <td
                  class="text-center"
                  v-else
                >{{vehicle.driverDTO.name + ' ' + vehicle.driverDTO.surname}}</td>
                <td class="text-center">
                  <mdb-btn
                    type="button"
                    color="indigo dark py-2 px-3 pz-2 rounded text-white"
                    size="md"
                    icon="edit"
                    @click="openEditModal(vehicle)"
                  >Edit</mdb-btn>
                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </div>
    <!--Modal for editing vehicle-->
    <mdb-modal :show="editing" @close="closeModalEdit">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h3" class="w-100 font-weight-bold">
          Edit vehicle
          <mdb-icon icon="taxi" size="lg" />
        </mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-row>
          <mdb-col>
            <mdb-label>Model</mdb-label>
            <mdb-input v-model="vehicleEdit.model" class="mb-5" type="text" />
          </mdb-col>
          <mdb-col>
            <mdb-label>Manufacturer</mdb-label>
            <mdb-input v-model="vehicleEdit.manufacturer" type="text" class="mb-5" />
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-label>First registration</mdb-label>
            <mdb-input v-model="vehicleEdit.firstRegistration" class="mb-5" type="text" />
          </mdb-col>
          <mdb-col>
            <mdb-label>Registration number</mdb-label>
            <mdb-input v-model="vehicleEdit.registrationNumber" type="text" class="mb-5" />
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-label>Vehicle number</mdb-label>
            <mdb-input v-model="vehicleEdit.vehicleNumber" class="mb-5" type="text" />
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="edit" color="indigo dark text-white">
          <mdb-icon icon="paper-plane" /> Send
        </mdb-btn>
      </mdb-modal-footer>
      <mdb-alert
          v-if="showAlertEdit"
          @closeAlert="showAlertEdit=false"
          dismiss
          color="danger"
          class="mt-3"
        >You need to enter all fields</mdb-alert>
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
  mdbBtn,
  mdbTooltip,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbInput,
  mdbModalFooter,
  mdbRow,
  mdbCol,
  mdbIcon,
  mdbAlert
} from "mdbvue";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "AllVehicles",
  components: {
    mdbCard,
    mdbCardBody,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn,
    mdbTooltip,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbInput,
    mdbModalFooter,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbAlert,
    NavBar
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      vehicles: [],
      vehicle: {
        model: '',
        manufacturer: '',
        firstRegistration: '',
        registrationNumber: '',
        vehicleNumber: ''
      },
      adding: false,
      editing: false,
      vehicleEdit: {},
      showAlertAdd: false,
      showAlertEdit: false,
    };
  },
  created() {
    axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + "/vehicle").then(response => {
      this.vehicles = response.data;
    });
  },
  methods: {
    closeModalAdd: function() {
      this.vehicle.model = '';
      this.vehicle.manufacturer = '';
      this.vehicle.firstRegistration = '';
      this.vehicle.registrationNumber = '';
      this.vehicle.vehicleNumber = '';
      this.adding = false;
    },
    add: function() {

      if (this.vehicle.model === '' || this.vehicle.manufacturer === '' || this.vehicle.firstRegistration === '' ||
      this.vehicle.registrationNumber === '' || this.vehicle.vehicleNumber === '') {
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .post(baseUrl + "/vehicle/create", {
          model: this.vehicle.model,
          manufacturer: this.vehicle.manufacturer,
          firstRegistration: this.vehicle.firstRegistration,
          registrationNumber: this.vehicle.registrationNumber,
          vehicleNumber: this.vehicle.vehicleNumber
        })
        .then(() => {
          this.closeModalAdd();
          location.reload();
        });
    },
    openEditModal: function(vehicle) {
      //copying values from vehicle object to vehicleEdit object
      this.vehicleEdit = {...vehicle};
      this.editing = true;
    },
    closeModalEdit: function() {
      this.editing = false;
    },
    edit: function() {

      if (this.vehicleEdit.model === '' || this.vehicleEdit.manufacturer === '' || this.vehicleEdit.firstRegistration === '' ||
      this.vehicleEdit.registrationNumber === '' || this.vehicleEdit.vehicleNumber === '') {
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
        }, 3500);
        return;
      }

      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${this.token.accessToken}`;

      axios
        .put(baseUrl + "/vehicle/update", {
          id: this.vehicleEdit.id,
          model: this.vehicleEdit.model,
          manufacturer: this.vehicleEdit.manufacturer,
          firstRegistration: this.vehicleEdit.firstRegistration,
          registrationNumber: this.vehicleEdit.registrationNumber,
          vehicleNumber: this.vehicleEdit.vehicleNumber
        })
        .then(() => {
          this.closeModalEdit();
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap");

.removeDecoration {
  text-decoration: none;
  color: rgb(17, 16, 16);
  font-family: "Raleway", sans-serif;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px; 
}
</style>