<template>
    <transition v-on:beforeEnter="beforeEnter">
    <div id="message-window" @click="$store.state.is_opend.message = null" v-if="$store.state.is_opend.message != null">
        <p>{{message}}</p>
    </div>
</transition>
</template>


<style lang="scss">
#message-window{
    @include outer-base;
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
    border-radius: 20px;
    background-color: #73BA80;
    width: 95%;
    box-sizing:border-box;
    max-width: 500px;
    box-shadow: 2px 2px 4px 2px rgba(10,10,10,.3);

    cursor: pointer;

    p{
        @include board-text;
        text-align: center;
    }

    &.v-enter, &.v-leave-to{
        top: 50px;
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
        data: ()=>{return{
            message: null,
            timeout: null,
        }},
        methods: {
            beforeEnter(){
                this.message = this.$store.state.is_opend.message
                this.timeout = setTimeout(()=>{this.$store.state.is_opend.message = null}, 5000)
            },
            beforeLeave(){
                clearTimeout(this.timeout)
            }
        }
    }
</script>
