<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

    <header-component></header-component>
    <main-component></main-component>

    <background></background>
  </div>
</template>


<style lang="scss">
body, html, #app{
    height: 100%;
}

body{
    // thanks for https://sozai-good.com/
    background-image: url('./assets/images/84397.jpg');
    background-size: cover;
}

#app{
    @include outer-limit;
    position: relative;
    height: 100%;
    // thanks for https://www.beiz.jp/
    background-image: url('./assets/images/paper_00108.jpg');
    background-size: cover;
}
</style>


<script>
    require('@/assets/sass/reset.css')

    export default{
        components: {
            'background': require('./components/MenuBackground.vue').default,
            'header-component': require('./components/Header.vue').default,
            'main-component': require('./components/Main.vue').default,
        }
    }
</script>
