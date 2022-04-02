<template>
 <div class="c-modal">
   <div class="c-container">
    <svg @click="$emit('close')" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" fill="#f4f5f7"><g id="info"/><g id="icons"><path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z" id="exit"/></g></svg>
      <b-carousel
        no-animation
        :indicators="slides.length > 1"
        img-width="90%"
        img-height="70%"
        :controls="slides.length > 1"
      >
        <b-carousel-slide
          v-for="(i,k) in slides"
          :key="k"
          :img-src="i"
        >
        <template #img>
          <img
            style="width: 100%;height:70vh;padding: 120px;object-fit:contain;"
            :src="i"
          >
        </template>
      </b-carousel-slide>
      </b-carousel>
  </div>
 </div>
</template>
<script>
export default {
  props:{
    slides: {
      type:Array,
      required: true
    }
  }
}
</script>
<style lang='scss' scoped>
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.469);
}

.c-container{
  width: 90%;
  z-index: 101;
  position: relative;
  background: #1a1e34;
  border-radius: 20px;
  svg{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}

</style>
