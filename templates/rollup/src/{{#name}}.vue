<template>
  <div :class="styles.container">{{ text }}</div>
</template>

<script>
import styles from './<#=name#>.styl'

export default {
  name: '<#=name#>',
  props: {
      text: String
  },
  data() {
    return {
      styles: {
        container: styles.container
      }
    }
  }
}
</script>


