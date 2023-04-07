<template>
  <v-navigation-drawer v-model="drawer" app clipped left permanent width="107">
    <v-list dense>
      <v-list-item-group mandatory v-model="model" color="#624fc6">
        <v-list-item
          class="px-0"
          @change="model == index"
          @click="get_all_products">
          <v-list-item-content>
            <Icon
              icon="material-symbols:border-all-outline-rounded"
              color="#1f424a"
              width="33" />

            <v-list-item-subtitle class="d-flex justify-center py-2">
              <h3>الكل</h3>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <div v-if="loading_categories == true">
          <v-list-item v-for="(n, index) in 6" :key="index">
            <v-list-item-content>
              <v-skeleton-loader class="ml-3" type="avatar">
              </v-skeleton-loader>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-list-item
          two-line
          v-for="(category, index) in categories"
          :key="index"
          @change="model == index"
          @click="get_product(category.id)"
          class="px-0">
          <v-list-item-content v-if="loading_categories == false">
            <v-img
              width="33"
              height="70"
              :src="server + category.icone"></v-img>

            <v-list-item-subtitle class="d-flex justify-center py-2">
              <h3>{{ category.name }}</h3>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    props: {
      categories: {
        type: Array,
      },
      loading_categories: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        model: 0,
        drawer: 0,
      };
    },
    created() {
      this.$store.dispatch("home/get_products");
    },
    computed: {
      server() {
        return this.$store.state.server;
      },
    },
    methods: {
      get_all_products() {
        this.$store.state.home.category_id = "";
        this.$store.dispatch("home/get_products");
      },
      get_product(id) {
        this.$store.state.home.category_id = id;
        this.$store.dispatch("home/get_products");
      },
    },
  };
</script>
