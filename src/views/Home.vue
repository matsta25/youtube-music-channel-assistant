<template>
  <div class="home">
    <h2 class="title">ymca - youtube music channel assistant</h2>
    <div class="container my-5">
      <img class="background" src="../assets/ymcaBackground.svg">
      <div class="centered-element">
        <img class="logo" src="../assets/logo.svg">
      </div>
    </div>

    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
      voluptatem sit officiis cupiditate quidem perferendis nobis minima animi
      modi quos repudiandae fugiat dignissimos, in praesentium ab, fuga itaque
      laborum pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Dolores voluptatem sit officiis cupiditate quidem perferendis nobis
      minima animi modi quos repudiandae fugiat dignissimos, in praesentium ab,
      fuga itaque laborum pariatur.
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.title {
  padding: 5px 0;
}
@media only screen and (max-width: 768px) {
  .background {
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
