<template>
  <page-base title="研究成果">
    <div class="papers-container">
      <h2>学术论文</h2>
      <ul>
        <li v-for="(paper, index) in papers" :key="index">
          <b>{{ paper.title }}</b>，{{ paper.authors }}，<i>{{ paper.journal }}</i>，{{ paper.year }}
        </li>
      </ul>
    </div>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
import { ref } from 'vue'

const papers = ref([
  { title: 'Point Cloud Acceleration by Exploiting Geometric Similarity', authors: 'Cen Chen, Xiaofeng Zou, Hongen Shao, Yangfan Li, Kenli Li', journal: 'MICRO 2023 International Symposium on Micro architecture', year: 2023 },
  { title: 'ReGNN: A Redundancy-Eliminated Graph Neural Networks Accelerator', authors: 'Cen Chen, Kenli Li, Xiaofeng Zou, Yangfan Li', journal: 'The 28th IEEE International Symposium on High-Performance Computer Architecture (HPCA-28)', year: 2022 },
  { title: 'DyGNN: Algorithm and Architecture Support of Dynamic Pruning for Graph Neural Networks', authors: 'Cen Chen, Kenli Li, Yangfan Li, Xiaofeng Zou', journal: '58th Design Automation Conference (DAC), IEEE', year: 2021 },
  { title: 'Gated Residual Recurrent Graph Neural Networks for Traffic Prediction', authors: 'Cen Chen, Kenli Li, Sin G. Teo, Xiaofeng Zou, Xulei Yang, Ramaseshan C. Vijay, Zeng Zeng', journal: '33th AAAI Conference on Artificial Intelligence (AAAI-19)', year: 2019 },
  { title: 'DS-AL: A Dual-Stream Analytic Learning for Exemplar-Free Class-Incremental Learning', authors: 'Huiping Zhuang, Run He, Kai Tong, Ziqian Zeng, Cen Chen, Zhiping Lin', journal: '38th AAAI Conference on Artificial Intelligence (AAAI-24)', year: 2024 },
  { title: 'ConsistentEE: A Consistent and Hardness-Guided Early Exiting Method for Accelerating Language Models Inference', authors: 'Ziqian Zeng, Yihuai Hong, Hongliang Dai, Huiping Zhuang, Cen Chen', journal: '38th AAAI Conference on Artificial Intelligence (AAAI-24)', year: 2024 },
  { title: 'Towards Communication-efficient Digital Twin via AI-powered Transmission and Reconstruction', authors: 'Mi Li, Cen Chen*, Xulei Yang, Joey Tianyi Zhou, Tao Zhang, Yangfan Li', journal: 'IEEE Journal on Selected Areas in Communications (JSAC)', year: 2023 },
  { title: 'GFlink: An in-memory computing architecture on heterogeneous CPU-GPU clusters for big data', authors: 'Cen Chen, Kenli Li, A. Ouyang, Z. Zeng, K. Q. Li', journal: 'IEEE Transactions on Parallel and Distributed Systems', year: 2018 },
  { title: 'FlinkCL: An OpenCL-based In-Memory Computing Architecture on Heterogeneous CPU-GPU Clusters for Big Data', authors: 'Cen Chen, Kenli Li, A. Ouyang, K. Q. Li', journal: 'IEEE Transactions on Computers', year: 2018 },
  { title: 'Scalable Heterogeneous Scheduling based Model Parallelism for Real-Time Inference of Large-Scale Deep Neural Networks', authors: 'Xiaofeng Zou, Cen Chen, Peiying Lin, Luochuan Zhang, Yanwu Xu, Wenjie Zhang', journal: 'IEEE Transactions on Emerging Topics in Computational Intelligence (TETCI)', year: 2024 },
  { title: 'Hierarchical Semantic Graph Reasoning for Train Component Detection', authors: 'Cen Chen, Kenli Li, Zhongyao Cheng, Wei Wei, Qi Tian, Zeng Zeng', journal: 'IEEE Transactions on Neural Networks and Learning Systems', year: 2021 },
  { title: 'Exploring Structural Knowledge for Automated Visual Inspection of Moving Trains', authors: 'Cen Chen, Xiaofeng Zou, Zeng Zeng, Zhongyao Cheng, CH Steven', journal: 'IEEE Transactions on Cybernetics', year: 2020 },
  { title: 'GPU-Accelerated Parallel Hierarchical Extreme Learning Machine on Flink for Big Data', authors: 'Cen Chen, K. Li, A. Ouyang, Z. Tang, K. Q. Li', journal: 'IEEE Transactions on Systems Man & Cybernetics Systems', year: 2017 },
  { title: 'Hierarchical Graph Neural Networks for Few-Shot Learning', authors: 'Cen Chen, Kenli Li, Wei Wei, Joey Tianyi Zhou, Zeng Zeng', journal: 'IEEE Transactions on Circuits and Systems for Video Technology', year: 2021 },
  { title: 'A Hybrid Deep Learning based Framework for Component Defect Detection of Moving Trains', authors: 'Cen Chen, Kenli Li, Cheng Zhongyao, Francesco Piccialli, Steven CH Hoi, Zeng Zeng', journal: 'IEEE Transactions on Intelligent Transportation Systems', year: 2020 },
  { title: 'Citywide Traffic Flow Prediction based on Multiple Gated Spatio-temporal Convolutional Neural Networks', authors: 'Cen Chen, Kenli Li, Sin G Teo, Xiaofeng Zou, Keqin Li, Zeng Zeng', journal: 'ACM Transactions on Knowledge Discovery from Data (TKDD)', year: 2020 },
  { title: 'Exploiting Spatio-Temporal Correlations with Multiple 3D Convolutional Neural Networks for Citywide Vehicle Flow Prediction', authors: 'Cen Chen, Kenli Li, Sin G. Teo, Guizi Chen, Xiaofeng Zou, Xulei Yang, Ramaseshan C. Vijay, Jiashi Feng, Zeng Zeng', journal: 'IEEE International Conference on Data Mining (ICDM)', year: 2018 },
  { title: 'A Parallel Approximate SS-ELM Algorithm based on MapReduce for Large-Scale Datasets', authors: 'Cen Chen, K. Li, A. Ouyang, K. Q. Li', journal: 'Journal of Parallel and Distributed Computing', year: 2017 },
  { title: 'GFlink: An in-memory computing architecture on heterogeneous CPU-GPU clusters for big data', authors: 'Cen Chen, K. Li, A. Ouyang, Z. Tang, K. Q. Li', journal: 'Parallel Processing (ICPP), 45th International Conference on', year: 2016 },
  { title: 'Memory-assistant Collaborative Language Understanding for Artificial Intelligence of Things', authors: 'Ming Yan, Cen Chen*, Jiawei Du, Xi Peng, Joey Tianyi Zhou, Zeng Zeng', journal: 'IEEE Transactions on Industrial Informatics', year: 2021 },
  { title: 'Distributed Monitoring for Energy Infrastructures: A Two-Tier Analysis Over Wireless Networks', authors: 'Chi Zhang, Liangli Zhen, Joey Tianyi Zhou, Cen Chen*', journal: 'IEEE Wireless Communications', year: 2021 },
  { title: 'DSAL: Deeply Supervised Active Learning from Strong and Weak Labelers for Biomedical Image Segmentation', authors: 'Z Zhao, Z Zeng, K Xu, Cen Chen*, C Guan', journal: 'IEEE Journal of Biomedical and Health Informatics', year: 2021 },
  { title: 'A Hierarchical Deep Convolutional Neural Network and Gated Recurrent Unit Framework for Structural Damage Detection', authors: 'Jianxi Yang, Likai Zhang, Cen Chen*, Yangfan Li, Ren Li, Guiping Wang, Shixin Jiang, Zeng Zeng', journal: 'Information Sciences', year: 2020 },
  { title: 'Attention-Aware Encoder-Decoder Graph Neural Networks for Heterogeneous Graph of Things', authors: 'Yangfan Li, Cen Chen*, Kenli Li', journal: 'IEEE Transactions on Industrial Informatics', year: 2020 },
  { title: 'Multi-Level Attention based U-Shape Graph Neural Network for Point Clouds Learning', authors: 'Xiaofeng Zou, Kenli Li, Cen Chen*', journal: 'IEEE Transactions on Industrial Informatics', year: 2020 },
  { title: 'Determinantal Point Process-based New Radio Unlicensed Link Scheduling for Multi-access Edge Computing', authors: 'Chigang Xing, Yangfan Li, Cen Chen*', journal: 'World Wide Web: Internet and Web Information Systems (WWWJ)', year: 2022 },
  { title: 'CoIn: Correlation Induced Clustering for Cognition of High Dimensional Bioinformatics Data', authors: 'Zeng Zeng, Ziyuan Zhao, Kaixin Xu, Cen Chen*, Yulan Wang, Wei Wei, Pierce KH Chow, Xiaoli Li', journal: 'IEEE Journal of Biomedical And Health Informatics', year: 2022 },
  { title: 'Intelligent Energy-Efficient Scheduling with Ant Colony Techniques for Heterogeneous Edge Computing', authors: 'Jing Liu, Pei Yang, Cen Chen*', journal: 'Journal of Parallel and Distributed Computing', year: 2023 },
  { title: 'Cascade Graph Neural Networks for Few-shot Learning on Point Clouds', authors: 'Yangfan Li, Cen Chen*, Weiquan Yan, Zhongyao Cheng, Hui Li Tanm, Wenjie Zhang', journal: 'IEEE Transactions on Intelligent Transportation Systems (TITS)', year: 2023 }
])
</script>

<style lang="scss" scoped>
.papers-container {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  padding: 40px;
  h2 {
    color: #004380;
    margin-bottom: 24px;
    text-align: center;
  }
  ul {
    list-style: disc;
    padding-left: 30px;
    li {
      margin-bottom: 18px;
      font-size: 1.1rem;
      color: #2c3e50;
    }
  }
}
</style> 