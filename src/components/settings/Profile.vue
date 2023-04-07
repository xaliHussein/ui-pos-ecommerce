<template>
  <v-card-text>
    <v-form ref="user">
      <Input
        @update-value="userName = $event"
        :value="user_name"
        type="text"
        label="اسم المستخدم"
        :rules="userNameRules" />

      <v-text-field
        color="#624FC6"
        v-model="password"
        outlined
        reverse
        rounded
        single-line
        class="font-weight-black text-field pb-0"
        :type="showPassword ? 'text' : 'password'"
        label="كلمة المرور"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :rules="PasswordsRules" />

      <v-card-actions>
        <v-btn
          @click="update_profile"
          :loading="loading"
          color="#ad519c"
          large
          rounded
          class="px-10 mx-auto"
          elevation="4">
          <h4 style="color: white; font-size: 17px">حفظ</h4>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon color="white">mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card-text>
</template>
<script>
  import Input from "@/components/layout/AppInput";
  export default {
    components: { Input },
    data() {
      return {
        userName: null,
        password: null,
        showPassword: false,
        userNameRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            (value || "").length >= 3 || "الحد الادنى لعدد الاحرف هوه 3",
        ],
        PasswordsRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            (value || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
      };
    },
    computed: {
      loading() {
        return this.$store.state.settings.lodding_username;
      },
      user_name: {
        set(val) {
          this.$store.state.user_name = val;
        },
        get() {
          return this.$store.state.user_name;
        },
      },
    },
    methods: {
      update_profile() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["user_name"] = this.userName;
          data["password"] = this.password;
          this.$store.dispatch("settings/update_username", data);
          this.$refs.form.reset();
        }
      },
    },
  };
</script>
<style scoped>
  .text-field >>> .error--text {
    text-align: right !important;
  }
</style>
