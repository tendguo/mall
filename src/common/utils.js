/*防抖函数debounce 当调用的非常频繁的时候，
就使用防抖函数对调用很频繁的函数进行一次封装，然后使用封装过的新函数*/   
export function debounce(fn, time){
  let timer = null
  return function(...args) {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
} 