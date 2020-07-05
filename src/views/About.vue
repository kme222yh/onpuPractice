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
        <menu-button href="#/"><i class="fas fa-home"/></menu-button>
    </div>
</template>


<style lang="scss">
#about{
    @include outer-base;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(247,210,146,0.8);

    @include flex;
    flex-direction: column;
    justify-content: space-around;

    h2{
        text-align: center;
        @include nav-text;
    }

    .profile{
        h2{
            margin-bottom: 20px;
        }
        a{
            @include flex;
            justify-content: space-around;
            background-color: #1EA1F1;
            padding: 10px;
            text-decoration: none;
            border-radius: 40px;
            transition: .3s;
            box-shadow: 2px 2px 4px 2px rgba(10,10,10,.3);
            &:hover{
                box-shadow: 1px 1px 2px 1px rgba(10,10,10,.3);
            }
        }
        img,i{
            margin: 0 20px;
        }
        img{
            border-radius: 100%;
            height: 60px;
            width: 60px;
        }
        i{
            font-size: 50px;
            color: white;
        }
    }

    .credits{
        text-align: center;
        li{
            margin-bottom: 10px;
            list-style: none;
        }
    }

    &.v-enter, &.v-leave-to{
        opacity: 0;
    }
    &.v-enter-to, &.v-leave{
        opacity: 1;
    }
    &.v-leave-active, &.v-enter-active{
        transition: .5s;
    }
}
</style>


<script>
export default {
    components: {
        'menu-button': require('../components/MenuButton.vue').default,
    },
    mounted(){
        this.$store.dispatch('otherPageOpen')
    },
    destroyed(){
        this.$store.dispatch('menuClose')
    },
}
</script>
