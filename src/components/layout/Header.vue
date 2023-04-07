<template>
  <div>
    <v-app-bar app clipped-right clipped-left elevation="1" color="white">
      <v-toolbar-title class="ml-5">POS</v-toolbar-title>
      <v-spacer></v-spacer>

      <font-awesome :icon="['far', 'calendar']" class="mr-1" />
      <h5 class="mr-2">
        {{ moment().format("MMMM Do YYYY,") }} {{ currentTime }}
      </h5>
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
