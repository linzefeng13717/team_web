<template>
  <div class="carousel">
    <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
        <div class="img_container">
          <img :src="slide.image" :alt="slide.alt" class="carousel-image">
        </div>
        <div class="carousel-content">
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <button class="carousel-button prev" @click="prev" aria-label="Previous slide">
      <span>&lt;</span>
    </button>
    <button class="carousel-button next" @click="next" aria-label="Next slide">
      <span>&gt;</span>
    </button>

    <!-- 指示器 -->
    <div class="carousel-indicators">
      <button v-for="(_, index) in slides" :key="index" class="indicator" :class="{ active: currentIndex === index }"
        @click="goToSlide(index)" :aria-label="'Go to slide ' + (index + 1)"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
let autoPlayTimer = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0
    ? props.slides.length - 1
    : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayTimer = setInterval(next, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: calc(80% + 80px);
  height: 45vh;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 -40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .carousel-container {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide {
    min-width: 100%;
    position: relative;

    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .carousel-content {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      padding-top: 8px;
      pointer-events: none;
      z-index: 2;
    }
  }

  .img_container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    /* 从左到右渐变：透明到70%黑色 */
    pointer-events: none; /* 确保遮罩不会干扰鼠标事件 */
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.3);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    transition: background-color 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    &.prev {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }

  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;

    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: background-color 0.3s;

      &.active {
        background: white;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>