<template>
  <div class="goods">
    <good-list-item v-for="item in goods"  :key="item.id" :goodlist="item"/>
    
  </div>
</template>

<script>

import GoodListItem from 'components/content/goodlist/GoodListItem'
export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },

  props: {
    goods: {
      type: Array,
      default() {
        return null
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>