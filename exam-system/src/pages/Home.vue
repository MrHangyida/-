<template>
  <div class="Home">
    <div class="header">
      <div class="logo">
        <img
          src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1551624718911&amp;di=4a7004f8d71bd8da84d4eadf1b59e689&amp;imgtype=0&amp;src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
          alt=""
        >
      </div>
      <div class="userinfo">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-submenu index="1">
            <template slot="title" class="toptitle">
              <img
                style="width:30px;height:30px;border-radius: 50%;"
                src="../../public/images/headerphoto.jpg"
              >
              {{username}}
            </template>
            <el-menu-item index="1-1">个人中心</el-menu-item>
            <el-menu-item index="1-2">我的班级</el-menu-item>
            <el-menu-item index="1-3">设置</el-menu-item>
            <el-menu-item index="1-4" @click="exitLogin">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="section">
      <div class="menu">
        <el-col class="coll" :span="12">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#232A41"
            text-color="#fff"
            active-text-color="#ff0"
            unique-opened
          >
            <el-submenu :index="index+'1'" v-for="(item,index) in MenuList" :key="'o'+index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(x,y) in item.menus"
                  :key="'i'+y"
                  :index="x.path"
                  :class="{'is-active':$route.path == x.path}"
                >
                  <router-link :to="x.path" tag="span" class="span">{{x.title}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
      <div class="cont">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { axios } from "@/utils/http.js";

export default {
  data() {
    return {
      username: JSON.parse(window.sessionStorage.getItem("username")),
      viewDataList: [],
      MenuList: [],
      InitMenuList: [
        {
          title: "试题管理",
          icon: "el-icon-film",
          menus: [
            {
              title: "添加试题",
              path: "/Home/AddItem"
            },
            {
              title: "试题分类",
              path: "/Home/ItemType"
            },
            {
              title: "查看试题",
              path: "/Home/CheckItem"
            }
          ]
        },
        {
          title: "用户管理",
          icon: "el-icon-user",
          menus: [
            {
              title: "添加用户",
              path: "/Home/AddUser"
            },
            {
              title: "用户展示",
              path: "/Home/UserShow"
            }
          ]
        },
        {
          title: "考试管理",
          icon: "el-icon-postcard",
          menus: [
            {
              title: "添加考试",
              path: "/Home/AddTest"
            },
            {
              title: "试卷列表",
              path: "/Home/TestList"
            }
          ]
        },
        {
          title: "班级管理",
          icon: "el-icon-connection",
          menus: [
            {
              title: "班级管理",
              path: "/Home/ClassManger"
            },
            {
              title: "教室管理",
              path: "/Home/ClassRoomManger"
            },
            {
              title: "学生管理",
              path: "/Home/StudentsManger"
            }
          ]
        },
        {
          title: "阅卷管理",
          icon: "el-icon-notebook-2",
          menus: [
            {
              title: "批卷班级",
              path: "/Home/ToCheckClass"
            }
          ]
        }
      ]
    };
  },
  async created() {
    this.getUserInfos();
    let userinfo = await this.getUserInfo();
    if (userinfo.data.code == 1) {
      let userviewdata = await this.getUserView(userinfo.data.data.user_id);
      this.viewDataList = userviewdata.data.data.map(res => {
        return res.view_authority_text;
      });
      this.renderMenuList();
    } else {
      this.$message.error("请求错误，请重试！");
    }
  },
  computed: {
    ...mapState({
      UserView: state => state.examManger.UserView
    })
  },
  methods: {
    renderMenuList() {
      let results = this.InitMenuList.filter(res => {
        let menu = res.menus.filter(res => {
          if (this.viewDataList.includes(res.title)) {
            return res;
          }
        });
        if (menu.length != 0) {
          return menu;
        }
      });
      this.MenuList = results;
    },
    getUserInfos() {
      this.$store.dispatch("examManger/getUserInfo");
    },
    getUserInfo() {
      return axios.get("/user/userInfo");
    },
    getUserView(userId) {
      return axios.get("/user/new", {
        params: {
          user_id: userId
        }
      });
    },
    exitLogin() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.Home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .span {
    width: 250px;
    height: 100%;
    text-align: center;
    transform: translateX(-90px);
    display: inline-block;
  }
  .header {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 3px 8px #ccc;
    .logo {
      width: 120px;
      height: 28px;
      margin-left: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userinfo {
      width: 150px;
      height: 64px;
      margin-right: 80px;
      .toptitle {
        width: 150px;
        height: 64px;
        display: flex;
      }
    }
  }
  .section {
    width: 100%;
    flex: 1;
    display: flex;
    .menu {
      width: 200px;
      height: 100%;
      background-color: #232a41;
      .coll {
        width: 200px;
        height: 100%;
        background-color: #232a41;
        .el-menu-vertical-demo {
          width: 200px;
          .el-submenu {
            width: 200px;
          }
        }
      }
    }
    .cont {
      flex: 1;
      overflow-y: scroll;
      background-color: #f2f0f5;
    }
  }
}
</style>
