<template>
  <div class="form-elegant">
    <mdb-row class="d-flex justify-content-center marginTop responsive">
      <mdb-col md="4" >
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h1 class="blue-bold-text mb-5"><strong>Blue Taxi</strong></h1>
            </div>
            <mdb-input label="Dunvska 2, Novi Sad" class="disabled" icon="map-marker-alt"/>
            <mdb-input label="021/563579" class="disabled" containerClass="mb-0" icon="phone" />
            <div class="text-center mt-3 row d-flex justify-content-center">
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a col-5 mr-5"></mdb-btn>
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a col-5"><router-link class="removeDecoration" to="/signup">  Sign up</router-link></mdb-btn>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbBtn, mdbInput } from 'mdbvue';

export default {
    name: 'LoginPage',
    components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      mdbBtn,
      mdbInput
    },
    data() {
      return {
        
      };
    }
}
</script>

<style scoped>
  .form-elegant .font-small {
    font-size: 0.8rem; }

  .form-elegant .z-depth-1a {
    -webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
    box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); }

  .form-elegant .z-depth-1-half,
  .form-elegant .btn:hover {
    -webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
    box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); }

    .marginTop {
        margin-top: 10%;
    }

    .removeDecoration {
        text-decoration: none;
        color: #fff;
    }
</style>
