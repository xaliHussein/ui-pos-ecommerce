<template>
  <v-navigation-drawer v-model="drawer" app clipped right permanent width="100">
    <v-list dense>
      <v-list-item-group mandatory v-model="model" color="#624fc6">
        <v-list-item
          two-line
          v-for="(opation, index) in opations"
          :key="index"
          :to="opation.link"
          @change="model == index"
          class="mt-3 px-0">
          <v-list-item-content>
            <Icon :icon="opation.icon" color="#1f424a" width="38" />
            <v-list-item-subtitle class="d-flex justify-center">
              <h3>{{ opation.title }}</h3>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <h4 class="version text-center">V.1.0</h4>
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
          { title: "الرئسية", icon: "ic:round-home", link: "/" },
          {
            title: "اضافة طلب",
            icon: "material-symbols:order-approve-rounded",
            link: "add_order",
          },

          {
            title: "عرض طلبات",
            icon: "material-symbols:order-play-rounded",
            link: "display_orders",
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .version {
    margin-top: 240px;
  }
</style>
