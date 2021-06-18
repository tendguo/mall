<template>
  <div class="coast" v-show="isShow">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },

  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      message: '',
      isShow: false,
      timer: null
    }
  },
  methods: {
    show(message, duration){
      clearTimeout(this.timer)
      this.message = message
      this.isShow = true

      this.timer = setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
      // clearInterval(timer)

      // this.timer = null

      

    }
  }

}
</script>

<style scoped>
  .coast{
    position: fixed;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .75);
    z-index: 999;
  }
  .message{
    color: #fff;
  }
</style>