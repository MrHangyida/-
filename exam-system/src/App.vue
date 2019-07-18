<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}
a,b,strong,em,i{
    font-style: normal;
    font-weight: normal;
}
ol,ul{
    list-style: none;
}
html,body,#app{
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
