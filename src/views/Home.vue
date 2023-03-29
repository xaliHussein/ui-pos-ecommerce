<template>
  <v-container fluid>
    <v-row class="justify-center">
      <Navigation :products="products" />
    </v-row>
    <Card :items="items" />
  </v-container>
</template>

<script>
  import Navigation from "../components/home/Navigation";
  import Card from "../components/home/CardProduct";

  export default {
    components: { Navigation, Card },
    data() {
      return {
        items: [
          {
            id: 1,
            title: "Apple wache ",
            img: require("@/assets/product2.jpg"),
            price: 50,
          },
          {
            id: 2,
            title: "Brand",
            img: require("@/assets/proudct1.png"),
            price: 60,
          },
          {
            id: 3,
            title: "Ps5",
            img: require("@/assets/product3.jpg"),
            price: 800,
          },
          {
            id: 4,
            title: "Ps4",
            img: require("@/assets/ps4.jpg"),
            price: 400,
          },
          {
            id: 5,
            title: "iphone 14",
            img: require("@/assets/iphone14.jpg"),
            price: 1300,
          },
          {
            id: 6,
            title: "Ps5",
            img: require("@/assets/product3.jpg"),
            price: 800,
          },
          {
            id: 7,
            title: "Apple watch ",
            img: require("@/assets/product2.jpg"),
            price: 50,
          },
          {
            id: 8,
            title: "Ps5",
            img: require("@/assets/product3.jpg"),
            price: 800,
          },
          {
            id: 9,
            title: "Apple watch ",
            img: require("@/assets/product2.jpg"),
            price: 50,
          },
          {
            id: 10,
            title: "Ps5",
            img: require("@/assets/product3.jpg"),
            price: 800,
          },
          {
            id: 11,
            title: "Apple watch ",
            img: require("@/assets/product2.jpg"),
            price: 50,
          },
        ],
      };
    },
    computed: {
      products() {
        return this.$store.state.home.shopping_basket;
      },
    },
  };
</script>
