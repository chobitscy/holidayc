<template>
    <header class="simple-header">
        <slot name="back"/>
        <div class="simple-header-name">
            <slot/>
        </div>
        <slot name="right">
            <span class="icon"></span>
        </slot>
    </header>
</template>

<script>
    export default {
        name: "headers"
    }
</script>

<style lang="scss" scoped>
    .simple-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        line-height: 40px;
        padding: 0 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: #fff;

        .simple-header-name {
            font-size: 15px;
        }

        .icon {
            display: flex;
            align-items: center;
            font-weight: 600;
            width: 48px;
        }

        .icon_n {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .el-icon-arrow-left:before {
        font-weight: 900;
        color: #999;
    }
</style>