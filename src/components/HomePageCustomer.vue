<template>
    <div>
   <NavBar/>
   <div class="mt-5 container col-5">
  <mdb-card>
    <mdb-card-header class="pt-2" dark color="indigo">
      <mdb-card-title class="pt-3"><strong>Reserve drive</strong></mdb-card-title>
    </mdb-card-header>
    <mdb-card-body>
      <mdb-row>
        <mdb-col>
          <mdb-input label="Starting address" icon="map-marker-alt"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-date-picker label="Date" icon="calendar"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-time-picker label="Time" icon="clock"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-input type="textarea" label="Note" icon="pen" :rows="2"/>
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
    <mdb-card-footer class="white d-flex justify-content-end">
      <mdb-btn color="indigo dark" icon="paper-plane" rounded>Send</mdb-btn>
    </mdb-card-footer>
  </mdb-card>
  </div>
   </div>
</template>

<script>
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
  mdbDatePicker,
  mdbTimePicker,
} from "mdbvue";
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
        mdbDatePicker,
        mdbTimePicker,
    },
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");

</style>