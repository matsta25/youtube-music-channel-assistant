<template>
  <div class="home">
    <h2 class="title">ymca - youtube music channel assistant</h2>
    <div class="container">
      <img class="background" src="../assets/ymcaBackground.svg">
        <div class="centered-element">
        <img class="logo" src="../assets/logo.svg"> 
        </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: "home",
  mounted() {
    var time = Math.random();
    console.log("time"+ time);
    let Layer_2 = this.$el.querySelector('#Layer_2');
    Layer_2.style.setProperty('--animation-time', time +'s');

    console.log("Layer_2"+ Layer_2);
  }
};
</script>

<style lang="scss">
  .title{
    padding: 5px 0;
  }
@media only screen and (max-width: 768px) {
  
  .background{
    opacity: 0;
  }
}

.container {
  position: relative;
}

.centered-element {
  height: 230px;
  width: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -115px;
}

</style>
