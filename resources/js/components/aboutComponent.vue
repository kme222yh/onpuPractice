<template>
    <div id="about">
        <div class="profile">
            <h2>Produced by</h2>
            <a target="_blank" href="https://twitter.com/katuura028"><i class="fab fa-twitter"></i>  <img src="https://pbs.twimg.com/profile_images/1226674655613710336/Yokvq4mP_reasonably_small.jpg"> </a>
        </div>
        <ul class="credits">
            <li><h2>Images and others are borrowed from</h2></li>
            <li><a target="_blank" href="https://sozai-good.com/">https://sozai-good.com/</a></li>
            <li><a target="_blank" href="https://www.beiz.jp/">https://www.beiz.jp/</a></li>
            <li><a target="_blank" href='https://www.freepik.com/free-photos-vectors/music'>Music vector created by rawpixel.com - www.freepik.com</a></li>
        </ul>
        <a href="#/" class="homebutton"><i class="fas fa-home"></i></a>
    </div>
</template>


<style lang="scss">
</style>


<script>
export default {
    mounted(){
        this.$store.dispatch('otherPageOpen')
    },
    destroyed(){
        this.$store.dispatch('menuClose')
    },
}
</script>
