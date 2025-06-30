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
    name: "人工智能与机器学习",
    desc: "主要研究人工智能、机器学习及其在各领域的应用，包括深度学习算法优化、智能系统开发等。"
  },
  {
    name: "高性能计算",
    desc: "专注于高性能计算、分布式系统和并行算法设计，推动计算能力的提升和大规模数据处理。"
  },
  {
    name: "大数据分析",
    desc: "研究大数据分析、数据可视化和数据挖掘算法，致力于从海量数据中提取有价值的信息。"
  },
  {
    name: "智能感知与控制系统",
    desc: "聚焦智能感知系统、控制系统优化和传感器网络，提升系统的智能化与自动化水平。"
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