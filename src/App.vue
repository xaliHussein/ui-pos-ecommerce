<template>
  <v-app id="inspire">
    <Hrader />
    <v-main>
      <router-view />
      <Sidebar />
    </v-main>
  </v-app>
</template>

<script>
  import Hrader from "./components/layout/Header.vue";
  import Sidebar from "./components/layout/Sidebar.vue";
  // import Footer from "./components/Footer.vue";
  export default {
    components: { Hrader, Sidebar },
    data: () => ({ drawer: null }),
  };
</script>
<style>
  .scroll {
    margin-left: 2px;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #3d8493 0%, #0f2215 99%);
    border: solid 1px #e6e6e6;
    border-radius: 100px;
  }
</style>
