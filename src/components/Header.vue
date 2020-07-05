<template>
    <header>
        <top-menu></top-menu>
        <app-menu></app-menu>
    </header>
</template>


<style lang="scss">

</style>


<script>
export default{
    components: {
        'top-menu': require('./TopMenu.vue').default,
        'app-menu': require('./MenuApp.vue').default,
    }
}
</script>
