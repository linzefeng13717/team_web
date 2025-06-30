<template>
  <div class="home">
    <!-- 顶部大图区域 -->
    <div class="hero-container">
      <Carousel :slides="carouselSlides" :autoPlayInterval="5000" />
    </div>

    <!-- 主要内容区域 -->
    <div class="content-section">
      <!-- 实验室介绍 独占一行 -->
      <div class="about-section">
        <h1 style="text-align:center;font-size:2.5rem;color:#004380;margin-bottom:20px;">高效能智能计算架构实验室</h1>
        <h2>实验室简介</h2>
        <p class="about-text">
          欢迎来到华南理工大学未来技术学院高效能智能计算架构实验室！我们致力于人工智能、高性能计算、大数据分析等前沿领域的研究与创新。
        </p>
        <p class="slogan">探索科技前沿，培养创新人才</p>
      </div>

      <!-- 研究方向 和 新闻动态 并排 -->
      <div class="info-grid">
        <div class="research-section">
          <div class="section-card">
            <h2>研究方向</h2>
            <ul class="research-list">
              <li v-for="(research, index) in researchAreas" 
                  :key="index"
                  class="research-item">
                <h3>{{ research.title }}</h3>
                <p>{{ research.description }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="news-section">
          <div class="section-card">
            <h2>新闻动态</h2>
            <ul class="news-list">
              <li v-for="(news, index) in newsItems" 
                  :key="index"
                  @click="showNewsDetail(news)"
                  class="news-item">
                <span class="news-title">{{ news.title }}</span>
                <span class="news-date">{{ news.date }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 其他信息 -->
      <div class="other-info-section">
        <div class="section-card">
          <h2>其他信息</h2>
          <div class="info-content">
            <div class="info-item">
              <h3>联系方式</h3>
              <p>chencen@scut.edu.cn</p>
              <p>实验室地址：XX大学XX楼</p>
            </div>
            <div class="info-item">
              <h3>加入我们</h3>
              <p>欢迎有志于科研的同学报考本实验室硕博研究生！</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新闻详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedNews?.title"
      width="50%"
      class="news-dialog"
      :close-on-click-modal="true"
      :show-close="false">
      <div class="dialog-content">
        <div class="dialog-body" v-html="selectedNews?.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Carousel from '@/components/Carousel.vue'

export default {
  components: {
    Footer,
    Carousel
  },
  data() {
    return {
      carouselSlides: [
        {
          image: new URL('/public/images/BG_1.jpg', import.meta.url).href,
          alt: '实验室环境 1'
        },
        {
          image: new URL('/public/images/BG_2.png', import.meta.url).href,
          alt: '实验室环境 2'
        },
        {
          image: new URL('/public/images/BG_3.jpg', import.meta.url).href,
          alt: '实验室环境 3'
        }
      ],
      researchAreas: [
        {
          title: "人工智能",
          description: `研究深度学习、强化学习等前沿AI技术，\n探索其应用。`
        },
        {
          title: "大数据",
          description: "研究海量数据处理、实时分析和可视化技术。"
        },
        {
          title: "体系结构",
          description: "专注于新型计算体系结构的设计与优化。"
        },
        {
          title: "并行与分布式计算",
          description: "关注大规模并行计算、分布式系统优化和性能调优。"
        }
      ],
      dialogVisible: false,
      selectedNews: null,
      newsItems: [
        {
          title: "实验室获得国家自然科学基金重点项目资助",
          date: "2024-03-15",
          content: `
            <p>我们实验室成功获得国家自然科学基金重点项目资助，项目将聚焦于人工智能领域的前沿研究。</p>
            <p>这是对我们团队研究实力的重要认可。</p>
          `
        },
        {
          title: "实验室成员在国际顶级会议发表论文",
          date: "2024-03-10",
          content: `
            <p>恭喜实验室博士生在国际顶级会议发表重要研究成果！</p>
          `
        },
        {
          title: "实验室举办学术研讨会",
          date: "2024-03-05",
          content: `
            <p>我们成功举办了年度学术研讨会，多位领域专家分享了最新研究成果。</p>
          `
        }
      ]
    }
  },
  methods: {
    showNewsDetail(news) {
      this.selectedNews = news
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: white;

  .hero-container {
    align-content: center;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 10px 40px;
    background-color: white;
    margin-bottom: 30px;
  }

  .hero-section {
    position: relative;
    height: 66vh;
    overflow: hidden;
    border-radius: 15px;

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

      .conference-title {
        font-size: 6rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        .hero-logo {
          height: 7rem;
          filter: brightness(0) invert(1);
        }

        span {
          font-size: 6rem;
          line-height: 1;
        }
      }

      .conference-date,
      .conference-location {
        font-size: 2rem;
        margin: 0.5rem 0;
      }
    }
  }

  .content-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 40px;
    background-color: white;
    margin-bottom: 40px;

    .about-section {
      margin-bottom: 0;
      text-align: left;
      padding: 20px 0;

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

      .theme-highlight {
        color: #409EFF;
        font-weight: 900;
        font-family: 'Playfair Display', serif;
        font-size: 1.2em;
        letter-spacing: 1px;
        display: inline;
        margin: 0 5px;
        font-style: italic;
        text-shadow: 2px 2px 4px rgba(64, 158, 255, 0.2);
      }

      .year-text {
        font-size: 0.8em;
        font-weight: normal;
        color: #666;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 60px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .section-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      padding: 20px;
      height: 100%;

      h2 {
        margin-bottom: 20px;
        padding: 8px 15px;
        border-radius: 6px;
        background: #004380;
        color: white;
        font-size: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 67, 128, 0.2);
      }
    }

    .research-list,
    .news-list {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
      }
    }

    .research-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .research-item {
        flex: 1;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        h3 {
          color: #004380;
          margin-bottom: 10px;
          font-size: 1.2rem;
        }

        p {
          color: #666;
          line-height: 1.6;
        }
      }
    }

    .news-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .news-item {
        cursor: pointer;
        padding: 12px 15px;
        margin-bottom: 10px;
        border-radius: 6px;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(0, 67, 128, 0.05);
          transform: translateX(5px);
        }

        .news-title {
          font-weight: 500;
          color: #004380;
        }

        .news-date {
          color: #666;
          font-size: 0.9rem;
        }
      }
    }
  }
}

.other-info-section {
  margin-top: 30px;

  .info-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .info-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;

      h3 {
        color: #004380;
        margin-bottom: 15px;
        font-size: 1.2rem;
      }

      p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 10px;
      }
    }
  }
}

:deep(.news-dialog) {
  .el-dialog__header {
    background-color: #004380;
    margin: 0;
    padding: 20px;
    border-radius: 8px 8px 0 0;

    .el-dialog__title {
      color: white;
      font-size: 1.2rem;
    }
  }

  .el-dialog__body {
    padding: 30px;

    .dialog-content {
      .dialog-body {
        line-height: 1.6;

        p {
          margin: 10px 0;
        }
      }
    }
  }
}
</style> 