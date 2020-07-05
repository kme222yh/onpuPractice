<template>
    <transition>
        <div @click="$store.dispatch('menuClose');if($route.path!='/')$router.push('/')" v-show="$store.state.is_opend.background" id="menu-background"></div>
    </transition>
</template>


<style lang="scss">
    #menu-background{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(10,10,10,.2);

        &.v-enter, &.v-leave-to{
            opacity: 0;
        }
        &.v-enter-to, &.v-leave{
            opacity: 1;
        }
        &.v-enter-active, &.v-leave-active{
            transition: .3s;
        }
    }
</style>
