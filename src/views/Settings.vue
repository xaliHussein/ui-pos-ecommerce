<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card width="100%" class="card">
          <v-img height="200px" src="../assets/Desktop.png">
            <v-card-title class="white--text mt-16 d-flex justify-end">
              <h3 class="mr-3 mt-6">{{ user_name }}</h3>

              <v-avatar size="100">
                <img alt="user" src="@/assets/img_login.jpg" />
              </v-avatar>
            </v-card-title>
          </v-img>

          <v-card-text>
            <v-tabs
              v-model="tab"
              style="direction: rtl"
              class="d-flex justify-start">
              <v-tabs-slider color="#ad519c"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item" style="color: #000000">
                <h3>{{ item }}</h3>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item
                transition="scroll-x-transition"
                v-for="(item, index) in items"
                :key="index">
                <v-card flat style="margin-left: 810px" width="400">
                  <Profile v-if="index == 0" />
                  <NumberPhone v-if="index == 1" />
                  <Password v-if="index == 2" />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import Profile from "../components/settings/Profile";
  import NumberPhone from "../components/settings/NumberPhone";
  import Password from "../components/settings/Password";
  export default {
    components: { Profile, NumberPhone, Password },
    data() {
      return {
        tab: 0,
        items: ["ملف الشخصي", "رقم الهاتف", "كلمة المرور"],
      };
    },
    computed: {
      user_name() {
        return this.$store.state.user_name;
      },
    },
  };
</script>
<style scoped>
  .card {
    box-shadow: 0px 0px !important;
    margin: auto;
  }
  .text-field >>> .error--text {
    text-align: right !important;
  }
</style>
