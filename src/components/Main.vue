<template>
    <main>
        <score></score>
        <setting></setting>
        <transition><router-view></router-view></transition>
        <message></message>
        <opening></opening>
    </main>
</template>


<style lang="scss">
    main{
        @include outer-base;
        padding-bottom: 0 !important;
        padding-top: $top-button-size;
        box-sizing: border-box;
        height: 100%;
    }
</style>


<script>
export default{
    components: {
        'score': require('./score/Component.vue').default,
        'setting': require('./Setting.vue').default,
        'message': require('./Message.vue').default,
        'opening': require('./OpeningAnimation.vue').default,
    }
}
</script>
