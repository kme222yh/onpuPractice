<template>
    <transition>
        <ul id="top-menu" class="menu-button" v-show="$store.state.is_opend.menu.home">
            <li class="ho"> <a href="/"> <img src="media/icon.png" alt=""> </a> </li>
            <li> <button @click="menuOpen" type="button"> <i class="fas fa-ellipsis-h"></i> </button> </li>
        </ul>
    </transition>
</template>


<style lang="scss">
    #top-menu{
        img{
            padding: 10px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: inherit;
        }
        &.v-enter, &.v-leave-to{
            li{transform: translateY(-100px);}
        }
        &.v-enter-to, &.v-leave{
            li{transform: translateY(0);}
        }
        &.v-enter-active{
            li:first-child{transition: .4s; transition-delay: .5s;}
            li:last-child{transition: .4s; transition-delay: .6s;}
            transition: 1s;
        }
        &.v-leave-active{
            li:first-child{transition: .4s;}
            li:last-child{transition: .4s; transition-delay: .1s;}
            transition: 1s;
        }
    }
</style>


<script>
    export default {
        methods: {
            menuOpen(){
                this.$store.dispatch('menuAppOpen');
            },
        },
    }
</script>
