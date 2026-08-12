<template>
  <page-base title="学生成员">
    <div class="team-container">
      <div class="team-section">
        <h2>实验室成员</h2>
        <div v-for="group in ['导师', '博士后', '博士']" :key="group">
          <h3 v-if="grouped[group].length" class="group-title">{{ group }}</h3>
          <div v-if="grouped[group].length" class="members">
            <el-card v-for="member in grouped[group]" 
                     :key="member.name"
                     class="member-card"
                     @click="showMemberDetail(member)">
              <div class="member-info">
                <div class="avatar">
                  <el-avatar 
                    :size="160" 
                    :src="getMemberImage(member.name)"
                    @error="handleImageError"
                  >
                    <img :src="peopleImage"/>
                  </el-avatar>
                </div>
                <div class="details">
                  <span class="member-role">{{ member.role }}</span>
                  <h3 class="member-name">{{ member.name }}</h3>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <div v-if="grouped['硕士在读'].length || grouped['硕士已毕业'].length">
          <h3 class="group-title">硕士</h3>
          <template v-if="grouped['硕士在读'].length">
            <h4 class="subgroup-title">在读</h4>
            <div class="members">
              <el-card v-for="member in grouped['硕士在读']"
                       :key="member.name"
                       class="member-card"
                       @click="showMemberDetail(member)">
                <div class="member-info">
                  <div class="avatar">
                    <el-avatar 
                      :size="160" 
                      :src="getMemberImage(member.name)"
                      @error="handleImageError"
                    >
                      <img :src="peopleImage"/>
                    </el-avatar>
                  </div>
                  <div class="details">
                    <span class="member-role">{{ member.role }}</span>
                    <h3 class="member-name">{{ member.name }}</h3>
                  </div>
                </div>
              </el-card>
            </div>
          </template>
          <template v-if="grouped['硕士已毕业'].length">
            <h4 class="subgroup-title">已毕业</h4>
            <div class="members">
              <el-card v-for="member in grouped['硕士已毕业']"
                       :key="member.name"
                       class="member-card"
                       @click="showMemberDetail(member)">
                <div class="member-info">
                  <div class="avatar">
                    <el-avatar 
                      :size="160" 
                      :src="getMemberImage(member.name)"
                      @error="handleImageError"
                    >
                      <img :src="peopleImage"/>
                    </el-avatar>
                  </div>
                  <div class="details">
                    <span class="member-role">{{ member.role }}</span>
                    <h3 class="member-name">{{ member.name }}</h3>
                  </div>
                </div>
              </el-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 成员详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedMember?.name"
      width="60%"
      class="member-dialog"
      :close-on-click-modal="true"
      :show-close="true">
      <div class="dialog-content" v-if="selectedMember">
        <div class="member-header">
          <div class="member-avatar">
            <el-avatar 
              :size="200" 
              :src="getMemberImage(selectedMember.name)"
              @error="handleImageError">
              <img :src="peopleImage"/>
            </el-avatar>
          </div>
          <div class="member-basic-info">
            <span class="member-role">{{ selectedMember.role }}</span>
            <h3>{{ selectedMember.name }}</h3>
          </div>
        </div>
        <div class="member-details">
          <div class="detail-section" v-if="selectedMember.affiliation">
            <h4>所属单位</h4>
            <p>{{ selectedMember.affiliation }}</p>
          </div>
          <div class="detail-section">
            <h4>邮箱</h4>
            <p>
              <a v-if="selectedMember.email" :href="`mailto:${selectedMember.email}`" target="_blank">{{ selectedMember.email }}</a>
              <span v-else>无</span>
            </p>
          </div>
          <div class="detail-section">
            <h4>个人简介</h4>
            <div v-if="selectedMember.bio">
              <p v-for="(paragraph, idx) in selectedMember.bio.split('\n')" :key="idx">{{ paragraph }}</p>
            </div>
            <p v-else>无</p>
          </div>
          <div class="detail-section">
            <h4>研究方向</h4>
            <ul>
              <li v-for="(research, index) in selectedMember.researchAreas" :key="index">
                {{ research }}
              </li>
            </ul>
          </div>
          <div class="detail-section" v-if="selectedMember.achievements?.length">
            <h4>科研成果</h4>
            <ul>
              <li v-for="(item, index) in selectedMember.achievements" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div class="detail-section" v-if="selectedMember.awards?.length">
            <h4>获奖情况</h4>
            <ul>
              <li v-for="(item, index) in selectedMember.awards" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div class="detail-section" v-if="selectedMember.academicServices?.length">
            <h4>学术服务</h4>
            <ul>
              <li v-for="(item, index) in selectedMember.academicServices" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
