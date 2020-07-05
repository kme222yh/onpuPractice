<template>
    <transition>
        <ul id="app-menu" @click.self="$store.dispatch('menuClose')" v-show="$store.state.is_opend.menu.app">
            <li @click="$store.dispatch('menuClose')"><menu-button href="#/"><i class="fas fa-home"></i></menu-button></li>
            <li><menu-button href="#/about"><i class="fas fa-info"></i></menu-button></li>
            <li @click="$store.dispatch('backgroundOpen')"><menu-button href="#/setting"><i class="fas fa-cog"></i></menu-button></li>
        </ul>
    </transition>
</template>


<style lang="scss">
    #app-menu{
        @include menu-bar;

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


        @include mobile{
            li{
                margin: 20px 0;
            }
            flex-direction: column;
            &.v-enter, &.v-leave-to{
                li{transform: translateY(-350px);}
            }
            &.v-enter-to, &.v-leave{
                li{transform: translateY(0);}
            }
            &.v-enter-active{
                li:first-child{transition: .4s; transition-delay: .6s;}
                li:nth-child(2){transition: .4s; transition-delay: .5s;}
                li:nth-child(3){transition: .4s; transition-delay: .4s;}
                li:last-child{transition: .4s; transition-delay: .3s;}
                transition: 1s;
            }
            &.v-leave-active{
                li:first-child{transition: .5s}
                li:nth-child(2){transition: .5s; transition-delay: .1s;}
                li:nth-child(3){transition: .5s; transition-delay: .2s;}
                li:last-child{transition: .5s; transition-delay: .3s;}
                transition: 1s;
            }
        }
    }
</style>



<script>
    export default {
        components: {
            'menu-button': require('./MenuButton.vue').default,
        },
    }
</script>
