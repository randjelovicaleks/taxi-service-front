<template>
  <div class="form-elegant">
    <mdb-row class="d-flex justify-content-center marginTop responsive">
      <mdb-col md="4" >
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5"><strong>Sign in</strong></h3>
            </div>
            <mdb-input label="Your username" type="text" icon="user"/>
            <mdb-input label="Your password" type="password" containerClass="mb-0" icon="lock" />
            <div class="text-center mb-3">
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a">Sign in</mdb-btn>
            </div>
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Not a member? <router-link to="/signup">  Sign up</router-link></p>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>


<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbModalFooter } from 'mdbvue';

export default {
    name: 'LoginPage',
    components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      mdbInput,
      mdbBtn,
      mdbModalFooter
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
</style>
