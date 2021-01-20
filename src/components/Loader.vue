<template>
<div v-if="teste" class="loader"><div class="preload"></div></div>
<div v-else class="teste"></div>
   
</template>

<script>
    export default {
        name: "Loader",
        data(){
            return {
                ligado : this.teste
            }
        },
        props:['isVisible','teste'],
        watch:{
            isVisible: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            },
             teste: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            }
        }


}
</script>

<style>
    .loader {
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128,0.3);
    z-index:9999;
    position:absolute;
    top:0;
    left:0;
    display:block;
   
}

.preload {
    width: 120px;
    height: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    display: block;
    background: url('../assets/loader.gif') no-repeat;
}
</style>