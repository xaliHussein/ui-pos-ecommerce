<template>
  <v-app id="inspire" class="app">
    <Hrader v-if="loggedIn" />
    <v-main>
      <router-view />
      <Sidebar v-if="loggedIn" />
      <SnackBar v-if="snackBar" :snack_message="snack_message" />
    </v-main>
  </v-app>
</template>

<script>
  import Hrader from "./components/layout/Header.vue";
  import Sidebar from "./components/layout/Sidebar.vue";
  import SnackBar from "./components/layout/SnackBar.vue";

  export default {
    components: { Hrader, Sidebar, SnackBar },
    data() {
      return {
        drawer: null,
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.user_name;
      },
      snackBar() {
        return this.$store.getters.snack_bar;
      },
      snack_message() {
        return this.$store.state.snack_message;
      },
    },
  };
</script>
<style>
  .app {
    font-family: "Cairo", sans-serif;
  }
  .scroll {
    margin-left: 2px;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #ad519c 0%, #624fc6 99%);
    border: solid 1px #e6e6e6;
    border-radius: 100px;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
