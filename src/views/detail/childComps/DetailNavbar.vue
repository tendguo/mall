<template>
  <div>
    <nav-bar>
      <div slot="left" class="detail-img" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-list">
        <div v-for="(item, index) in detailsItem" :key="item.id" class="detail-list-item" 
              :class="{active: index===curindex}"
              @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavbar',
  components: {
    NavBar
  },
  data() {
    return {
      detailsItem: ['商品', '参数', '评论', '推荐'],
      curindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.curindex = index

      this.$emit('itemClick', index);
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .detail-img{
    margin-top: 7px;

  }

  .detail-list{
    display: flex;
  }
  .detail-list-item{
    flex: 1;
    color: 14px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>