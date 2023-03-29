<template>
  <v-navigation-drawer v-model="drawer" app clipped left permanent width="100">
    <v-list dense>
      <v-list-item-group mandatory v-model="model" color="#3D8493">
        <v-list-item
          two-line
          v-for="(opation, index) in opations"
          :key="index"
          :to="opation.link"
          @change="model == index">
          <v-list-item-content>
            <font-awesome :icon="['fas', opation.icon]" class="fa-xl mb-2" />
            <v-list-item-subtitle class="d-flex justify-center">
              {{ opation.title }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <h4 class="mt-16 text-center">V.1.0</h4>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    data() {
      return {
        model: 0,
        drawer: 0,
        opations: [
          { title: "Home", icon: "house", link: "/" },
          { title: "Menu", icon: "file-lines", link: "menu" },
          { title: "Payment", icon: "credit-card", link: "payment" },
          { title: "Order", icon: "border-all", link: "order" },
          { title: "Chart", icon: "chart-line", link: "chart" },
          { title: "Settings", icon: "gear", link: "settings" },
        ],
      };
    },
  };
</script>
