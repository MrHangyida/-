<template>
    <div>
        <h4>{{titletext}}</h4>
    </div>
</template>

<script>

export default {
    props:["titletext"],
    data(){
        return {

        }
    }
}
</script>
<style scoped>
h4{
    font-size:20px;
    text-indent: 22px;
    font-weight: 100;
    line-height: 80px;
    margin-top:5px;
}
</style>