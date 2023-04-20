<template>
  <div>
    <v-app-bar app clipped-right clipped-left elevation="1" color="white">
      <v-toolbar-title class="ml-5">POS</v-toolbar-title>
      <v-spacer></v-spacer>

      <font-awesome :icon="['far', 'calendar']" class="mr-1" />
      <h5 class="mr-2">
        {{ moment().format("MMMM Do YYYY,") }} {{ currentTime }}
      </h5>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logout" v-bind="attrs" v-on="on">
            <font-awesome
              :icon="['fas', 'fa-right-from-bracket']"
              color="#624fc6"
              size="xl" />
          </v-btn>
        </template>
        <span>خروج</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTime: null,
      };
    },
    mounted() {
      this.getCurrentTime();
    },

    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
      getCurrentTime() {
        const options = {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        };
        const now = new Date();
        this.currentTime = now.toLocaleTimeString("en-US", options);
        setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString("en-US", options);
        }, 1000);
      },
    },
  };
</script>
