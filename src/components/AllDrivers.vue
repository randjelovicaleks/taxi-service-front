<template>
  <div>
    <NavBar />
    <div class="container pt-5">
      <mdb-card >
        <h4 class="card-header indigo white-text font-weight-bold text-uppercase py-3">All drivers</h4>
        <mdb-tooltip material trigger="hover" :options="{placement: 'right'}">
          <span slot="tip">Add new driver</span>
          <!--Modal for adding driver-->

          <mdb-btn type="button" slot="reference" color="indigo dark" class="py-2 px-3 pz-2 rounded col-1" size="sm" icon="plus" @click.native="adding = true"></mdb-btn>
          <mdb-modal :show="adding" @close="adding = false">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h3" class="w-100 font-weight-bold">Add new driver</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driver.name" label="Name" icon="address-card" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="driver.surname" label="Surname" icon="address-card" far type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driver.username" label="Username" icon="user" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="driver.address" label="Address" icon="map-marker-alt" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driver.phoneNumber" label="Phone number" icon="phone" class="mb-5" type="text"/>
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="driver.taxiCardNumber" label="Taxi card number" icon="taxi" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driver.salary" label="Salary" icon="money-check-alt" type="text" class="mb-5"/>
                </mdb-col>
                <mdb-col>
                  <mdb-label >Choose a vehicle</mdb-label>
                  <select class="browser-default custom-select mt-3 " v-model="idVehicle">
                    <option v-for="v in vehicles" :key="v.id" v-value="v.id">{{v.vehicleNumber}}</option>
                  </select>
              </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="add" color="indigo dark"><mdb-icon icon="paper-plane" /> Send</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>
        </mdb-tooltip>
        <mdb-card-body>
          <!--Tabel for all drivers-->
          <mdb-tbl>
            <mdb-tbl-head>
              <tr>
                <th class="font-weight-bold text-center">Name</th>
                <th class="font-weight-bold text-center">Surname</th>
                <th class="font-weight-bold text-center">Username</th>
                <th class="font-weight-bold text-center">Address</th>
                <th class="font-weight-bold text-center">Phone number</th>
                <th class="font-weight-bold text-center">Taxi card number</th>
                <th class="font-weight-bold text-center">Salary</th>
                <th class="font-weight-bold text-center" colspan="2">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="driver in drivers" :key="driver.id">
                  <td class="text-center">{{driver.name}}</td>
                  <td class="text-center">{{driver.surname}}</td>
                  <td class="text-center">{{driver.username}}</td>
                  <td class="text-center">{{driver.address}}</td>
                  <td class="text-center">{{driver.phoneNumber}}</td>
                  <td class="text-center">{{driver.taxiCardNumber}}</td>
                  <td class="text-center">{{driver.salary}}</td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded" size="md" icon="edit" @click="openEditModal(driver)">Edit</mdb-btn>
                  </td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded" size="md" icon="trash" @click="remove(driver.id)">Delete</mdb-btn>
                  </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
      <!--Modal for editing driver-->
      <mdb-modal :show="editing" @close="closeModal">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h3" class="w-100 font-weight-bold">Edit driver</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driverEdit.name" icon="address-card" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="driverEdit.surname" icon="address-card" far type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="driverEdit.address" icon="map-marker-alt" type="text" class="mb-5"/>
                </mdb-col>
                 <mdb-col>
                  <mdb-input v-model="driverEdit.phoneNumber" icon="phone" class="mb-5" type="text"/>
                </mdb-col>
              </mdb-row>
              <mdb-row> 
                <mdb-col>
                  <mdb-input v-model="driverEdit.taxiCardNumber" icon="taxi" type="text" class="mb-5"/>
                </mdb-col>
                 <mdb-col>
                  <mdb-input v-model="driverEdit.salary" icon="money-check-alt" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="edit" color="indigo dark"><mdb-icon icon="paper-plane" /> Send</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>
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
      mdbTooltip,
      mdbModal,
      mdbModalHeader,
      mdbModalBody,
      mdbInput,
      mdbModalFooter,
      mdbRow,
      mdbCol,
      mdbLabel,
      mdbIcon,
    } from "mdbvue"; 

const baseUrl = 'http://localhost:8080/api';

export default {
  name: "AllDrivers",
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
      mdbLabel,
      mdbIcon,
      NavBar,
  },
  data() {
    return {
      drivers: [],
      driver: {
          name: '',
          surname: '',
          username: '',
          address: '',
          phoneNumber: '',
          taxiCardNumber: '',
          salary: '',
      },
      token: JSON.parse(sessionStorage.getItem("token")),
      adding: false,
      idVehicle: '',
      vehicles: [],
      driverEdit: {},
      editing: false,
    }
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + '/driver').then((response) => {
      this.drivers = response.data;
    });

    axios.get(baseUrl + '/vehicle/without/driver')
        .then((response) => {
          this.vehicles = response.data;
        });

  },
  methods: {
    /*  remove: function(id) {
          axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;
          axios.delete(baseUrl + '/delete/' + id)
          .then(() => {
              location.reload();
          });
      }*/
      add: function() {
        axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

        axios.post(baseUrl + '/dispatcher/create/driver/' + this.idVehicle, {
            name: this.driver.name,
            surname: this.driver.surname,
            username: this.driver.username,
            address: this.driver.address,
            phoneNumber: this.driver.phoneNumber,
            taxiCardNumber: this.driver.taxiCardNumber,
            salary: this.driver.salary
        }).then(() => {
          this.adding = false;
          location.reload();
        })
      },
      openEditModal: function(driver) {
          this.editing = true;
          this.driverEdit = driver;
      },
      closeModal: function() {
        this.editing = false;
        location.reload();
      },
      edit: function() {
          axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

          axios.put(baseUrl + '/driver/update', {
            id: this.driverEdit.id,
            name: this.driverEdit.name,
            surname: this.driverEdit.surname,
            address: this.driverEdit.address,
            phoneNumber: this.driverEdit.phoneNumber,
            taxiCardNumber: this.driverEdit.taxiCardNumber,
            salary: this.driverEdit.salary
          }).then(() => {
            this.editing = false; 
          })
      }
     
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