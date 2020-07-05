<template>
    <div id="score">
        <notation :clef="this.notation.first.clef" :sign="this.notation.first.signature" :synth="notation.synth" ref="Gclef"></notation>
        <notation :clef="this.notation.secound.clef" :sign="this.notation.secound.signature" :synth="notation.synth" ref="Fclef"></notation>

        <board v-bind.sync="notation" />
    </div>
</template>


<style lang="scss">
#score{
    position: relative;
    @include flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    .notation{
        width: 100%;
        margin: 20px 0;
    }
    overflow-y: hidden;
}
</style>


<script>
import Tone from "tone"


const random = (max, min) => Math.floor(Math.random() * (max - min) + min)


const algorithm = {
    single(){
        return [random(8, -8)]
    },
    double(){
        const d = random(8, -6)
        return [d,d-2]
    },
    triple(){
        const d = random(8, -4)
        return [d,d-2,d-4]
    },
}






    export default {
        components: {
            'notation' : require('./Notation.vue').default,
            'board': require('./Board.vue').default,
        },

        data: function(){
            return {
                notation: {
                    interval: 1,
                    synth: null,
                    first: {
                        clef: 'G',
                        signature: 0,
                        active: 'false',
                        algorithm: 'single'
                    },
                    secound: {
                        clef: 'F',
                        signature: 0,
                        active: 'false',
                        algorithm: 'single'
                    }
                },
            }
        },
        mounted(){
            this.composer()
        },
        methods: {
            composer(){
                if(!this.$store.state.is_opend.background && !this.$store.state.is_opend.other){
                    if(this.notation.first.active == 'true'){
                        this.$refs.Gclef.push(algorithm[this.notation.first.algorithm]())
                    }
                    if(this.notation.secound.active == 'true'){
                        this.$refs.Fclef.push(algorithm[this.notation.secound.algorithm]())
                    }
                }
                setTimeout(this.composer, this.notation.interval*1000)
            },

            inputNote(n){
                if(this.notation.synth != null){
                    this.notation.synth.triggerAttackRelease(Tone.Frequency(n, "midi").toNote(), "8n");
                }
                this.$refs.Gclef.compare(n)
                this.$refs.Fclef.compare(n)
            },
        }
    }
</script>
