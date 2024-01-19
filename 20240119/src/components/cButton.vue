<template>
    <el-button>{{ btn }}</el-button>
</template>

<script>
    export default {
        name: 'cButton',
        data() {
            return {
                // &&*&&按钮文案 **&**el-input
                btn: '我是button'
            }
        }
    }
</script>