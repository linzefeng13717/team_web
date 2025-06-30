<template>
  <el-header class="header">
    <div class="header-content">
      <!-- <div class="logo-container">
        <img src="../assets/logo.png" alt="Lab Logo" class="logo">
        <span class="conference-name">Lab</span>
      </div> -->
      
      <el-menu 
        mode="horizontal" 
        :router="true"
        class="nav-menu"
        :ellipsis="false"
        background-color="#004380"
        text-color="white"
        active-text-color="white">
        <el-menu-item index="/">实验室首页</el-menu-item>
        <el-menu-item index="/leaders">导师队伍</el-menu-item>
        <el-menu-item index="/members">学术团队</el-menu-item>
        <el-menu-item index="/research">研究方向</el-menu-item>
        <el-menu-item index="/papers">研究成果</el-menu-item>
        <el-menu-item index="/admission">硕博招生</el-menu-item>
        <el-menu-item index="/partner">合作伙伴</el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #004380;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0;

  .header-content {
    max-width: 1400px; // 限制最大宽度
    margin: 0 auto; // 居中
    padding: 10 20px;
    display: flex;
    align-items: center;
    justify-content: center; // 居中
    height: 100%;
  }

  .logo-container {
    display: flex;
    align-items: center;
    min-width: 200px; // 确保logo区域有足够空间
    
    .logo {
      height: 40px;
      margin-right: 10px;
    }

    .conference-name {
      font-size: 1.3rem;
      font-weight: bold;
      color: whitesmoke;
    }
  }

  .nav-menu {
    border: none;
    flex: 1;
    background-color: #004380;
    justify-content: center; // 居中
    margin-left: 0; // 去掉左边距

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      padding: 0 16px;
      font-size: 1.2rem;
      display: flex;
      color: white;
      align-items: center;
      line-height: 60px;
      height: 60px;

      &:hover {
        background-color: transparent !important;
      }

      &.is-active {
        background-color: transparent !important;
      }
    }

    :deep(.el-menu-item) {
      &::after {
        display: none !important;
      }
    }

    :deep(.el-sub-menu) {
      &:hover {
        .el-sub-menu__title {
          background-color: transparent !important;
        }
      }

      .el-sub-menu__title {
        padding-right: 24px; // 为下拉箭头留出空间
        position: relative;

        .el-sub-menu__icon-arrow {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: white; // 箭头颜色设为白色
          font-size: 12px; // 调整箭头大小
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 1200px) {
  .header {
    .nav-menu {
      margin-left: 20px;

      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        padding: 0 12px;
      }

      :deep(.el-sub-menu__title) {
        padding-right: 20px;
      }
    }
  }
}
</style> 