<template>
  <page-base title="学生成员">
    <div class="team-container">
      <div class="team-section">
        <h2>实验室成员</h2>
        <div v-for="group in ['博士后', '博士', '硕士']" :key="group">
          <h3 class="group-title">{{ group }}</h3>
          <div class="members">
            <el-card v-for="(member, mIndex) in grouped[group]" 
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
          <div class="detail-section">
            <h4>邮箱</h4>
            <p>
              <a v-if="selectedMember.email" :href="`mailto:${selectedMember.email}`" target="_blank">{{ selectedMember.email }}</a>
              <span v-else>无</span>
            </p>
          </div>
          <div class="detail-section">
            <h4>个人简介</h4>
            <p>{{ selectedMember.bio || '无' }}</p>
          </div>
          <div class="detail-section">
            <h4>研究方向</h4>
            <ul>
              <li v-for="(research, index) in selectedMember.researchAreas" :key="index">
                {{ research }}
              </li>
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
  // 返回第一个扩展名的图片路径
  return `/images/${name}.${imageExtensions[0]}`
}

// 默认头像
const peopleImage = '/images/people_default.png'

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
    bio: "",
    researchAreas: ["深度学习编译器与框架"]
  },
  {
    name: "苏炳栋",
    email: "202320163118@mail.scut.edu.cn",
    role: "硕士",
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
    name: "邹骁锋",
    email: "zouxiaofeng@scut.edu.cn",
    role: "博士后",
    bio: "",
    researchAreas: ["体系结构"]
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
    bio: "",
    researchAreas: ["扩散模型加速"]
  },
  {
    name: "庄晓斌",
    email: "ftzxc111@mail.scut.edu.cn",
    role: "硕士",
    bio: "就读于华南理工大学未来技术学院。",
    researchAreas: ["深度学习", "软硬协同优化"]
  },
  {
    name: "蔡昊洋",
    email: "cai-haoyang@outlook.com",
    role: "硕士",
    bio: "无",
    researchAreas: ["深度学习编译器"]
  }
])

// 按身份分组
const groupMembers = (members) => {
  // 先分组
  const groups = {
    '博士后': [],
    '博士': [],
    '硕士': []
  }
  members.forEach(m => {
    if (m.role.includes('博士后')) {
      groups['博士后'].push(m)
    } else if (m.role.includes('博士')) {
      groups['博士'].push(m)
    } else if (m.role.includes('硕士')) {
      groups['硕士'].push(m)
    }
  })
  // 博士组内排序：邵红恩、王勤玉、谢灿豪、万李铭锐最前
  const phdOrder = ['邵红恩', '王勤玉', '谢灿豪', '万李铭锐']
  groups['博士'] = [
    ...phdOrder.map(name => groups['博士'].find(m => m.name === name)).filter(Boolean),
    ...groups['博士'].filter(m => !phdOrder.includes(m.name))
  ]
  // 硕士组内排序：庄晓斌在江咏麟前，林泽枫倒数第二，蔡昊洋最后
  const masterList = groups['硕士']
  const zhuang = masterList.find(m => m.name === '庄晓斌')
  const jiang = masterList.find(m => m.name === '江咏麟')
  const lin = masterList.find(m => m.name === '林泽枫')
  const cai = masterList.find(m => m.name === '蔡昊洋')
  const others = masterList.filter(m => !['庄晓斌', '江咏麟', '林泽枫', '蔡昊洋'].includes(m.name))
  groups['硕士'] = [
    ...others,
    ...(zhuang ? [zhuang] : []),
    ...(jiang ? [jiang] : []),
    ...(lin ? [lin] : []),
    ...(cai ? [cai] : [])
  ]
  // 返回有序分组
  return {
    '博士后': groups['博士后'],
    '博士': groups['博士'],
    '硕士': groups['硕士']
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