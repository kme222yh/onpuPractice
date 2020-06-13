<template>
    <div id="notation-board" :class="cls" @click="$store.dispatch('notationBoardOpen')">
        <div>
            <div>
                <p>interval : {{interval}}s</p>
                <input type="range" name="" min="0.5" max="5" step="0.1"  :value="interval" @change="$emit('update:interval', $event.target.value)">
            </div>
            <div class="audio">
                <p>audio</p>
                <div>
                    <label><input @change="audio_on" type="radio" name="audio" value="true" v-model="audio">on</label>
                    <label><input @change="audio_off" type="radio" name="audio" value="false" v-model="audio">off</label>
                </div>
                <input v-if="audio == 'true'" @change="volume_change" type="range" name="" value="0" min="-20" max="5">
            </div>
            <div class="clef">
                <h2>1st</h2>
                <div>
                    <label><input type="radio" name="factive" value="true" v-model="first.active">active</label>
                    <label><input type="radio" name="factive" value="false" v-model="first.active">stop</label>
                </div>
                <div>
                    <label><input type="radio" name="fclef" value="G" v-model="first.clef">G</label>
                    <label><input type="radio" name="fclef" value="F" v-model="first.clef">F</label>
                </div>
                <div>
                    <p>b</p>
                    <input type="range" name="" min="-5" max="5" v-model="first.signature">
                    <p>#</p>
                </div>
                <div>
                    <p>mode : </p>
                    <select class="" name="" size="1" v-model="first.algorithm">
                        <option value="single">single</option>
                        <option value="double">double</option>
                        <option value="triple">triple</option>
                    </select>
                </div>
            </div>
            <div class="clef">
                <h2>2st</h2>
                <div>
                    <label><input type="radio" name="sactive" value="true" v-model="secound.active">active</label>
                    <label><input type="radio" name="sactive" value="false" v-model="secound.active">stop</label>
                </div>
                <div>
                    <label><input type="radio" name="sclef" value="G" v-model="secound.clef">G</label>
                    <label><input type="radio" name="sclef" value="F" v-model="secound.clef">F</label>
                </div>
                <div>
                    <p>b</p>
                    <input type="range" name="" min="-5" max="5" v-model="secound.signature">
                    <p>#</p>
                </div>
                <div>
                    <p>mode : </p>
                    <select class="" name="" size="1" v-model="secound.algorithm">
                        <option value="single">single</option>
                        <option value="double">double</option>
                        <option value="triple">triple</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
</style>


<script>
    export default {

        data: ()=>{return{
            audio: "false",
        }},
        props: {
            first: {},
            secound: {},
            interval: {},
            synth: {},
            synth_volume: {},
        },
        mounted(){

        },
        computed: {
            cls(){
                return {
                    closed: !this.$store.state.is_opend.board,
                    opend: this.$store.state.is_opend.board,
                    away: this.$store.state.is_opend.menu.app || this.$store.state.is_opend.other,
                }
            },
        },
        methods: {
            audio_on(){
                const synth = new Tone.PolySynth({
                    // 発振器の設定
                    oscillator:{
                        type:"triangle8"
                    },
                    // エンベロープ(包絡線)の設定
                    envelope:{
                        attack:0.005,  // 最大音量アタック・レベル(Attack Level)に達する時間
                        decay:0.1,     // 一定音量まで減衰(Decay)する時間
                        sustain:0.4,   // 一定振幅(Sustain Level)が続く時間
                        release:2      // 音が消えるまでの時間
                    }
                }).toMaster();
                synth.volume.value = 0
                synth.triggerAttackRelease("C5", "8n");
                this.$emit('update:synth', synth)
            },
            audio_off(){
                this.$emit('update:synth', null)
            },
            volume_change(e){
                this.synth.volume.value = e.target.value
                this.synth.triggerAttackRelease("C5", "8n");
            }
        }
    }
</script>
