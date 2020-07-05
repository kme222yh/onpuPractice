<template>
    <transition>
        <ul id="top-menu" v-show="$store.state.is_opend.menu.home">
            <li><menu-button href=""><img src="@/assets/images/icon.png"></menu-button></li>
            <li @click="menuOpen"><menu-button href="javascript:void(0)"><i class="fas fa-ellipsis-h"></i></menu-button></li>
        </ul>
    </transition>
</template>


<style lang="scss">
    #top-menu{
        @include menu-bar;

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
        components: {
            'menu-button': require('./MenuButton.vue').default,
        },
        methods: {
            menuOpen(){
                this.$store.dispatch('menuAppOpen');
            },
        },
    }
</script>
