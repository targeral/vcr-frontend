<template>
  <div>
    <div
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @transitionend="onTransitionEnd"
    >
      <slot />
    </div>
    <div
      v-if="showIndicators && count > 1"
    >
      <i
        v-for="index in count"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      autoplay: N
    }
  }
</script>