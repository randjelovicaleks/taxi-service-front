<template>
  <div class="form-elegant">
    <mdb-row class="d-flex justify-content-center mt-2">
      <mdb-col md="4">
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5"><strong>Sign up</strong></h3>
            </div>
            <mdb-input v-model="name" label="Your name" type="text" icon="address-card"/>
            <mdb-input v-model="surname" label="Your surname" type="text" containerClass="mb-0" icon="address-card" far />
            <mdb-input v-model="username" label="Your username" type="text" icon="user"/>
            <mdb-input v-model="password" label="Your password" type="password" containerClass="mb-0" icon="lock" />
            <mdb-input v-model="confirmingPassword" label="Confirm your password" type="password" containerClass="mb-0" icon="exclamation-triangle" />
            <mdb-input v-model="address" label="Your address" type="text" containerClass="mb-0" icon="map-marker-alt" />
            <mdb-input v-model="phoneNumber" label="Your phone number" type="text" icon="phone"/>
            <div class="text-center mb-3">
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a" @click="signup">Sign up</mdb-btn>
            </div>
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Already member?  <router-link to="/login">  Sign in</router-link></p>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbModalFooter } from 'mdbvue';
import axios from 'axios'

export default {
    name: 'RegistrationPage',
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
        name: '',
        surname: '',
        username: '',
        password: '',
        confirmingPassword: '',
        address: '',
        phoneNumber: '',
        customer: null
      };
    },
    methods: {
      signup: function() {
          if (this.password != this.confirmingPassword) {
            console.log("Lozinke se ne poklapaju")
            return;
          }

          axios.post('http://localhost:8080/auth/registration', {
              name: this.name,
              surname: this.surname,
              username: this.username,
              password: this.password,
              address: this.address,
              phoneNumber: this.phoneNumber
          }).then(data => {this.customer = data.customer; // Kad stigne odgovor od servera preuzmi objekat
                this.$router.push('login')
          })
      }
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

</style>