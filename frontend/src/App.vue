<template>
  <router-view/>
</template>

<style lang="scss">
@import './components/__variables.scss';
html, body {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    position: absolute;
    top: 0;
    margin: 0;
    left: 0;
    font-family: $font-family;
}

#app {
    display: flex;
    width: 100%;
    min-height: 100vh;
}

</style>