import { ref } from 'vue'

const imageExtensions = ['jpg', 'jpeg', 'png']

const getMemberImage = (name) => {
  const imageMap = {
    陈岑: 'CC.jpg',
    邹骁锋: '邹骁锋.jpg'
  }
  if (imageMap[name]) {
    return new URL(`/public/images/${imageMap[name]}`, import.meta.url).href
  }
  return new URL(`/public/images/${name}.${imageExtensions[0]}`, import.meta.url).href
}

// 默认头像
const peopleImage =  new URL('/images/people_default.png', import.meta.url).href

// 图片加载错误处理，自动尝试下一个扩展名
const handleImageError = (e) => {
  const src = e.target.src
  const nameMatch = src.match(/\/images\/([^./]+)\./)
  const extMatch = src.match(/\.([a-zA-Z0-9]+)$/)
  if (!nameMatch || !extMatch) {
    e.target.src = peopleImage
    return
  }
  const name = nameMatch[1]
  const currentExt = extMatch[1]
  const currentIdx = imageExtensions.indexOf(currentExt)
  if (currentIdx >= 0 && currentIdx < imageExtensions.length - 1) {
    // 尝试下一个扩展名
    const nextExt = imageExtensions[currentIdx + 1]
    e.target.src = `/images/${name}.${nextExt}`
  } else {
    // 全部失败，使用默认头像
    e.target.src = peopleImage
  }
}

const dialogVisible = ref(false)
const selectedMember = ref(null)

const showMemberDetail = (member) => {
  selectedMember.value = member
  dialogVisible.value = true
}

