<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 左边部分 -->
      <div class="left-head">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse" :class="isCollapse ?  'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
        <img class="logo" src="./img/logo.png" alt />
        <span class="leftword">黑马面面</span>
      </div>
      <!-- 右边部分 -->
      <div class="right-head">
        <img :src='avatar' alt="">
        <span class="name">{{userName}},你好</span>
        <el-button size="small" type="primary" @click="dologinOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
       <el-aside class="my-aside" width="auto">
        <el-menu router :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main class="my-main">
        <router-view>
          <!-- 子路由的出口 -->
        </router-view>
      </el-main>


    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from '@/api/index.js'
import { removeToken } from '@/utilis/token.js'
export default {
  data(){
    return{
      userName:'',
      avatar:'',
       // 是否折叠菜单
      isCollapse: false
    }
  },
  methods: {
    // 退出点击事件
    dologinOut() {
        this.$confirm('您是否要退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          //点击确认就发送退出请求
          logout().then(()=>{
            
              this.$message.success('退出成功')
              // 再删除本地的token
              removeToken()
              // 在跳转回登录页
              this.$router.push('/login')
          })
        }).catch(() => {
          this.$message.success('谢谢')          
        });
  }
  },
  created() {
    
    // 一进页面就调用请求用户信息函数方法
    info().then(res=>{
      // window.console.log(res)
      this.userName=res.data.data.username
      this.avatar=process.env.VUE_APP_URL+'/'+res.data.data.avatar
    })
  },
}
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
    display: flex;
    justify-content: space-between;
    .left-head {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size:24px;
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
    .right-head{
      height: 100%;
      display: flex;
      align-items: center;
      img{
         width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      span.name{
        font-size:14px;
        margin-right:38px;
      }
    }
  }
  .my-main {
    background-color: #0094ff;
  }
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>