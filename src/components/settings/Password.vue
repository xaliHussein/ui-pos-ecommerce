<template>
  <v-card-text>
    <v-form ref="form">
      <v-text-field
        class="font-weight-black text-field"
        v-model="oldPassword"
        outlined
        reverse
        rounded
        single-line
        color="black"
        type="text"
        label="كلمة المرور القديمه"
        :rules="PasswordsRules" />

      <v-text-field
        color="#624FC6"
        v-model="newPassword"
        outlined
        reverse
        rounded
        single-line
        class="font-weight-black text-field"
        :type="showPassword ? 'text' : 'password'"
        label="كلمة المرور الجديدة"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :rules="PasswordsRules" />
      <v-text-field
        color="#624FC6"
        v-model="confirmPassword"
        outlined
        reverse
        rounded
        single-line
        class="font-weight-black text-field"
        :type="showPassword2 ? 'text' : 'password'"
        label="تاكيد كلمة المرور"
        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword2 = !showPassword2"
        :rules="confirmPasswordRules" />

      <v-card-actions>
        <v-btn
          @click="update_password"
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
  export default {
    data() {
      return {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showPassword: false,
        showPassword2: false,
        PasswordsRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            (value || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
        ],
        confirmPasswordRules: [
          (value) => !!value || "هذا الحقل مطلوب",
          (value) =>
            (value || "").length >= 6 || "الحد الادنى لعدد الاحرف هوه 6",
          (value) => value == this.newPassword || "كلمة المرور غير متطابقه",
        ],
      };
    },
    computed: {
      loading() {
        return this.$store.state.settings.update_passwoerd;
      },
    },
    methods: {
      update_password() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["old_password"] = this.oldPassword;
          data["new_password"] = this.newPassword;
          this.$store.dispatch("settings/update_passwoerd", data);
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
