<template>
    <transition>
        <div id="setting" v-show="$route.path == '/setting'">
            <h2>MIDI device</h2>
            <select class="" name="" size="1" v-model="target" @blur="switchDevice(target)" @change="switchDevice(target)">
                <option v-for="i in deviceIterator" :value="i" :key="i">{{devices[i][1].name}}</option>
            </select>
            <div @click="requestDevice"><menu-button href="javascript:void(0)"><i class="fas fa-sync-alt"/></menu-button></div>
        </div>
    </transition>
</template>




<style lang="scss">
#setting{
    background-image: url('../assets/images/paper_00110.jpg');
    background-size: cover;

    @include flex;
    flex-direction: column;
    justify-content: center;

    p, select, h2{
        @include board-text;
        text-align: center;
        margin-bottom: 30px;
    }
    select{
        background-color: rgba(0,0,0,0);
        border-radius: 10px;
        border: white 1px solid;
        width: 90%;
        &:focus{
            outline: none;
        }
    }

    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    height: 70%;
    width: 80%;
    max-height: 500px;
    max-width: 500px;

    &.v-enter, &.v-leave-to{
        top: 45%;
        opacity: 0;
    }
    &.v-enter-to, &.v-leave{
        top: 50%;
        opacity: 1;
    }
    &.v-enter-active, &.v-leave-active{
        transition: .5s;
    }
}
</style>




<script>
export default {
    components: {
        'menu-button': require('./MenuButton.vue').default,
    },

    data: ()=>{return {
        devices: [],
        target: 0,
        greeted: false,
        score_interface: null,
    }},
    created(){
        setTimeout(this.requestDevice, 3000)
        if(this.$route.path == '/setting'){
            this.$store.dispatch('backgroundOpen')
        }

        for(let i=0; i<this.$parent.$children.length; i++)
            if(this.$parent.$children[i].$el != null)
                if(this.$parent.$children[i].$el.attributes['id'].nodeValue == 'score'){
                    this.score_interface = this.$parent.$children[i].inputNote
                    break
                }
    },
    computed: {
        deviceIterator(){
            return [...Array(this.devices.length).keys()]
        },
    },
    methods: {
        requestDevice(){
            if(navigator.requestMIDIAccess == null){
                this.$store.dispatch('messageOpen', 'Your browser does not support MIDI')
                return
            }
            navigator.requestMIDIAccess().then(access=>{
                this.devices = Array.from(access.inputs)
                if(this.devices.length > 0){
                    this.switchDevice(0)
                }
                else{
                    this.$store.dispatch('messageOpen', 'Connect a MIDI keyboard for even more fun!')
                    this.greeted = true
                }
                this.$forceUpdate()
            })
        },
        switchDevice(n){
            if(this.devices.length > n){
                this.devices[this.target][1].onstatechange = null
                this.devices[this.target][1].onmidimessage = null
                this.target = n
                this.devices[this.target][1].onstatechange = this.onstatechange
                this.devices[this.target][1].onmidimessage = this.onmidimessage
            }
        },






        onstatechange(e){
            this.$store.dispatch('messageOpen', e.port.name+' '+e.port.manufacturer+' '+e.port.state)
        },
        onmidimessage(m){
            if(m.data[0] == 144){
                this.score_interface(m.data[1])
            }
        },
    }
}
</script>
