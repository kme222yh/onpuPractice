<template>
    <transition v-on:beforeEnter="beforeEnter">
    <div id="message-window" @click="$store.state.is_opend.message = null" v-if="$store.state.is_opend.message != null">
        <p>{{message}}</p>
    </div>
</transition>
</template>


<style lang="scss">
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
