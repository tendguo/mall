<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item.id">
      <img :src="item" alt="">

    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default: null
    }
  },
  
}
</script>
<style scoped>
  .detail-swiper {
      height: 300px;
      overflow: hidden;
    }
</style>