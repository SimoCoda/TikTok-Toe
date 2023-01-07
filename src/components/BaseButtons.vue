<template>
    <button @click="action" class="border-2 border-stone-900 p-2 bg-white mt-5 ">{{name}}</button>
</template>

<script>
export default {
    name : 'BaseButtons',
    props: ['name'],
    methods : {
        action(){
            this.$emit('action')
        },
    },
    
}
</script>
