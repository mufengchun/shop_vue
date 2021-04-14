<template>
  <div id="app">
    <comm-header></comm-header>
    <div style='min-height: 100px; flex: 1;'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CommHeader from '@components/header';

export default {
  components: { CommHeader },

  data () {
    return {
      // routeIndex: 1
    };
  },
  methods: {}
};
</script>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
