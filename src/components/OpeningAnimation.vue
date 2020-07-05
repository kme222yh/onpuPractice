<template>
    <transition>
        <div id="opening" v-if="$store.state.is_opend.opening" >
            <canvas id="opening-canvas" width="300" height="300"></canvas>
        </div>
    </transition>
</template>


<style lang="scss">
    #opening{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: #F4ECE2;
        &.v-leave-to{
            opacity: 0;
        }
        &.v-leave{
            opacity: 1;
        }
        &.v-leave-active{
            transition: .5s;
        }
    }
</style>


<script>
import { Shape, Stage, Bitmap, Container } from '@createjs/easeljs';
import { Tween, Ease } from '@createjs/tweenjs';
const createjs = {
    'Shape': Shape,
    'Stage': Stage,
    'Tween': Tween,
    'Bitmap': Bitmap,
    'Container': Container,
    'Ease': Ease,
}

export default {
    data: ()=>{return {
        stage: null,
        interval: null,
    }},
    mounted(){
        setTimeout(()=>{
            this.$store.dispatch('openingClose')
        }, 3000)
        this.stage = new createjs.Stage('opening-canvas')
        this.stage.canvas.width = this.stage.canvas.parentNode.clientWidth
        this.stage.canvas.height = this.stage.canvas.parentNode.clientHeight

        this.keyboard()

        this.interval = setInterval(()=>{
            this.stage.update()
        }, 10)
    },
    destroyed(){
        clearInterval(this.interval)
    },
    methods: {
        keyboard(){
            let shapes = new createjs.Container()

            let between = 60
            let border = 3
            let w = between - border*2
            let h = 200

            for(let i=0; i<7; i++){
                let shape = new createjs.Shape();
                let x = between*i
                shape.graphics.beginFill('White').drawRect(x+border/2,0,w,h)
                shape.alpha = 0
                createjs.Tween.get(shape).wait(i*200).to({y:100, alpha:1}, 1500, createjs.Ease.cubicInOut);
                shapes.addChild(shape)
            }

            h = h - 50

            for(let i=0; i<6; i++){
                if(i == 2) continue
                let shape = new createjs.Shape();
                let x = between*i + between/2 + between/8
                shape.graphics.beginFill('Black').drawRect(x+border/2,0,w*3/4,h)
                shape.alpha = 0
                createjs.Tween.get(shape).wait(i*200+100).to({y:100, alpha:1}, 1500, createjs.Ease.cubicInOut);
                shapes.addChild(shape)
            }

            shapes.x = this.stage.canvas.width/2 - between*7/2
            shapes.y = this.stage.canvas.height/2

            this.stage.addChild(shapes)


            let img = new createjs.Bitmap("img/opening.png");
            img.scaleX = 0.5
            img.scaleY = 0.5
            img.alpha = 0
            img.x = this.stage.canvas.width/2 - 620*0.5/2
            img.y = shapes.y - 400*img.scaleY/2 - 100
            createjs.Tween.get(img).wait(500).to({alpha:0.9}, 1500, createjs.Ease.cubicInOut);
            this.stage.addChild(img)
        },
    }
}
</script>
