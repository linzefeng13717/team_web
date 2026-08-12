<template>
  <footer class="footer">
    <div class="copyright">
      South China University of Technology<br />
      Guangzhou, Guangdong, P.R. China<br />
      Copyright © LAB 2025
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: #EAEAEA;
  color: black;
  padding: 20px 0;
  text-align: center;

  .copyright {
    font-size: 0.9rem;
    opacity: 0.8;
    
    a {
      color: black;
      text-decoration: none;
      margin-left: 10px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style> 