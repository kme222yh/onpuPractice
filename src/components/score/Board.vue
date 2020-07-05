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
                <h2>2nd</h2>
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
#notation-board{
    position: absolute;
    bottom: calc(-60% + 40px);
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 100%;
    max-width: 600px;
    height: 60%;
    background-image: url('../../assets/images/paper_00110.jpg');
    background-size: cover;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
    padding: 40px  30px 10px 30px;
    transition: .3s;

    &>div{
        @include flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: nowrap;
        height: 100%;
        overflow-y: scroll;
        &>div{
            &, h2, p{
                text-align: center;
            }
            padding: 60px 0;
            width: 100%;
            border-bottom: white 2px solid;
            &:last-child{
                border: none;
            }
        }
    }


    p, label, select, h2{
        @include board-text;
    }
    label{margin: 0 10px;}
    p{margin-bottom: 10px;}
    h2{
        font-size: 50px;
        margin-bottom: 50px;
    }

    .clef{
        div{
            margin-bottom: 30px;
            @include flex;
            justify-content: center;
            align-items: center;
        }
        select{
            background-color: rgba(0,0,0,0);
            border-radius: 10px;
            border: white 1px solid;
            margin-left: 10px;
            width: 150px;
            &:focus{
                outline: none;
            }
            appearance: button;
        }
        p:first-child{margin-right: 10px;}
        p:last-child{margin-left: 10px;}
    }

    input[type="range"]{
        appearance: none;
        cursor: pointer;
        outline: none;
        height: 14px;
        width: 60%;
        background: #8acdff;
        border-radius: 10px;
        border: solid 3px #dff1ff;
    }

    .audio input{
        margin-top: 20px;
    }


    &.closed:hover{
        bottom: calc(-60% + 60px);
    }
    &.away{
        bottom: -100%;
    }
    &.opend{
        bottom: 0;
    }
}
</style>


<script>
    import Tone from "tone"

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
