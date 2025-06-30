<template>
  <page-base title="硕博招生">
    <div class="admission-info">
      <h2>招生说明</h2>
      <p>
        本课题组每年招收博士生2名，硕士生2-4名，长期招收博士后，欢迎对人工智能、高性能计算等方向感兴趣的同学报考。
      </p>
      <p>
        课题组拥有丰富的科研资源和良好的学术氛围，导师经验丰富，团队成员团结协作。我们鼓励创新，支持学生参与国内外高水平学术交流。
      </p>
      <p>
        招生对象：
        <ul>
          <li>硕士研究生：计算机、电子、自动化、数学等相关专业优秀本科毕业生</li>
          <li>博士研究生：具有相关领域硕士学位，具备较强科研能力和创新精神</li>
        </ul>
      </p>
      <p>
        有意向的同学请将个人简历、成绩单及相关材料发送至邮箱：<b>chencen@scut.edu.cn</b>，邮件标题请注明"硕博招生-姓名-学校"。
      </p>
      <p>
        欢迎加入我们的团队，共同探索前沿科技！
      </p>
    </div>
  </page-base>
</template>

<script setup>
import PageBase from '@/components/PageBase.vue'
</script>

<style lang="scss" scoped>
.admission-info {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  font-size: 1.1rem;
  color: #2c3e50;

  h2 {
    color: #004380;
    margin-bottom: 24px;
    text-align: center;
  }
  ul {
    margin: 10px 0 10px 20px;
    padding-left: 20px;
    list-style: disc;
  }
  b {
    color: #004380;
  }
}
</style> 