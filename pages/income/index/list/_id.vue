<template>
    <div>
dynamic income/list/{{nowfelId}}
    </div>
</template>

<script>
    export default {
        computed: {
            nowfelId() {
                return this.$route.params.id 
            }
        },
    }
</script>

<style scoped>

</style>