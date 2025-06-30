<template>
  <page-base title="研究方向">
    <div class="research-container">
      <div class="research-section" v-for="(direction, dIndex) in researchDirections" :key="dIndex">
        <h2>{{ direction.name }}</h2>
        <div class="direction-desc">
          <p>{{ direction.desc }}</p>
        </div>
      </div>
    </div>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
import { ref } from 'vue'

// 研究方向数据
const researchDirections = ref([
  {
    name: "人工智能",
    desc: "研究深度学习、强化学习等前沿AI技术，探索其应用。"
  },
  {
    name: "大数据",
    desc: "研究海量数据处理、实时分析和可视化技术。"
  },
  {
    name: "体系结构",
    desc: "专注于新型计算体系结构的设计与优化。"
  },
  {
    name: "并行与分布式计算",
    desc: "关注大规模并行计算、分布式系统优化和性能调优。"
  }
])
</script>

<style lang="scss" scoped>
.research-container {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .research-section {
    background: #f8fafc;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    padding: 32px 40px;
    
    h2 {
      color: #004380;
      font-size: 1.6rem;
      margin-bottom: 18px;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 48px;
        height: 3px;
        background: #004380;
        border-radius: 2px;
        margin-top: 8px;
      }
    }
    .direction-desc {
      p {
        color: #444;
        font-size: 1.1rem;
        line-height: 1.8;
        margin: 0;
      }
    }
  }
}
</style> 