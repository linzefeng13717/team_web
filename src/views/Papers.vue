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
            <img v-if="paper.cover" :src="paper.cover" :alt="`${paper.title} cover`" />
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
  cover: paper['封面图片'] || '',
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
  background: #f5f7fa;
  color: #2c3e50;
  min-height: calc(100vh - 60px);
  padding: 40px 0 72px;
}

.publications-shell {
  width: min(1200px, calc(100% - 80px));
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  position: relative;
  margin: 0 0 40px;
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 60px;
    height: 3px;
    border-radius: 2px;
    background-color: #004380;
    transform: translateX(-50%);
  }
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
  margin: 0 0 30px;
  padding: 24px 28px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #eef2f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.filter-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  color: #004380;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.15;
}

.stack-icon {
  position: relative;
  width: 24px;
  height: 22px;
  display: inline-block;

  span {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  span:nth-child(1) {
    left: 9px;
    top: 9px;
    background: #004380;
  }

  span:nth-child(2) {
    left: 5px;
    top: 5px;
    background: #409eff;
  }

  span:nth-child(3) {
    left: 1px;
    top: 1px;
    background: #8fb4d8;
  }
}

.filter-tabs {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tab {
  border: 1px solid #d8e2ec;
  border-radius: 20px;
  background: #fff;
  color: #4f5f70;
  min-height: 38px;
  padding: 0 16px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &.active {
    border-color: #004380;
    background: #004380;
    color: #fff;
    box-shadow: 0 4px 10px rgba(0, 67, 128, 0.2);
  }

  &:hover {
    border-color: #004380;
    color: #004380;
  }

  &.active:hover {
    color: #fff;
  }
}

.publication-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.publication-item {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) 88px;
  gap: 24px;
  align-items: start;
  padding: 22px;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.09);
  }
}

.paper-thumb {
  position: relative;
  width: 180px;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e6edf5;
  box-shadow: none;
}

.paper-thumb img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin: 0 0 12px;
  color: #2c3e50;
  font-size: 1.22rem;
  font-weight: 700;
  line-height: 1.45;
}

.area-tag {
  flex: 0 0 auto;
  margin-top: 3px;
  padding: 6px 12px;
  border-radius: 20px;
  background: #eef2f6;
  color: #566575;
  font-size: 0.86rem;
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
  margin: 0 0 10px;
  color: #666;
  font-size: 1rem;
  line-height: 1.65;
}

.authors :deep(strong) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.venue {
  font-style: italic;

  :deep(strong) {
    color: #004380;
    font-style: normal;
    font-weight: 700;
  }

  :deep(a) {
    color: #409eff;
    font-style: normal;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.paper-year {
  color: #8aa0b5;
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1;
  text-align: right;
}

@media screen and (max-width: 1100px) {
  .publications-shell {
    width: min(100% - 48px, 920px);
    padding: 26px;
  }

  .publication-item {
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 24px;
  }

  .paper-thumb {
    width: 170px;
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
    padding: 24px 0 48px;
  }

  .publications-shell {
    width: min(100% - 30px, 640px);
    padding: 22px 18px;
  }

  h1 {
    font-size: 1.7rem;
    margin-bottom: 32px;
  }

  .scholar-note {
    font-size: 1.1rem;
  }

  .filter-panel {
    padding: 20px 16px;
  }

  .filter-heading {
    font-size: 1.05rem;
  }

  .publication-item {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 18px;
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
    font-size: 1.12rem;
  }

  .authors,
  .venue {
    font-size: 0.95rem;
  }
}
</style>
