<template>
  <div>
    <NavBar />
    <div class="container pt-5">
      <mdb-card >
        <h4 class="card-header indigo white-text text-center font-weight-bold text-uppercase py-3">All vehicles</h4>
        <mdb-tooltip material trigger="hover" :options="{placement: 'right'}">
          <span slot="tip">Add new vehicle</span>
          <!--Modal for adding vehicle-->

          <mdb-btn type="button" slot="reference" color="indigo dark text-white" class="py-2 px-3 pz-2 rounded col-1" size="sm" icon="plus" @click.native="adding = true"></mdb-btn>
          <mdb-modal :show="adding" @close="adding = false">
            <mdb-modal-header class="text-center">
              <mdb-modal-title tag="h3" class="w-100 font-weight-bold">Add new vehicle <mdb-icon icon="taxi" size="lg" /></mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="mx-3 grey-text">
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="vehicle.model" label="Model" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="vehicle.manufacturer" label="Manufacturer" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="vehicle.firstRegistration" label="First registration" class="mb-5" type="text" />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="vehicle.registrationNumber" label="Registartion number" type="text" class="mb-5"/>
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="vehicle.vehicleNumber" label="Vehicle number" class="mb-5" type="text"/>
                </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center>
              <mdb-btn @click.native="add" color="indigo dark text-white"><mdb-icon icon="paper-plane" /> Send</mdb-btn>
            </mdb-modal-footer>
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
                <th class="font-weight-bold text-center" colspan="2">Options</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr v-for="vehicle in vehicles" :key="vehicle.id">
                  <td class="text-center">{{vehicle.model}}</td>
                  <td class="text-center">{{vehicle.manufacturer}}</td>
                  <td class="text-center">{{vehicle.firstRegistration}}</td>
                  <td class="text-center">{{vehicle.registrationNumber}}</td>
                  <td class="text-center">{{vehicle.vehicleNumber}}</td>
                  <td class="text-center" v-if="vehicle.driver === undefined">Vehicle has no driver</td> 
                  <td class="text-center" v-else>{{vehicle.driver.name}}</td> 
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded text-white" size="md" icon="edit" @click="openEditModal">Edit</mdb-btn>
                  </td>
                  <td class="text-center">
                    <mdb-btn type="button" color="indigo dark py-2 px-3 pz-2 rounded text-white" size="md" icon="trash" @click="remove(vehicle.id)">Delete</mdb-btn>
                  </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </div>
    <!--Modal for editing vehicle-->
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
      mdbIcon,
    } from "mdbvue"; 

const baseUrl = 'http://localhost:8080/api';

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
      NavBar,
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
          vehicleNumber: '',         
      },
      driver: {
        name: '',
        surname: '',
      },     
      adding: false,
      editing: false,
    }
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

    axios.get(baseUrl + '/vehicle').then((response) => {
      this.vehicles = response.data;
      console.log(this.vehicles);
    });
  },
  methods: {
     /* remove: function(id) {
          axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;
          axios.delete(baseUrl + '/delete/' + id)
          .then(() => {
              location.reload();
          });
      }*/
      openEditModal: function() {
        this.editing = true;
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