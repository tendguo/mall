<template>
  <div class="check-button" >
    <img src="~assets/img/cart/tick.svg" alt="" :class="{check: ischecked}">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    ischecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button{
    /* background-color: red; */
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .check{
    border-radius: 50%;
    background-color: var(--color-tint);
  }
</style>