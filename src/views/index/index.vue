<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left-head">
        <i class="el-icon-s-fold"></i>
        <img class="logo" src="./img/logo.png" alt />
        <span class="leftword">黑马面面</span>
      </div>
      <div class="right-head"></div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    .left-head {
      height: 60px;
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        width: 24px;
        height: 20px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-left:22px;
        margin-right:11px;
      }
      .leftword {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
  }
}

.my-aside {
  background-color: green;
}
.my-main {
  background-color: skyblue;
}
</style>