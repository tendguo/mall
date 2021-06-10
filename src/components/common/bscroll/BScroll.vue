<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BScroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 3
     
    },
    pullingUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullingUpLoad: this.pullingUpLoad
      
    }) 
    if(this.probeType == 2 || this.probeType ==3){
      this.scroll.on('scroll', (position) => {
        this.$emit('getposition', position)
      })
    }
    
    if(this.pullingUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    
  },
  methods:{
    scrTop(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPulling() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log(1)
      this.scroll && this.scroll.refresh()
    },
    getScrollPosition() {
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

