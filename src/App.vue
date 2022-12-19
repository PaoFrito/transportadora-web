<template>
  <div id="app">
    <nav>
      <router-link to="/frete">frete</router-link> |
      <router-link to="/frete/cadastrar">novo frete</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">

.division{
  margin-top: 20px;
}

.vertical-divisor{
  border-left: 6px solid #00D1B2;
  height: 270px;
}

.text-align-left{
  text-align: left !important;
}

.text-align-right{
  text-align: right !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
