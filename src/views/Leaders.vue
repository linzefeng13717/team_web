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
              <div class="academic-service" v-if="leader.academicServices?.length">
                <h3>学术服务</h3>
                <ul>
                  <li v-for="(item, idx) in leader.academicServices" :key="idx">{{ item }}</li>
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
  const imageMap = {
    陈岑: 'CC.jpg',
    邹骁锋: '邹骁锋.jpg'
  }
  return new URL(`/public/images/${imageMap[name] || 'people_default.png'}`, import.meta.url).href
}

const leaders = ref([
  {
    role: "教授",
    name: "陈岑",
    affiliation: "华南理工大学未来技术学院，教授，博导，IEEE Senior Member，国家青年人才（海外）",
    bio: `陈岑博士现担任华南理工大学未来技术学院教授、博导，IEEE Senior Member。曾在新加坡科技研究院、资讯与通信研究所担任高级别研究员（Scientist III），研究所与新加坡国立大学、南洋理工大学兼职博士生导师。因其在人工智能软硬件体系结构设计方面的成就，入选国家青年人才（海外）、2024年全球Top 2%顶尖科学家榜单、广州市“才源广进计划”青年拔尖人才、新加坡AI3人工智能人才；获ACM China新星奖（Changsha Chapter）、湖南省优秀博士论文、湖南省计算机学会优秀博士论文，并获CCF-飞腾学术基金、中国人工智能协会-昇思（华为）学术基金等支持。\n主要从事高效能智能计算技术研究，在国内外著名期刊和会议上发表论文80余篇，以一作或通讯发表学术论文42篇，其中IEEE/ACM汇刊长文或CCF-A类期刊论文24篇，包括IEEE TCAD、TC、TPDS、JSAC等；CCF-A类会议论文8篇，包括MICRO、HPCA、DAC、NeurIPS等，Google Scholar引用2300余次，H-index 22。授权发明专利16项。\n体系结构是计算机的核心领域，也是我国面临的“卡脖子”技术之一。陈岑教授作为第一作者的研究成果已发表在体系结构CCF-A类会议DAC-2021、HPCA-2022、MICRO-2023。\n陈岑博士有18年的计算机工程与科研工作经验，项目工程与管理经验丰富。近年来主持国家自然科学基金优秀青年科学基金项目（海外）、国家自然科学基金面上项目、国家重点研发计划青年科学家项目子任务、新加坡政府RIE-2025重大专项项目课题等国内/国际纵向项目15项，以及华为、腾讯、钛动、百度等公司的产学研合作项目11项，总经费超过2500万元。`,
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
      "2024年 国家自然科学基金优秀青年科学基金项目（海外）",
      "2024年 全球Top 2%顶尖科学家榜单",
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
    ],
    academicServices: [
      "IEEE Senior Member",
      "2023年至今担任 Alexandria Engineering Journal 编委",
      "2023年至今担任 IEEE Transactions on Computers（CCF A）编委",
      "Neurocomputing、JPDC 客座编辑",
      "ScalCom-2024、ScalCom-2025 程序委员会主席",
      "IEEE ICPADS-2023 领域主席、HPCC-2022 论文出版主席、UIC-2022 领域主席、IEEE ITSC-2023 领域主席",
      "广东省计算机学会移动与边缘计算专业委员会常务委员"
    ]
  },
  {
    role: "副教授",
    name: "邹骁锋",
    affiliation: "华南理工大学未来技术学院，副教授",
    bio: "邹骁锋博士主要从事计算机体系结构、高效能智能计算和图神经网络加速等方向研究。",
    researchFields: [
      "计算机体系结构",
      "高效能智能计算",
      "图神经网络加速"
    ],
    achievements: [],
    awards: [],
    academicServices: []
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

          .bio, .research, .achievements, .awards, .academic-service {
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
