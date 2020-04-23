<template>
  <div class="mt-5">
    <div class="text-center">
      <div class="row d-flex justify-content-center">
        <mdb-btn type="button" color="indigo dark" rounded class="col-1 mr-3"><router-link class="removeDecoration" to="/login">  Sign in</router-link></mdb-btn>
        <mdb-btn type="button" color="indigo dark" rounded class="col-1"><router-link class="removeDecoration" to="/signup">  Sign up</router-link></mdb-btn>
      </div>
    </div>  
    <div class="row">
      <p class="col-4 textDecoration font-weight-bold d-flex justify-content-center m-auto">
         Welcome to the... <br> 
         Blue Taxi <br>
         021/565-888
      </p>
      <div class="image col-6 mx-auto"></div>
    </div>  
  </div>
</template>

<script>
import { mdbBtn,  } from "mdbvue";

export default {
  name: "StartPage",
  components: {
    mdbBtn,
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico|Raleway&display=swap');

.image {
  overflow: hidden;
  background-image: url("../assets/background.png");
  height: 500px;
  width: 700px;

  margin-left: 50%;
  margin-top: 5%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.removeDecoration {
  text-decoration: none;
  color: #fff;
  font-family: 'Raleway', sans-serif;
}

.textDecoration {
  font-family: 'Pacifico', cursive;
  font-size: 50px !important;
  color: #3949ab;
}

</style>
