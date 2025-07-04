<template>
  <page-base title="导师队伍">
    <div class="leaders-container">
      <div v-for="(leader, index) in leaders" 
           :key="index" 
           class="leader-section">
        <el-card class="leader-card">
          <div class="leader-info">
            <div class="avatar">
              <img :src="getLeaderImage(leader.name)" alt="导师照片" style="max-width: 220px; border-radius: 8px;" />
            </div>
            <div class="details">
              <div class="title">{{ leader.role }}</div>
              <h2 class="name">{{ leader.name }}</h2>
              <p class="affiliation">{{ leader.affiliation }}</p>
              <div class="bio">
                <h3>个人简介</h3>
                <div>
                  <p v-for="(paragraph, idx) in leader.bio.split('\n')" :key="idx">{{ '\u3000\u3000' + paragraph }}</p>
                </div>
              </div>
              <div class="research">
                <h3>研究方向</h3>
                <ul>
                  <li v-for="(field, fIndex) in leader.researchFields" 
                      :key="fIndex">{{ field }}</li>
                </ul>
              </div>
              <div class="achievements">
                <h3>科研成果</h3>
                <ul>
                  <li v-for="(item, idx) in leader.achievements" :key="idx">{{ item }}</li>
                </ul>
              </div>
              <div class="awards">
                <h3>获奖情况</h3>
                <ul>
                  <li v-for="(item, idx) in leader.awards" :key="idx">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
import { ref } from 'vue'

const getLeaderImage = (name) => {
  if (name === '陈岑') {
    return '/images/CC.jpg'
  }
  // 其他老师的默认逻辑
  const specialCases = {
    'Stéphane Zuckerman': 'Stephane Zuckerman'
  }
  const imageName = specialCases[name] || name
  const format = '.png'
  return `/images/leaders/${imageName}${format}`
}

