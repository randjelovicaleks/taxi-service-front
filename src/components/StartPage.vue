<template>
  <div class="mt-5">
    <div class="text-center buttons">
      <div class="row d-flex justify-content-center">
        <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a col-1 mr-5"><router-link class="removeDecoration" to="/login">  Sign in</router-link></mdb-btn>
        <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a col-1"><router-link class="removeDecoration" to="/signup">  Sign up</router-link></mdb-btn>
      </div>
    </div>    
     <div class="image"></div>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";

export default {
  name: "StartPage",
  components: {
    mdbBtn
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');

.image {
  overflow: hidden;
  background-image: url("../assets/background.jpg");
  height: 500px;
  width: 700px;

  margin-left: 50%;
  margin-top: 5%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.buttons {
  position: relative;
}

.removeDecoration {
  text-decoration: none;
  color: #fff;
  font-family: 'Raleway', sans-serif;
}
</style>
