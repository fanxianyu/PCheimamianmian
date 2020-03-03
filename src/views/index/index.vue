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
        <img :src='this.$store.state.userPic' alt="">
        <span class="name">{{this.$store.state.userName}},你好</span>
        <el-button size="small" type="primary" @click="dologinOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
       <el-aside class="my-aside" width="auto">
        <el-menu router :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo">

          <template v-for="(item,index) in routerChildren">
              <el-menu-item  :key="index" :index='"/index/"+item.path'  v-if="item.meta.roles.includes($store.state.userStatus)">
            <i class="el-icon-pie-chart"></i>
            <span slot="title" >{{ item.meta.title }}</span>
          </el-menu-item>
          </template>

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
import { logout } from '@/api/index.js'
import { removeToken,getToken } from '@/utilis/token.js'
// 导入抽取的子路由文件
import routerChildren from '@/router/routerChildren.js'
export default {
  name:'user',
  data(){
    return{
      // 把子路由里面的东西存起来
      routerChildren,
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
              // 再删除vuex里面的内容
              this.$store.commit('changename','')
              this.$store.commit('changePic','')
              this.$store.commit('changestatus','')
              // 在跳转回登录页
              this.$router.push('/login')
          })
        }).catch(() => {
          this.$message.success('谢谢')          
        });
  }
  },
  beforeCreate() {
    // 在这里面判断获取的token是否为空  调用token工具
    if(getToken()==null){
      // 那么就要输入请登录信息，并且跳转回login页面
      this.$message.error('请先登录')
      this.$router.push('/login')
    }
  },
  created() {
    
    // 一进来页面就发送获取用户信息的请求
    // info().then(res=>{
    //   // window.console.log(res)
    //  if(res.data.code==200){
    //   this.userName=res.data.data.username
    //   this.avatar=process.env.VUE_APP_URL+'/'+res.data.data.avatar

    //  }else if(res.data.code==206){
    //    this.$message.error('登录状态异常，请重新登录')
    //   //  删除本地token
    //   removeToken()
    //   // 跳转回登录页
    //   this.$router.push('/login')
    //  }
    // })
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