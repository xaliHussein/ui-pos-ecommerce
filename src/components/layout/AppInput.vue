<template>
  <v-text-field
    color="#624FC6"
    class="font-weight-black text-field"
    :value="value"
    :type="type"
    :label="label"
    :prepend-icon="icon"
    @input="$emit('update-value', $event)"
    :hint="hint"
    reverse
    outlined
    rounded
    single-line
    persistent-hint
    :rules="rules" />
</template>
<script>
  export default {
    props: {
      type: String,
      label: String,
      icon: String,
      value: String,
      rules: {
        type: Array,
        required: false,
      },
      hint: {
        type: String,
        required: false,
      },
    },
    methods: {},
  };
</script>
<style scoped>
  .text-field >>> .error--text {
    text-align: right !important;
  }
</style>
