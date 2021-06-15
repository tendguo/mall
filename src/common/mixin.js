import { debounce } from "common/utils.js"
import BackTop from 'components/content/backtop/BackTop'
export const imgListener = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('imageLoadFinish', this.itemImgListener)
    // console.log("guo")
  },
}

export const backTopmixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBack: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrTop(0, 0, 500)
    },
    listenerBackTop(position) {
      this.isShowBack = (-position.y) > 1000
    },
  }
}