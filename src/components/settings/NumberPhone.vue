<template>
  <v-card-text>
    <v-form ref="user">
      <Input
        @update-value="phone_number = $event"
        :value="phone_number"
        type="text"
        label="رقم الهاتف"
        :rules="phoneNumberRules" />

      <v-text-field
        color="#624FC6"
        v-model="password"
        outlined
        reverse
        rounded
        single-line
        class="font-weight-black text-field"
        :type="showPassword ? 'text' : 'password'"
        label="كلمة المرور"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :rules="PasswordsRules" />

      <v-card-actions>
        <v-btn
          @click="update_phone_number"
          :loading="loading"
          color="#ad519c"
          large
          rounded
          class="px-10 mt-0 pt-0 mx-auto"
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
        password: null,
        showPassword: false,
        phoneNumberRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            (value || "").length >= 11 || "الحد الادنى لعدد الاحرف هوه 11",
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
        return this.$store.state.settings.lodding_number;
      },
      phone_number: {
        set(val) {
          this.$store.state.phone_number = val;
        },
        get() {
          return this.$store.state.phone_number;
        },
      },
    },
    methods: {
      update_phone_number() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["user_name"] = this.phone_number;
          data["password"] = this.password;
          this.$store.dispatch("settings/update_number", data);
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
