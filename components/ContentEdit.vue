<template>
  <div contenteditable :placeholder="placeholder" @keypress="onEdit" v-text="txt"></div>
</template>

<script>
export default {
  props: {
    placeholder: String
  },
  data() {
    return {
      txt: ''
    }
  },
  // computed: {
  //   replace_text() {
  //     return this.$el.textContent.replace(/[^А-Яа-я]/g, '')
  //   }
  // },
  methods: {
    onEdit(evt) {
      const src = evt.target.textContent
      // this.$el.textContent.trim().replace(/[^А-Яа-я]/g, '')
      this.txt = src
      this.$emit('input', src)
    }
  }
}
</script>

<style scoped="true">
[contenteditable] {
  cursor: text;
}

[contenteditable]:empty:before {
  content: attr(placeholder);
  color: rgba(50, 50, 50, 0.5);
}
</style>
