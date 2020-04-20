<template>
    <div>
   <NavBar/>
   <div class="mt-5 col-4">
  <mdb-card>
    <mdb-card-header class="pt-2" dark color="indigo">
      <mdb-card-title class="pt-3"><strong>Reserve drive</strong></mdb-card-title>
    </mdb-card-header>
    <mdb-card-body>
      <mdb-row>
        <mdb-col>
          <mdb-input v-model="startingAddress" label="Starting address" icon="map-marker-alt"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-input v-model="orderDate" icon="calendar" type="date"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-input icon="clock" type="time"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-input v-model="note" type="textarea" label="Note" icon="pen" :rows="2"/>
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
    <mdb-card-footer class="white d-flex justify-content-end">
      <mdb-btn color="indigo dark text-white" icon="paper-plane" @click="save()" rounded>Send</mdb-btn>
    </mdb-card-footer>
  </mdb-card>
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
} from "mdbvue";

const baseUrl = "http://localhost:8080/api/customer";

export default {
    name: 'HomePageCustomer',
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
    },
    data() {
        return {
            token: JSON.parse(sessionStorage.getItem("token")),
            drive: {},
            startingAddress: '',
            orderDate: null,
            note: '',
        }
    },
    methods: {
        save: function() {
          axios.defaults.headers["Authorization"] = `Bearer ${this.token.accessToken}`;

          axios.post(baseUrl + '/create/' + this.token.id, {
            startingAddress: this.startingAddress,
            orderDate: this.orderDate,
            note: this.note
          }).then(() => {
            console.log("Voznja je uspesno kreirana");
          })

        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

</style>