<template>
  <page-base title="实验室首页">
    <div class="home">
      <div class="title"><h1>高效能智能计算架构实验室<br/>High-Performance Compute & Cognitive Lab, HCCLab</h1></div>
      <Carousel :slides="carouselSlides" />
      <div class="about-section">
        <h2>实验室简介</h2>
        <p class="about-text">
          华南理工大学高效能认知计算实验室（High-Performance Compute & Cognitive Lab, HCCLab）聚焦新一代人工智能与空间智能的高效能计算研究，推动计算与认知融合，构建兼具计算效率与高效认知能力的智能系统。具体研究方向包括面向空间智能的计算体系结构、感存算协同设计、智能计算编译技术和高效能智能计算等。实验室由陈岑教授负责。<br/>我们欢迎积极主动、富有探索精神的本科生、硕博研究生、博士后研究人员和科研助理加入团队，共同开展具有学术价值与现实影响力的前沿研究。我们也欢迎相关领域的学生和研究人员与实验室开展科研实习、学术访问及合作交流。若有意加入本实验室，欢迎查阅“加入我们”页面。
        </p>
        <p class="slogan">探索科技前沿，培养创新人才</p>
      </div>
    </div>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
import Carousel from '@/components/Carousel.vue'

const carouselSlides = [
  {
    image: new URL('/public/images/1.png', import.meta.url).href,
    alt: '实验室图片 1'
  },
  {
    image: new URL('/public/images/2.png', import.meta.url).href,
    alt: '实验室图片 2'
  },
  {
    image: new URL('/public/images/4.png', import.meta.url).href,
    alt: '实验室图片 3'
  },
  {
    image: new URL('/public/images/8.png', import.meta.url).href,
    alt: '实验室图片 4'
  },  {
    image: new URL('/public/images/9.png', import.meta.url).href,
    alt: '实验室图片 5'
  },
]
</script>

<style lang="scss" scoped>
.home {
  :deep(.carousel) {
    width: 100%;
    margin: 0 0 32px;
  }

  .title {
    h1 {
      text-align: center;
      font-size: 2.5rem;
      color: #004380;
      // margin-bottom: 20px;
    }    
  }

  .about-section {
    text-align: left;
    padding: 20px 0;

    h1 {
      text-align: center;
      font-size: 2.5rem;
      color: #004380;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }

    .about-text {
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .slogan {
      text-align: center;
      font-style: italic;
      font-size: 1.5rem;
      color: #666;
    }
  }
}
</style>
