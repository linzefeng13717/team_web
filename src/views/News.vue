<template>
  <section class="news-page">
    <div class="news-shell">
      <header class="page-heading">
        <!-- <p class="eyebrow">HCCLAB · NEWS</p> -->
        <h1>团队新闻</h1>
        <!-- <p class="intro">记录实验室的科研进展、学术交流与团队成长</p> -->
      </header>

      <nav class="category-tabs" aria-label="新闻分类">
        <button
          v-for="category in categories"
          :key="category.value"
          type="button"
          :class="{ active: activeCategory === category.value }"
          @click="activeCategory = category.value"
        >
          {{ category.label }}
          <span>{{ categoryCount(category.value) }}</span>
        </button>
      </nav>

      <article v-if="featuredNews" class="featured-card">
        <div class="featured-image">
          <img :src="featuredNews.image" :alt="featuredNews.title">
          <span class="featured-label">重点关注</span>
        </div>
        <div class="featured-content">
          <div class="news-meta">
            <span class="news-category">{{ featuredNews.category }}</span>
            <time :datetime="featuredNews.date">{{ formatDate(featuredNews.date) }}</time>
          </div>
          <h2>{{ featuredNews.title }}</h2>
          <p>{{ featuredNews.summary }}</p>
          <button class="read-more" type="button" @click="openNews(featuredNews.id)">
            阅读新闻 <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>

      <div v-if="regularNews.length" class="news-list">
        <article v-for="item in regularNews" :key="item.id" class="news-card">
          <div class="card-image">
            <img :src="item.image" :alt="item.title" loading="lazy">
            <span class="date-badge">
              <strong>{{ dayOf(item.date) }}</strong>
              {{ monthOf(item.date) }}
            </span>
          </div>
          <div class="card-content">
            <div class="news-meta">
              <span class="news-category">{{ item.category }}</span>
              <time :datetime="item.date">{{ formatDate(item.date) }}</time>
            </div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <button class="text-link" type="button" @click="openNews(item.id)">
              查看详情 <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <span aria-hidden="true">✦</span>
        <p>该分类暂无新闻，敬请期待</p>
      </div>

      <el-dialog v-model="detailVisible" :title="selectedNews?.title" width="min(560px, 90%)">
        <div v-if="selectedNews" class="news-detail">
          <div class="news-meta">
            <span class="news-category">{{ selectedNews.category }}</span>
            <time :datetime="selectedNews.date">{{ formatDate(selectedNews.date) }}</time>
          </div>
          <p>{{ selectedNews.summary }}</p>
          <p class="detail-note">更多新闻内容正在整理中，敬请关注实验室后续更新。</p>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeCategory = ref('全部')
const selectedNews = ref(null)
const detailVisible = ref(false)

const categories = [
  { label: '全部动态', value: '全部' },
  { label: '科研进展', value: '科研进展' },
  { label: '学术交流', value: '学术交流' },
  { label: '团队活动', value: '团队活动' }
]

const newsItems = [
  {
    id: 1,
    title: '实验室智能计算研究取得新进展',
    summary: '团队围绕高效能智能计算架构持续开展研究，在计算效率与系统协同设计方面取得阶段性成果。',
    category: '科研进展',
    date: '2026-07-23',
    image: '/images/BG_1.jpg',
    featured: true
  },
  {
    id: 2,
    title: '实验室多项研究成果获国际学术会议接收',
    summary: '相关工作聚焦体系结构、并行计算与高效算法，展示了团队在智能计算领域的持续探索。',
    category: '科研进展',
    date: '2026-07-18',
    image: '/images/BG_2.png'
  },
  {
    id: 3,
    title: '团队开展前沿技术专题学术研讨',
    summary: '师生围绕空间智能、感存算协同与智能编译等方向展开交流，共同探讨新的研究问题。',
    category: '学术交流',
    date: '2026-06-12',
    image: '/images/BG_3.jpg'
  },
  {
    id: 4,
    title: '实验室举办春季团队交流活动',
    summary: '在轻松开放的氛围中，团队成员分享研究心得与成长感悟，进一步增进协作与凝聚力。',
    category: '团队活动',
    date: '2026-05-06',
    image: '/images/4.png'
  },
  {
    id: 5,
    title: '青年学者来访并作学术报告',
    summary: '报告分享了智能系统领域的最新研究成果，并与实验室师生就关键技术问题进行了深入讨论。',
    category: '学术交流',
    date: '2026-04-19',
    image: '/images/1.png'
  }
]

const filteredNews = computed(() => (
  activeCategory.value === '全部'
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory.value)
))

const featuredNews = computed(() => filteredNews.value.find((item) => item.featured) || filteredNews.value[0])
const regularNews = computed(() => filteredNews.value.filter((item) => item.id !== featuredNews.value?.id))

const categoryCount = (category) => category === '全部'
  ? newsItems.length
  : newsItems.filter((item) => item.category === category).length

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

const formatDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00`))
const dayOf = (date) => date.slice(8, 10)
const monthOf = (date) => `${date.slice(5, 7)}月`

const openNews = (id) => {
  selectedNews.value = newsItems.find((item) => item.id === id) || null
  detailVisible.value = Boolean(selectedNews.value)
}
</script>

<style lang="scss" scoped>
.news-page {
  min-height: calc(100vh - 60px);
  padding: 42px 0 72px;
  background:
    radial-gradient(circle at 8% 2%, rgba(64, 158, 255, 0.09), transparent 25%),
    #f5f7fa;
  color: #2c3e50;
}

.news-shell {
  width: min(1200px, calc(100% - 80px));
  margin: 0 auto;
}

.page-heading {
  margin-bottom: 30px;
  text-align: center;

  .eyebrow {
    margin: 0 0 8px;
    color: #409eff;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  h1 {
    position: relative;
    margin: 0 0 24px;
    color: #2c3e50;
    font-size: 2rem;
    line-height: 1.25;

    &::after {
      content: '';
      position: absolute;
      bottom: -11px;
      left: 50%;
      width: 60px;
      height: 3px;
      border-radius: 2px;
      background: #004380;
      transform: translateX(-50%);
    }
  }

  .intro {
    margin: 0;
    color: #748294;
    font-size: 1rem;
  }
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 17px;
    border: 1px solid #dce5ee;
    border-radius: 22px;
    background: #fff;
    color: #536273;
    font-size: 0.95rem;
    cursor: pointer;
    transition: 0.2s ease;

    span {
      min-width: 20px;
      padding: 2px 5px;
      border-radius: 10px;
      background: #edf2f7;
      color: #8391a1;
      font-size: 0.75rem;
    }

    &:hover,
    &.active {
      border-color: #004380;
      background: #004380;
      color: #fff;
      box-shadow: 0 5px 14px rgba(0, 67, 128, 0.18);

      span {
        background: rgba(255, 255, 255, 0.18);
        color: #fff;
      }
    }
  }
}

.featured-card {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  min-height: 360px;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(31, 55, 78, 0.1);
}

.featured-image,
.card-image {
  position: relative;
  overflow: hidden;
  background: #dfe8f0;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.45s ease;
  }
}

.featured-card:hover img,
.news-card:hover img {
  transform: scale(1.035);
}

.featured-label {
  position: absolute;
  top: 22px;
  left: 22px;
  padding: 7px 13px;
  border-radius: 4px;
  background: #004380;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
}

.featured-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 42px;

  h2 {
    margin: 16px 0;
    color: #26384a;
    font-size: 1.75rem;
    line-height: 1.45;
  }

  > p {
    margin: 0 0 26px;
    color: #667587;
    font-size: 1rem;
    line-height: 1.8;
  }
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #96a2af;
  font-size: 0.86rem;
}

.news-category {
  color: #0879c9;
  font-weight: 700;
}

.read-more,
.text-link {
  align-self: flex-start;
  border: 0;
  background: transparent;
  color: #004380;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  span {
    display: inline-block;
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover span {
    transform: translateX(4px);
  }
}

.read-more {
  padding: 11px 18px;
  border-radius: 5px;
  background: #004380;
  color: #fff;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.news-card {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  min-height: 220px;
  overflow: hidden;
  border: 1px solid #edf1f5;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 14px rgba(31, 55, 78, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 9px 24px rgba(31, 55, 78, 0.1);
  }
}

.date-badge {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 52px;
  padding: 7px 0;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.94);
  color: #647486;
  text-align: center;
  font-size: 0.72rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);

  strong {
    display: block;
    color: #004380;
    font-size: 1.28rem;
    line-height: 1.05;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 22px;

  h2 {
    margin: 11px 0 9px;
    color: #2d3e50;
    font-size: 1.12rem;
    line-height: 1.5;
  }

  > p {
    display: -webkit-box;
    overflow: hidden;
    margin: 0 0 14px;
    color: #748294;
    font-size: 0.9rem;
    line-height: 1.65;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .text-link {
    margin-top: auto;
    padding: 0;
  }
}

.empty-state {
  padding: 70px 20px;
  border-radius: 10px;
  background: #fff;
  color: #91a0af;
  text-align: center;

  span {
    color: #409eff;
    font-size: 2rem;
  }
}

.news-detail {
  color: #5f6e7e;
  line-height: 1.8;

  > p {
    margin: 20px 0 0;
  }

  .detail-note {
    padding-top: 16px;
    border-top: 1px solid #edf1f5;
    color: #94a0ad;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 1000px) {
  .news-list {
    grid-template-columns: 1fr;
  }

  .featured-card {
    min-height: 320px;
  }

  .featured-content {
    padding: 32px;
  }
}

@media screen and (max-width: 700px) {
  .news-page {
    padding: 28px 0 48px;
  }

  .news-shell {
    width: calc(100% - 30px);
  }

  .page-heading h1 {
    font-size: 1.7rem;
  }

  .category-tabs {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;

    button {
      flex: 0 0 auto;
    }
  }

  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-image {
    min-height: 230px;
  }

  .featured-content {
    padding: 26px 22px 28px;

    h2 {
      font-size: 1.35rem;
    }
  }

  .news-card {
    grid-template-columns: 1fr;
  }

  .card-image {
    height: 210px;
  }
}
</style>
