<template>
  <div class="page-container">
    <div class="hero-banner">
      <img :src="bannerImage" :alt="title" class="banner-image">
      <h1 class="page-title">{{ title }}</h1>
    </div>
    <div class="content">
      <div class="content-wrapper">
        <slot>
          <div class="placeholder-content">
            <h2>{{ title }}</h2>
            <p>This page is under construction. Content will be available soon.</p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  bannerImage: {
    type: String,
    default: new URL('/public/images/BG_others.jpg', import.meta.url).href
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  .hero-banner {
    padding: 10px 10px;
    background-color: #fff;
    position: relative;
    height: 33vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .banner-image {
      width: 72.5%;
      height: 100%;
      border-radius: 15px;
      object-fit: cover;
      object-position: 0 30%;
    }

    .page-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 40px;

    .content-wrapper {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      padding: 30px;
    }

    .placeholder-content {
      text-align: center;
      padding: 40px;
      color: #666;

      h2 {
        color: #333;
        margin-bottom: 20px;
      }
    }
  }
}
</style> 