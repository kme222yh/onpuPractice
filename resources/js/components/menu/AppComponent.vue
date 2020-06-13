<template>
    <transition>
        <ul id="app-menu" class="menu-button" @click.self="$store.dispatch('menuClose')" v-show="$store.state.is_opend.menu.app">
            <li class="ho"> <a href="#/" @click="$store.dispatch('menuClose')"> <i class="fas fa-home"></i> </a> </li>
            <li class="ho"> <a href="#/about"> <i class="fas fa-info"></i> </a> </li>
            <li class="ho"> <a href="#/setting" @click="$store.dispatch('backgroundOpen')"> <i class="fas fa-cog"></i></a> </li>
        </ul>
    </transition>
</template>


<style lang="scss">
    #app-menu{
        justify-content: center;
        li{
            margin: 0 40px;
        }

        &.v-enter, &.v-leave-to{
            li{transform: translateY(-100px);}
        }
        &.v-enter-to, &.v-leave{
            li{transform: translateY(0);}
        }
        &.v-enter-active{
            li:first-child{transition: .4s; transition-delay: .3s;}
            li:nth-child(2){transition: .4s; transition-delay: .4s;}
            li:nth-child(3){transition: .4s; transition-delay: .5s;}
            li:last-child{transition: .4s; transition-delay: .6s;}
            transition: 1s;
        }
        &.v-leave-active{
            li:first-child{transition: .4s}
            li:nth-child(2){transition: .4s; transition-delay: .1s;}
            li:nth-child(3){transition: .4s; transition-delay: .2s;}
            li:last-child{transition: .4s; transition-delay: .3s;}
            transition: 1s;
        }
    }
</style>


<script>
    export default {
    }
</script>
