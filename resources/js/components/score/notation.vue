<template>
    <div class="notation">
        <canvas :id="clef+'clef'" width="300" height="180"></canvas>
    </div>
</template>


<style lang="scss">
</style>


<script>

    const sign = {
        F: {
            s: [-2,1,-3,0,3],
            f: [2,-1,3,0,4],
        },
        G: {
            s: [-4,-1,-5,-2,1],
            f: [0,-3,1,-2,2],
        },
    }



    // [sign (0~10)] [note (0~16)]
    const sign_slide = {
        G: [                                //中
            [-1, -1,  0, -1, -1,  0, -1, -1, -1,  0, -1, -1,  0, -1, -1, -1,  0],
            [-1, -1,  0, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0,  0, -1, -1,  0],
            [-1, -1,  0,  0, -1,  0,  0, -1, -1,  0,  0, -1,  0,  0, -1, -1,  0],
            [ 0, -1,  0,  0, -1,  0,  0,  0, -1,  0,  0, -1,  0,  0,  0, -1,  0],
            [ 0, -1,  0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0, -1,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],　//中
            [ 0,  0,  0,  0,  0, +1,  0,  0,  0,  0,  0,  0, +1,  0,  0,  0,  0],
            [ 0,  0, +1,  0,  0, +1,  0,  0,  0, +1,  0,  0, +1,  0,  0,  0, +1],
            [ 0,  0, +1,  0,  0, +1, +1,  0,  0, +1,  0,  0, +1, +1,  0,  0, +1],
            [ 0,  0, +1, +1,  0, +1, +1,  0,  0, +1, +1,  0, +1, +1,  0,  0, +1],
            [+1,  0, +1, +1,  0, +1, +1, +1,  0, +1, +1,  0, +1, +1, +1,  0, +1],
        ],
        F: [                                //中
            [ 0, -1, -1,  0, -1, -1, -1,  0, -1, -1,  0, -1, -1, -1,  0, -1, -1],
            [ 0, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0,  0, -1, -1,  0, -1, -1],
            [ 0,  0, -1,  0,  0, -1, -1,  0,  0, -1,  0,  0, -1, -1,  0,  0, -1],
            [ 0,  0, -1,  0,  0,  0, -1,  0,  0, -1,  0,  0,  0, -1,  0,  0, -1],
            [ 0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0, -1,  0,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //中
            [ 0,  0,  0, +1,  0,  0,  0,  0,  0,  0, +1,  0,  0,  0,  0,  0,  0],
            [+1,  0,  0, +1,  0,  0,  0, +1,  0,  0, +1,  0,  0,  0, +1,  0,  0],
            [+1,  0,  0, +1, +1,  0,  0, +1,  0,  0, +1, +1,  0,  0, +1,  0,  0],
            [+1, +1,  0, +1, +1,  0,  0, +1, +1,  0, +1, +1,  0,  0, +1, +1,  0],
            [+1, +1,  0, +1, +1, +1,  0, +1, +1,  0, +1, +1, +1,  0, +1, +1,  0],
        ]
    }



    export default {
        props: {
            clef: {},
            sign: {},
            synth: {},
        },
        data: function(){
            return {
                stage: null,
                shapes: {
                    notation: null,
                    notes: null,
                    signature: null,
                    clef: null,
                    indicator: null,
                },
                notes: Array(15),
                interval: [],

                config: {
                    notation: {
                        origin: {x: 10, y: null},
                        term: {x: null, y: null},
                        size: {x: null, y: null},
                        step: null,
                        thick: 1,
                    },
                    notes: {
                        origin: {x: null, y: null},
                        term: {x: null, y: null},
                        size: {x: 18, y: 14},
                        bitween: 50,
                        bar: 40,
                        visible_till: null,
                    },
                    signature: {
                        location: null,
                        bitween: 9,
                        size: {x: null},
                        is: 0,
                    },
                    clef: {
                        is: this.clef,
                        size: {x: 80},
                    }
                },

                comparement: {
                    targets: [],
                    corrected: [],
                    success: true,
                },

            }
        },
        mounted(){
            this.stage = new createjs.Stage(this.clef+'clef')

            this.createNotation()
            this.createClef()
            this.createSignature()
            this.createNotes()
            this.createIndicator()
            this.interval.push(setInterval(this.canvasUpdate, 16))
        },
        methods: {
            push(notes){
                this.notes.shift()
                this.notes.push(notes)
                createjs.Tween.get(this.shapes.notes.children[0]).to({alpha: 0}, 300)
                createjs.Tween.get(this.shapes.notes.children[this.config.notes.visible_till]).to({alpha: 1}, 300)
                createjs.Tween.get(this.shapes.notes).to({x: this.shapes.notes.x-this.config.notes.bitween}, 300, createjs.Ease.cubicInOut).call(this.updateNotes)
                this.comparementReset()
                if(this.synth != null){
                    for(let i in this.comparement.targets){
                        this.synth.triggerAttackRelease(Tone.Frequency(this.note2midi(this.comparement.targets[i]), "midi").toNote(), "8n");
                    }
                }
            },
            reset(){
                for(let i=0; i<this.notes.length; i++){
                    this.notes[i] = []
                }
            },
            compare(n){
                let result = true
                if(this.comparement.targets.length < 1){
                    result = false
                }
                for(let i=0; i<this.comparement.targets.length; i++){
                    this.comparement.corrected[i] = this.comparement.corrected[i] || n == this.note2midi(this.comparement.targets[i])
                    result = result && this.comparement.corrected[i]
                }
                if(result && this.comparement.success){
                    let shape = new createjs.Shape()
                    shape.graphics.beginLinearGradientFill(["#1AEB01", "rgba(255,255,255,0)"], [1,0], this.config.notation.size.x/1.2, 0, 0, 0)
                    shape.graphics.drawRect(this.config.notation.origin.x,this.config.notation.origin.y+this.config.notation.step*4,this.config.notation.size.x/2,this.config.notation.step*8)
                    shape.alpha = 0.4
                    createjs.Tween.get(shape).to({alpha: 0,}, 500).call(()=>{this.stage.removeChild(shape)})
                    this.stage.addChild(shape)
                    this.comparement.success = false
                }
                return result

            },
            comparementReset(){
                this.comparement.targets = [... this.notes[Math.floor(this.config.notes.visible_till/2)]]
                this.comparement.corrected = Array(this.comparement.targets.length).fill(false)
                this.comparement.success = true
            },


            note2midi(n){
                let increment = []
                let offset = 0
                if(this.clef == 'G'){
                    increment = [-14, -12, -11, -9, -7, -6, -4, -2, 0, 1, 3, 5, 6, 8, 10, 12, 13]
                    offset = 71

                }
                else if(this.clef == 'F'){
                    increment = [-14, -12, -10, -9, -7, -5, -3, -2, 0, 2, 3, 5, 7, 9, 10, 12, 14]
                    offset = 50
                }

                return increment[8 - n] + offset + sign_slide[this.clef][Number(this.sign) + 5][8 - n]
            },


            canvasUpdate(){
                if(this.stage.canvas.width != this.stage.canvas.parentNode.clientWidth){
                    this.adjustNotation()
                    this.adjustNotes()
                    this.adjustIndicator()
                }
                if(this.config.clef.is != this.clef){
                    this.updateClef()
                    this.updateSignature()
                }
                if(this.config.signature.is != this.sign){
                    this.updateSignature()
                }
                this.stage.update()
            },




            adjustIndicator(){
                let indicator = new createjs.Shape()
                indicator.graphics.beginFill('Red')
                const x = this.config.notes.origin.x - this.config.notes.size.x/2 + this.config.notes.bitween*(Math.floor(this.config.notes.visible_till/2))
                const y = this.config.notes.size.y/2
                indicator.graphics.drawRect(x,y,this.config.notation.thick,this.config.notation.step*16)
                indicator.graphics.drawRect(x+this.config.notes.bitween,y,this.config.notation.thick,this.config.notation.step*16)
                this.stage.removeChild(this.shapes.indicator);
                this.shapes.indicator = indicator
                this.stage.addChild(this.shapes.indicator)
            },
            createIndicator(){
                this.adjustIndicator()
            },




            datum2Note(notes){
                let shape = new createjs.Shape()
                if(notes.length == 0){
                    return shape
                }
                shape.graphics.beginFill('Black')
                notes = Array.from(new Set(notes))
                notes.sort(function(a,b){return a-b})

                const size = this.config.notes.size
                const step = this.config.notation.step
                const thick = this.config.notation.thick
                const bar = this.config.notes.bar
                let slided = false

                shape.graphics.drawEllipse(0, step*(8+notes[0]), size.x, size.y)
                for(let i=1; i<notes.length; i++){
                    if(Math.abs(notes[i-1] - notes[i]) <= 1)    slided = !slided
                    else                                        slided = false
                    shape.graphics.drawEllipse((size.x-thick)*slided, step*(8+notes[i]), size.x, size.y)
                }

                if(notes[notes.length-1] > 5)
                    for(let i=6; i<=notes[notes.length-1]; i+=2)
                        shape.graphics.drawRect(-size.x/2, step*(8+i)+size.y/2-thick/2, size.x*2, thick)
                if(notes[0] < -5)
                    for(let i=-6; i>=notes[0]; i-=2)
                        shape.graphics.drawRect(-size.x/2, step*(8+i)+size.y/2-thick/2, size.x*2, thick)

                if((notes[0] + notes[notes.length-1])/2 > 0)
                    shape.graphics.drawRect(size.x-thick, step*(8+notes[0])+size.y/2-bar, thick, bar+step*(notes[notes.length-1]-notes[0]))
                else
                    shape.graphics.drawRect(size.x-thick, step*(8+notes[0])+size.y/2, thick, bar+step*(notes[notes.length-1]-notes[0]))

                return shape
            },
            updateNotes(){
                for(let i=0; i<this.notes.length; i++){
                    let shape = this.datum2Note(this.notes[i])
                    shape.x = this.config.notes.bitween * i
                    this.shapes.notes.children[i] = shape
                }
                this.shapes.notes.x = this.config.notes.origin.x
                this.shapes.notes.children[this.notes.length-1].alpha = 0
                for(let i=this.config.notes.visible_till; i<this.notes.length; i++){
                    this.shapes.notes.children[i].alpha = 0
                }
            },
            adjustNotes(){
                this.config.notes.origin.x = this.config.notation.origin.x + 200
                this.config.notes.origin.y = this.config.notation.size.y / 2
                this.config.notes.term.x = this.config.notation.term.x - 150
                this.config.notes.term.y = this.config.notes.origin.y
                this.config.notes.visible_till = Math.floor((this.config.notes.term.x - this.config.notes.size.x*2) / this.config.notes.bitween) - 1
                if(this.config.notes.visible_till > this.notes.length - 1)
                    this.config.notes.visible_till = this.notes.length - 1
            },
            createNotes(){
                if(this.stage.canvas.parentNode.clientWidth < 800){
                    this.notes = Array(Math.floor((this.config.notation.size.x-100) / this.config.notes.bitween))
                }
                for(let i=0; i<this.notes.length; i++){this.notes[i] = []}
                this.shapes.notes = new createjs.Container()
                this.stage.addChild(this.shapes.notes)
                this.adjustNotes()
                this.updateNotes()
            },





            updateSignature(){
                this.config.signature.is = this.sign
                let shape = new createjs.Container()
                this.config.signature.location = sign[this.clef]
                const x_origin = this.config.notation.origin.x + this.config.clef.size.x
                if(this.sign > 0){
                    const location = this.config.signature.location.s
                    for(let i=0; i<this.sign; i++){
                        let img = new createjs.Bitmap("media/number.png");
                        img.scaleX = 0.3
                        img.scaleY = img.scaleX
                        img.x = x_origin + this.config.signature.bitween * i
                        img.y = this.config.notation.step * (8+location[i]) - 2
                        shape.addChild(img)
                    }
                }
                if(this.sign < 0){
                    const location = this.config.signature.location.f
                    for(let i=0; this.sign<i; i--){
                        let img = new createjs.Bitmap("media/flat.png");
                        img.scaleX = 0.4
                        img.scaleY = img.scaleX
                        img.x = x_origin + this.config.signature.bitween * (-i)
                        img.y = this.config.notation.step * (8+location[-i]) - 15
                        shape.addChild(img)
                    }
                }
                this.stage.removeChild(this.shapes.signature)
                this.shapes.signature = shape
                this.stage.addChild(this.shapes.signature)
            },
            createSignature(){
                this.updateSignature()
            },




            updateClef(){
                this.config.clef.is = this.clef
                let clef = new createjs.Bitmap("media/"+this.clef+"clef.png");
                clef.x = this.config.notation.origin.x + 10
                if(this.clef == 'G'){
                    clef.y = this.config.notation.origin.y + this.config.notation.step
                    clef.scaleX = 0.8
                }
                else if(this.clef == 'F'){
                    clef.y = this.config.notation.origin.y + this.config.notation.step*4
                    clef.scaleX = 0.6
                }
                clef.scaleY = clef.scaleX

                this.stage.removeChild(this.shapes.clef);
                this.shapes.clef = clef
                this.stage.addChild(this.shapes.clef)
            },
            createClef(){
                this.updateClef()
            },




            adjustNotation(){
                this.stage.canvas.width = this.stage.canvas.parentNode.clientWidth

                this.config.notation.origin.y = this.config.notes.size.y/2
                this.config.notation.term.x = this.stage.canvas.width-this.config.notation.origin.x
                this.config.notation.term.y = this.stage.canvas.height-this.config.notation.origin.y
                this.config.notation.size.x = this.config.notation.term.x - this.config.notation.origin.x
                this.config.notation.size.y = this.config.notation.term.y - this.config.notation.origin.y
                this.config.notation.step = this.config.notation.size.y / 16

                let shape = new createjs.Shape();
                shape.graphics.beginFill("Black");
                shape.graphics.drawRect(this.config.notation.origin.x, this.config.notation.origin.y+this.config.notation.step*4, this.config.notation.thick, this.config.notation.step*8);
                shape.graphics.drawRect(this.config.notation.term.x - this.config.notation.thick, this.config.notation.origin.y+this.config.notation.step*4, this.config.notation.thick, this.config.notation.step*8);
                for(let i=4; i<=12; i+=2){
                    shape.graphics.drawRect(this.config.notation.origin.x, this.config.notation.origin.y+this.config.notation.step*i-this.config.notation.thick/2, this.config.notation.size.x, this.config.notation.thick);
                }

                this.stage.removeChild(this.shapes.notation)
                this.shapes.notation = shape
                this.stage.addChild(this.shapes.notation)
            },
            createNotation(){
                this.adjustNotation()
            },
        }
    }
</script>
