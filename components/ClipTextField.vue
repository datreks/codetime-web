<template>
  <div>
    <v-text-field
      v-model="val"
      hide-details
      readonly
      :label="label"
      outlined
      dense
      append-icon="mdi-content-cut"
      @click:append="clip"
    ></v-text-field>
    <v-scroll-x-transition>
      <v-alert
        v-if="clipped"
        style="
          position: fixed;
          z-index: 2;
          margin-left: 24px;
          top: 64px;
          right: 24px;
        "
        prominent
        outlined
        text
        type="success"
      >
        <v-row align="center">
          <v-col class="grow"> 复制成功 </v-col>
        </v-row>
      </v-alert>
    </v-scroll-x-transition>
  </div>
</template>
<script>
export default {
  props: {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  data() {
    return { clipped: false };
  },
  computed: {
    val() {
      return this.value;
    },
  },
  methods: {
    clip() {
      this.execCopy(this.val);
    },
    execCopy(text) {
      const input = document.createElement("input");
      input.style.opacity = "0";
      input.style.position = "absolute";
      document.body.appendChild(input);
      input.value = text;
      input.select();
      input.setSelectionRange(0, text.length);
      document.execCommand("copy");
      document.body.removeChild(input);
      this.clipped = true;
      setTimeout(() => (this.clipped = false), 1000);
      return true;
    },
  },
};
</script>
