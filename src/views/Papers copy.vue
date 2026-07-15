<template>
  <section class="publications-page">
    <div class="publications-shell">
      <h1>Publications</h1>

      <!-- <p class="scholar-note">
        You can also find publications on
        <a href="https://scholar.google.com/" target="_blank" rel="noreferrer">Google Scholar</a>
        which may include some preprints not yet listed here.
      </p> -->

      <div class="filter-panel">
        <div class="filter-heading">
          <span class="stack-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span>Filter by Research Area:</span>
        </div>

        <div class="filter-tabs" role="tablist" aria-label="Filter publications by research area">
          <button
            v-for="filter in filters"
            :key="filter.value"
            class="filter-tab"
            :class="{ active: activeFilter === filter.value }"
            type="button"
            role="tab"
            :aria-selected="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="publication-list">
        <article v-for="paper in filteredPapers" :key="paper.title" class="publication-item">
          <div class="paper-thumb" :class="paper.visual">
            <span class="thumb-line"></span>
            <span class="thumb-node"></span>
            <span class="thumb-grid"></span>
          </div>

          <div class="paper-content">
            <div class="title-row">
              <h2>{{ paper.title }}</h2>
              <span class="area-tag" :class="paper.areaClass">{{ paper.area }}</span>
            </div>
            <p class="authors" v-html="paper.authors"></p>
            <p class="venue" v-html="paper.venue"></p>
          </div>

          <div class="paper-year">{{ paper.year }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import publicationSource from '../data/publications.json'

const activeFilter = ref('all')

const filters = [
  { label: 'All Publications', value: 'all' },
  { label: '体系结构', value: '体系结构' },
  { label: 'efficient algorithm', value: 'efficient algorithm' },
  { label: '高性能并行与分布式计算', value: '高性能并行与分布式计算' }
]

const emphasizedAuthors = new Set([
  'Cen Chen',
  'Cen Chen 0002',
  'Xiaofeng Zou',
  'Yangfan Li',
  'Ziqian Zeng',
  'Huiping Zhuang'
])

const htmlEscape = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const authorLabel = (author) => {
  const cleanAuthor = author.trim()
  const normalizedAuthor = cleanAuthor.replace(/^and\s+/i, '')
  const escapedAuthor = htmlEscape(cleanAuthor)

  return emphasizedAuthors.has(normalizedAuthor) ? `<strong>${escapedAuthor}</strong>` : escapedAuthor
}

const formatAuthors = (authors) => String(authors || '').split(', ').map(authorLabel).join(', ')

const areaClassMap = {
  体系结构: 'architecture',
  'efficient algorithm': 'efficient',
  高性能并行与分布式计算: 'parallel'
}

const visualMap = {
  体系结构: 'visual-architecture',
  'efficient algorithm': 'visual-efficient',
  高性能并行与分布式计算: 'visual-parallel'
}

const linkMarkup = (url, label) =>
  `<a href="${htmlEscape(url)}" target="_blank" rel="noreferrer">${label}</a>`

const formatVenue = (paper) => {
  const venue = htmlEscape(paper['出处/会议期刊'])
  const level = htmlEscape(paper['A类/Trans属性'])
  const links = [
    paper['DOI/论文链接'] ? linkMarkup(paper['DOI/论文链接'], 'Paper') : '',
    paper['开源代码/数据链接'] ? linkMarkup(paper['开源代码/数据链接'], 'Code') : ''
  ].filter(Boolean)

  return `${venue} (<strong>${level}</strong>), ${paper['年份']}.${links.length ? ` ${links.join(' | ')}` : ''}`
}

const papers = publicationSource.primary.map((paper) => ({
  title: paper['论文题名'],
  authors: formatAuthors(paper['作者']),
  venue: formatVenue(paper),
  year: Number(paper['年份']),
  area: paper['方向分类'],
  areaClass: areaClassMap[paper['方向分类']] || 'parallel',
  visual: visualMap[paper['方向分类']] || 'visual-parallel'
}))

const filteredPapers = computed(() => {
  if (activeFilter.value === 'all') {
    return papers
  }

  return papers.filter((paper) => paper.area === activeFilter.value)
})
</script>

<style lang="scss" scoped>
.publications-page {
  background: #fff;
  color: #3d4248;
  min-height: calc(100vh - 60px);
  padding: 36px 0 72px;
}

.publications-shell {
  width: min(1640px, calc(100% - 160px));
  margin: 0 auto;
}

h1 {
  margin: 0 0 34px;
  text-align: center;
  color: #3f4248;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(4.4rem, 8vw, 8.4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0;
}

.scholar-note {
  margin: 0 auto 30px;
  max-width: 1180px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.55rem;
  line-height: 1.55;

  a {
    color: #1685ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.filter-panel {
  margin: 0 0 42px;
  padding: 48px 24px 26px;
  min-height: 132px;
  border-radius: 8px;
  background: #f5f6f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.filter-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  color: #424a53;
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 1.15;
}

.stack-icon {
  position: relative;
  width: 32px;
  height: 30px;
  display: inline-block;

  span {
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  span:nth-child(1) {
    left: 12px;
    top: 12px;
    background: #2b8de8;
  }

  span:nth-child(2) {
    left: 7px;
    top: 7px;
    background: #e3439a;
  }

  span:nth-child(3) {
    left: 2px;
    top: 2px;
    background: #7ed957;
  }
}

.filter-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.filter-tab {
  border: 1px solid #dde2e8;
  border-radius: 999px;
  background: #fff;
  color: #4b5562;
  min-height: 45px;
  padding: 0 22px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.12rem;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease, border-color 160ms ease;

  &.active {
    border-color: #0d83f6;
    background: #0d83f6;
    color: #fff;
    box-shadow: 0 7px 16px rgba(13, 131, 246, 0.28);
  }
}

.publication-list {
  border-top: 1px solid #e5e8ec;
}

.publication-item {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 130px;
  gap: 34px;
  align-items: start;
  padding: 24px 0 54px;
}

.paper-thumb {
  position: relative;
  width: 280px;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 13px rgba(29, 39, 51, 0.18);
}

.paper-thumb::before,
.paper-thumb::after,
.thumb-line,
.thumb-node,
.thumb-grid {
  content: '';
  position: absolute;
}

.paper-thumb::before {
  inset: 14px;
  border-radius: 4px;
  background:
    linear-gradient(90deg, transparent 48%, rgba(58, 108, 172, 0.25) 49% 51%, transparent 52%),
    linear-gradient(transparent 48%, rgba(58, 108, 172, 0.2) 49% 51%, transparent 52%);
  background-size: 68px 42px;
}

.paper-thumb::after {
  left: 24px;
  right: 24px;
  top: 28px;
  height: 2px;
  background: linear-gradient(90deg, #ffbf3c, #4ca3ff, #e965a5);
  transform: rotate(-10deg);
  transform-origin: left center;
}

.thumb-line {
  left: 58px;
  right: 48px;
  bottom: 34px;
  height: 2px;
  background: #71b77a;
  transform: rotate(13deg);
}

.thumb-node {
  width: 54px;
  height: 34px;
  left: 116px;
  top: 54px;
  border-radius: 6px;
  background: rgba(139, 210, 124, 0.84);
  box-shadow:
    -78px -14px 0 -8px rgba(255, 198, 67, 0.9),
    88px 18px 0 -10px rgba(67, 153, 235, 0.9),
    -34px 45px 0 -12px rgba(238, 108, 108, 0.95);
}

.thumb-grid {
  right: 20px;
  bottom: 16px;
  width: 72px;
  height: 46px;
  border-radius: 4px;
  background:
    linear-gradient(#d9e5f2 1px, transparent 1px),
    linear-gradient(90deg, #d9e5f2 1px, transparent 1px);
  background-size: 18px 15px;
}

.visual-architecture {
  background: linear-gradient(135deg, #fff 0 52%, #f7edf9 52% 100%);
}

.visual-efficient {
  background: linear-gradient(135deg, #fff 0 45%, #e9f6ff 45% 70%, #fff4da 70% 100%);
}

.visual-parallel {
  background: linear-gradient(135deg, #fff 0 48%, #eef8e9 48% 72%, #fff 72% 100%);
}

.paper-content {
  min-width: 0;
  padding-top: 2px;
}

.title-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

h2 {
  margin: 0 0 16px;
  color: #333941;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.26;
}

.area-tag {
  flex: 0 0 auto;
  margin-top: 1px;
  padding: 7px 18px 8px;
  border-radius: 999px;
  background: #eef0f6;
  color: #55606d;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1rem;
  line-height: 1;

  &.architecture {
    color: #a54abc;
    background: #f1def4;
  }

  &.efficient {
    color: #2873b7;
    background: #e0f1ff;
  }

  &.parallel {
    color: #4b8a3a;
    background: #e6f5df;
  }
}

.authors,
.venue {
  margin: 0 0 12px;
  color: #3f4853;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.25rem;
  line-height: 1.45;
}

.authors :deep(strong) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.venue {
  font-style: italic;

  :deep(strong) {
    color: #e63d4a;
    font-style: normal;
    font-weight: 800;
  }

  :deep(a) {
    color: #1685ff;
    font-style: normal;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.paper-year {
  color: #a1a1a1;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 1;
  text-align: right;
}

@media screen and (max-width: 1100px) {
  .publications-shell {
    width: min(100% - 48px, 920px);
  }

  .publication-item {
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 24px;
  }

  .paper-thumb {
    width: 220px;
  }

  .paper-year {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    font-size: 2rem;
  }

  .paper-content {
    grid-column: 2;
  }

  .title-row {
    padding-right: 88px;
  }
}

@media screen and (max-width: 760px) {
  .publications-page {
    padding-top: 28px;
  }

  .publications-shell {
    width: min(100% - 30px, 640px);
  }

  h1 {
    font-size: clamp(3.2rem, 16vw, 5rem);
    margin-bottom: 22px;
  }

  .scholar-note {
    font-size: 1.1rem;
  }

  .filter-panel {
    padding: 28px 18px 24px;
  }

  .filter-heading {
    font-size: 1.45rem;
    text-align: center;
  }

  .publication-item {
    grid-template-columns: 1fr;
    gap: 16px;
    padding-bottom: 40px;
  }

  .paper-thumb {
    width: min(100%, 330px);
  }

  .paper-content,
  .paper-year {
    grid-column: auto;
    grid-row: auto;
  }

  .paper-year {
    text-align: left;
    justify-self: start;
    order: -1;
    font-size: 1.65rem;
  }

  .title-row {
    padding-right: 0;
    flex-direction: column;
    gap: 4px;
  }

  h2 {
    font-size: 1.35rem;
  }

  .authors,
  .venue {
    font-size: 1.05rem;
  }
}
</style>