const teamMembers = ref([
  {
    name: "陈岑",
    email: "",
    role: "教授",
    affiliation: "华南理工大学未来技术学院，教授，博导，IEEE Senior Member，国家青年人才（海外）",
    bio: `陈岑博士现担任华南理工大学未来技术学院教授、博导，IEEE Senior Member。曾在新加坡科技研究院、资讯与通信研究所担任高级别研究员（Scientist III），研究所与新加坡国立大学、南洋理工大学兼职博士生导师。因其在人工智能软硬件体系结构设计方面的成就，入选国家青年人才（海外）、2024年全球Top 2%顶尖科学家榜单、广州市“才源广进计划”青年拔尖人才、新加坡AI3人工智能人才；获ACM China新星奖（Changsha Chapter）、湖南省优秀博士论文、湖南省计算机学会优秀博士论文，并获CCF-飞腾学术基金、中国人工智能协会-昇思（华为）学术基金等支持。\n主要从事高效能智能计算技术研究，在国内外著名期刊和会议上发表论文80余篇，以一作或通讯发表学术论文42篇，其中IEEE/ACM汇刊长文或CCF-A类期刊论文24篇，包括IEEE TCAD、TC、TPDS、JSAC等；CCF-A类会议论文8篇，包括MICRO、HPCA、DAC、NeurIPS等，Google Scholar引用2300余次，H-index 22。授权发明专利16项。\n体系结构是计算机的核心领域，也是我国面临的“卡脖子”技术之一。陈岑教授作为第一作者的研究成果已发表在体系结构CCF-A类会议DAC-2021、HPCA-2022、MICRO-2023。\n陈岑博士有18年的计算机工程与科研工作经验，项目工程与管理经验丰富。近年来主持国家自然科学基金优秀青年科学基金项目（海外）、国家自然科学基金面上项目、国家重点研发计划青年科学家项目子任务、新加坡政府RIE-2025重大专项项目课题等国内/国际纵向项目15项，以及华为、腾讯、钛动、百度等公司的产学研合作项目11项，总经费超过2500万元。`,
    researchAreas: [
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
    name: "邹骁锋",
    email: "",
    role: "副教授",
    affiliation: "华南理工大学未来技术学院，副教授",
    bio: "邹骁锋博士主要从事计算机体系结构、高效能智能计算和图神经网络加速等方向研究。",
    researchAreas: [
      "计算机体系结构",
      "高效能智能计算",
      "图神经网络加速"
    ],
    achievements: [],
    awards: [],
    academicServices: []
  },
  {
    name: "邓新献",
    email: "aidenxx2022@163.com",
    role: "博士",
    bio: "擅长 C++、ROS、Python 调试。参与自动驾驶项目，专注于复杂系统建模、控制算法优化与嵌入式部署。熟悉 MATLAB、Ubuntu、Modbus、CAN 协议。具备大模型（deepseekR1、ChatGLM3-6B）本地部署与微调经验，熟练掌握提示工程技巧。",
    researchAreas: ["光电混合计算"]
  },
  {
    name: "林泽枫",
    email: "linlinfeng13717@outlook.com",
    role: "硕士",
    graduated: false,
    bio: "研究高效能智能计算架构，欢迎交流。",
    researchAreas: ["高效能智能计算架构"]
  },
  {
    name: "王骏飞",
    email: "773540700@qq.com",
    role: "博士",
    bio: "",
    researchAreas: ["AI 硬件加速器"]
  },
  {
    name: "韩小博",
    email: "sdzb_971002@163.com",
    role: "博士",
    bio: "武汉理工大学自动化学院硕士，现为华南理工大学未来技术学院博士。",
    researchAreas: ["相机与 LiDAR 融合感知算法", "人工智能"]
  },
  {
    name: "江咏麟",
    email: "202420163784@mail.scut.edu.cn",
    role: "硕士",
    graduated: false,
    bio: "",
    researchAreas: ["深度学习编译器与框架"]
  },
  {
    name: "苏炳栋",
    email: "202320163118@mail.scut.edu.cn",
    role: "硕士",
    graduated: true,
    bio: "",
    researchAreas: ["FPGA 加速器", "存内计算"]
  },
  {
    name: "邵红恩",
    email: "ftshaohongen@mail.scut.edu.cn",
    role: "博士",
    bio: "2023级博士生，博士二年级。",
    researchAreas: ["深度学习模型编译优化"]
  },
  {
    name: "万李铭锐",
    email: "ftwanlimingrui@mail.scut.edu.cn",
    role: "博士",
    bio: "",
    researchAreas: ["面向人工智能的光电混合计算软硬件设计与优化"]
  },
  {
    name: "谢灿豪",
    email: "ft_xiecanhao@mail.scut.edu.cn",
    role: "博士",
    bio: "",
    researchAreas: ["光计算编译"]
  },
  {
    name: "杜起飞",
    email: "1312943093@qq.com",
    role: "硕士",
    graduated: false,
    bio: "目前在彩讯实习。",
    researchAreas: ["FPGA 与 3D 点云处理"]
  },
  {
    name: "王勤玉",
    email: "ft_wangqinyu@mail.scut.edu.cn",
    role: "博士",
    bio: "",
    researchAreas: ["视频流加速技术", "存内计算"]
  },
  {
    name: "方鑫",
    email: "super-happy@qq.com",
    role: "博士",
    bio: "",
    researchAreas: ["超异构计算"]
  },
  {
    name: "单威",
    email: "ftshanwei@mail.scut.edu.cn",
    role: "博士",
    bio: "",
    researchAreas: ["类脑计算", "SNN 高效计算"]
  },
  {
    name: "黄志航",
    email: "202320163101@mail.scut.edu.cn",
    role: "硕士",
    graduated: true,
    bio: "",
    researchAreas: ["扩散模型加速"]
  },
  {
    name: "庄晓斌",
    email: "ftzxc111@mail.scut.edu.cn",
    role: "硕士",
    graduated: true,
    bio: "就读于华南理工大学未来技术学院。",
    researchAreas: ["深度学习", "软硬协同优化"]
  },
  {
    name: "蔡昊洋",
    email: "cai-haoyang@outlook.com",
    role: "硕士",
    graduated: false,
    bio: "无",
    researchAreas: ["深度学习编译器"]
  },
  {
    name: "王晨宏",
    email: "无",
    role: "硕士",
    graduated: false,
    bio: "",
    researchAreas: ["高效能智能计算架构"]
  },
  {
    name: "陈婉纯",
    email: "无",
    role: "博士",
    bio: "",
    researchAreas: ["高效能智能计算架构"]
  },
  {
    name: "谭洁",
    email: "无",
    role: "硕士",
    graduated: false,
    bio: "",
    researchAreas: ["高效能智能计算架构"]
  },
])

// 按身份分组
const groupMembers = (members) => {
  // 先分组
  const groups = {
    '导师': [],
    '博士后': [],
    '博士': [],
    '硕士在读': [],
    '硕士已毕业': []
  }
  members.forEach(m => {
    if (m.role === '教授' || m.role === '副教授') {
      groups['导师'].push(m)
    } else if (m.role.includes('博士后')) {
      groups['博士后'].push(m)
    } else if (m.role.includes('博士')) {
      groups['博士'].push(m)
    } else if (m.role.includes('硕士')) {
      if (m.graduated) {
        groups['硕士已毕业'].push(m)
      } else {
        groups['硕士在读'].push(m)
      }
    }
  })
  // 博士组内排序：邵红恩、王勤玉、谢灿豪、万李铭锐最前
  const phdOrder = ['邵红恩', '王勤玉', '谢灿豪', '万李铭锐']
  groups['博士'] = [
    ...phdOrder.map(name => groups['博士'].find(m => m.name === name)).filter(Boolean),
    ...groups['博士'].filter(m => !phdOrder.includes(m.name))
  ]
  // 硕士组内排序：庄晓斌在江咏麟前，林泽枫倒数第二，蔡昊洋最后
  const sortMasterList = (masterList) => {
    const zhuang = masterList.find(m => m.name === '庄晓斌')
    const jiang = masterList.find(m => m.name === '江咏麟')
    const lin = masterList.find(m => m.name === '林泽枫')
    const cai = masterList.find(m => m.name === '蔡昊洋')
    const others = masterList.filter(m => !['庄晓斌', '江咏麟', '林泽枫', '蔡昊洋'].includes(m.name))
    return [
      ...others,
      ...(zhuang ? [zhuang] : []),
      ...(jiang ? [jiang] : []),
      ...(lin ? [lin] : []),
      ...(cai ? [cai] : [])
    ]
  }
  groups['硕士在读'] = sortMasterList(groups['硕士在读'])
  groups['硕士已毕业'] = sortMasterList(groups['硕士已毕业'])
  return {
    '导师': groups['导师'],
    '博士后': groups['博士后'],
    '博士': groups['博士'],
    '硕士在读': groups['硕士在读'],
    '硕士已毕业': groups['硕士已毕业']
  }
}
const grouped = groupMembers(teamMembers.value)
</script>

<style lang="scss" scoped>
.team-container {
  .team-section {
    margin-bottom: 50px;

    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 40px;
      color: #2c3e50;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background-color: #004380;
      }
    }

    .members {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 20px;
      
      .member-card {
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .member-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          text-align: center;

          .avatar {
            margin-bottom: 20px;
            
            .el-avatar {
              border: 3px solid #004380;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
          }

          .details {
            .member-role {
              display: inline-block;
              padding: 4px 12px;
              background-color: #004380;
              color: white;
              border-radius: 20px;
              font-size: 1.2rem;
              margin-bottom: 10px;
            }

            .member-name {
              font-size: 2rem;
              color: #2c3e50;
              margin: 0;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

.group-title {
  font-size: 2rem;
  color: #004380;
  margin: 40px 0 20px 0;
  font-weight: bold;
  text-align: left;
}

.subgroup-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 20px 0 10px 20px;
  font-weight: 600;
  text-align: left;
}

:deep(.member-dialog) {
  .el-dialog__header {
    background-color: #004380;
    margin: 0;
    padding: 20px;
    border-radius: 8px 8px 0 0;

    .el-dialog__title {
      color: white;
      font-size: 1.4rem;
    }

    .el-dialog__headerbtn {
      .el-dialog__close {
        color: white;
      }
    }
  }

  .el-dialog__body {
    padding: 30px;

    .dialog-content {
      .member-header {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;

        .member-avatar {
          .el-avatar {
            border: 3px solid #004380;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
        }

        .member-basic-info {
          .member-role {
            display: inline-block;
            padding: 4px 12px;
            background-color: #004380;
            color: white;
            border-radius: 20px;
            font-size: 1rem;
            margin-bottom: 10px;
          }

          h3 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin: 0;
          }
        }
      }

      .member-details {
        .detail-section {
          margin-bottom: 25px;

          h4 {
            color: #004380;
            font-size: 1.2rem;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #eee;
          }

          p {
            color: #666;
            line-height: 1.8;
            margin: 0;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              color: #666;
              line-height: 1.8;
              padding-left: 20px;
              position: relative;
              margin-bottom: 8px;

              &::before {
                content: '•';
                color: #004380;
                position: absolute;
                left: 0;
                font-size: 1.2em;
              }
            }
          }
        }
      }
    }
  }
}
</style> 