const leaders = ref([
  {
    role: "教授",
    name: "陈岑",
    affiliation: "华南理工大学未来技术学院，教授，博导，IEEE Senior Member",
    bio: `陈岑博士现担任华南理工大学未来技术学院，教授，博导，IEEE Senior Member。曾在新加坡科技研究院、资讯与通信研究所担任高级别研究员（Scientist III），研究所与新加坡国立大学、南洋理工大学兼职博士生导师。因其在人工智能软硬件体系结构设计方面的成就，获得了新加坡人工智能人才特殊津贴（截至2022年全新加坡118人）。博士论文获得湖南省优秀博士论文，湖南省计算机学会优秀博士毕业论文，ACM中国新星（长沙分会）。\n陈岑博士专注于面向大数据智能计算的高效能体系结构与算法方面的研究，已累计在体系结构和大数据权威学术期刊和会议上发表论文60余篇，专利授权15项。以第一作者或通讯作者发表论文共28篇。其中包括IEEE& ACM期刊或者CCF A类期刊论文17篇，CCF A类会议论文4篇，CCF B类会议论文2篇，影响因子大于10论文13篇。一作/通信期刊论文包括IEEE TC（CCF-A）、IEEE TPDS（CCF-A）、IEEE JSAC（CCF-A）、IEEE TSMC-S、IEEE TCYB、IEEE TNNLS等，一作会议包括HPCA（CCF-A）、MICRO（CCF-A）、DAC（CCF-A）、AAAI（CCF-A）等。担任Neurocomputing、JPDC客座编辑、HPCC-2022 Publication Chair、 UIC-2022领域主席、ICPADS-2023领域主席。\n体系结构是计算机的核心领域，也是我国面临的"卡脖子"技术之一，陈岑博士近两年一作论文相继发表在体系结构CCF-A类会议DAC-2021和HPCA-2022上，最新论文已被MICRO-2023接收。顶级体系结构会议对论文的学术价值要求严格，如HPCA-2022全球仅录用85篇论文，据权威官网CSRankings: Computer Science Rankings统计，从1970年至2022年，中国内地高校在HPCA上发表的论文的加权总数约33篇。\n陈岑博士有17年的计算机工程与科研工作经验，项目工程与管理经验丰富。近年来，联合主持中国-新加坡自然科学基金国际合作与交流重点项目、新加坡国家人工智能项目、新加坡国家重点项目、华为EDA软件合作项目等，主持或联合主持项目经费超过1800万元。`,
    researchFields: [
      "人工智能软硬件体系结构设计",
      "大数据智能计算",
      "高效能体系结构与算法",
      "计算机体系结构",
      "并行与分布式系统"
    ],
    achievements: [
      'Cen Chen, Kenli Li, Xiaofeng, Zou, Yangfan Li, "ReGNN: A Redundancy-Eliminated Graph Neural Networks Accelerator", The 28th IEEE International Symposium on High-Performance Computer Architecture (HPCA-28) , 2021, (体系结构顶会，CCF A Conference)',
      'Cen Chen, Xiaofeng Zou, Hongen Shao, Yangfan Li, Kenli Li, Point Cloud Acceleration by Exploiting Geometric Similarity, MICRO 2023 International Symposium on Micro architecture, 2023 (Accepted) (体系结构顶会，CCF A Conference)',
      'Cen Chen, Kenli Li, Yangfan Li, Xiaofeng, Zou, "DyGNN: Algorithm and Architecture Support of Dynamic Pruning for Graph Neural Networks", 58th Design Automation Conference (DAC), 2021, (体系结构顶会，CCF A Conference)',
      'Cen Chen, Kenli Li, Sin G. Teo, Xiaofeng Zou, Xulei Yang, Ramaseshan C. Vijay and Zeng Zeng, "Gated Residual Recurrent Graph Neural Networks for Traffic Prediction", 33th AAAI Conference on Artificial Intelligence (AAAI-19), (CCF A Conference)',
      'Cen Chen, Kenli Li, A. Ouyang, Z. Zeng and K. Q. Li, "GFlink: An in-memory computing architecture on heterogeneous CPU-GPU clusters for big data,", IEEE Transactions on Parallel and Distributed Systems, 2018, 29(6): 1275-1288. (CCF A Journal, JCR Q1)',
      'Cen Chen, Kenli Li, A. Ouyang, and K. Q. Li, "FlinkCL: An OpenCL-based In-Memory Computing Architecture on Heterogeneous CPU-GPU Clusters for Big Data", IEEE Transactions on Computers, 2018, DOI:10.1109/TC.2018.2839719, (CCF A Journal, JCR Q1)',
      'Cen Chen, Yangfan Li, Xulei Yang, Senior Member, IEEE, Jieming Yang, Xiaokang Wang, Senior Member, Laurence T. Yang, "An Intelligent Edge-Cloud Collaborative Framework for Communication Security in Distributed Cyber-Physical Systems", IEEE Network,2023 (IF=9.3, JCR Q1)',
      'Cen Chen, Kenli Li, Zhongyao Cheng, Wei Wei, Qi Tian, Zeng Zeng, "Hierarchical Semantic Graph Reasoning for Train Component Detection", IEEE Transactions on Neural Networks and Learning Systems, DOI: 10.1109/TNNLS.2021.3057792, 2021， (SCI 1 Journal, IF = 10.451, JCR Q1)',
      'Cen Chen, Xiaofeng Zou, Zeng Zeng, Zhongyao Cheng, CH Steven, "Exploring Structural Knowledge for Automated Visual Inspection of Moving Trains", IEEE Transactions on Cybernetics, DOI: 10.1109/TCYB.2020.2998126，2020 (SCI 1 Journal, IF = 11.448, JCR Q1)',
      'Cen Chen, K. Li, A. Ouyang, Z. Tang and K. Q. Li, "GPU-Accelerated Parallel Hierarchical Extreme Learning Machine on Flink for Big Data", IEEE Transactions on Systems Man & Cybernetics Systems: Systems, 2017, 47(10):2740-2753, (SCI 1 Journal, IF = 13.451, JCR Q1)',
      'Cen Chen, Kenli Li, Wei Wei, Joey Tianyi Zhou, Zeng Zeng, "Hierarchical Graph Neural Networks for Few-Shot Learning", IEEE Transactions on Circuits and Systems for Video Technology, DOI: 10.1109/TCSVT.2021.3058098, 2021, (SCI 1 Journal, IF = 11.2, JCR Q1)'
    ],
    awards: [
      "2024年 海外优青",
      "2024年 广州市广聚计划创新创业人才引进项目青年拔尖人才",
      "2023年 ACM RISING STAR AWARD 长沙分会",
      "2022年 IEEE 会议杰出组织奖",
      "2021年 湖南省优秀博士毕业论文",
      "2021年 湖南省计算机学会优秀博士毕业论文",
      "2019年 湖南大学优秀博士毕业论文",
      "2018年 博士研究生国家奖学金",
      "2018年 湖南大学优秀博士奖学金",
      "2017年 博士研究生国家奖学金",
      "2017年 湖南大学优秀博士奖学金",
      "2005年 华中科技大学优秀共产党员"
    ]
  }
])
</script>

<style lang="scss" scoped>
.leaders-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .leader-section {
    margin-bottom: 40px;

    .leader-card {
      transition: transform 0.3s, box-shadow 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .leader-info {
        display: flex;
        gap: 40px;
        padding: 20px;

        .avatar {
          flex-shrink: 0;
        }

        .details {
          flex: 1;

          .title {
            font-size: 1.2rem;
            color: #409EFF;
            margin-bottom: 10px;
            font-weight: 500;
          }

          .name {
            font-size: 2rem;
            color: #2c3e50;
            margin: 0 0 10px 0;
          }

          .affiliation {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 20px;
          }

          .bio, .research, .achievements, .awards {
            margin-top: 20px;

            h3 {
              font-size: 1.3rem;
              color: #2c3e50;
              margin-bottom: 10px;
              padding-bottom: 5px;
              border-bottom: 2px solid #eee;
            }

            p {
              font-size: 1rem;
              line-height: 1.6;
              color: #666;
            }

            ul {
              list-style-type: disc;
              padding-left: 20px;
              margin-top: 10px;

              li {
                font-size: 1rem;
                line-height: 1.6;
                color: #666;
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .leaders-container {
    .leader-section {
      .leader-card {
        .leader-info {
          flex-direction: column;
          align-items: center;
          text-align: center;

          .details {
            .bio, .research, .achievements, .awards {
              ul {
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
}
</style> 