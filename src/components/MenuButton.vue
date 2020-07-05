<template>
    <a href="#" class="menu-button">
        <slot/>
    </a>
</template>


<style lang="scss">
    .menu-button{
        height: $top-button-size;
        width: $top-button-size;
        border-radius: 40%;
        background-color: #73BA80;
        border: none;
        display: block;
        text-align: center;
        line-height: $top-button-size;
        font-size: 30px;
        color: white;
        transition: .5s;
        box-shadow: 2px 2px 4px 2px rgba(10,10,10,.3);
        img{
            padding: 10px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: inherit;
        }
        &:hover{
            box-shadow: 1px 1px 2px 1px rgba(10,10,10,.3);
        }
    }
</style>
