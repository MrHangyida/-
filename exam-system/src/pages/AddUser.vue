<style scoped lang='scss'>
.adduser {
  width: 100%;
  background: #f2f0f5;
  padding-bottom: 50px;
  main {
    width: 95%;
    margin: 0 auto;
    border: 1px solid #ccc;
    ul {
      width: 33.33%;
      float: left;
      border-right: 1px solid #ccc;
      border-radius: 5px;
      .title {
        width: 100%;
        height: 50px;
        display: flex;
        margin-left: 10px;
        align-items: center;
        li {
          width: 90px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #fff;
          color: #295eff;
          border: 1px solid #ccc;
          &.bg {
            border: 1px solid #295eff;
          }
        }
      }
      .view {
        width: 100%;
        height: 238px;
        border-bottom: 1px solid #ccc;
        border-radius: 5px;
        &:nth-of-type(3) {
          width: 100%;
          height: 280px;
        }
        &.he1 {
          height: 288px;
        }
        &.he2 {
          height: 330px;
        }
        .box {
          width: 94%;
          height: 90%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          .btn {
            width: 100%;
          }
          .select {
            width: 100%;
          }
          #elbtn1 {
            height: 20px;
          }
        }
      }
      .he11 {
        width: 100%;
        height: 226px;
        border-bottom: 1px solid #ccc;
        border-radius: 5px;
        .box {
          width: 94%;
          height: 90%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          .btn {
            width: 100%;
          }
          .select {
            width: 100%;
          }
          #elbtn1 {
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="adduser">
    <TitleTop titletext=" 添加用户"></TitleTop>
    <main :style="height">
      <ul>
        <div class="title">
          <li @click="add(0)" :class="{bg:open==0}">添加用户</li>
          <li @click="add(1)" :class="{bg:open==1}">更新用户</li>
        </div>
        <div v-show="open==0" class="view">
          <div class="box">
            <el-input size="small" v-model="user1" id="elbtn1q" placeholder="请输入用户名"></el-input>
            <el-input size="small" v-model="pwd1" placeholder="请输入密码" show-password></el-input>
            <div class="select">
              <el-select size="small" v-model="shenfen" placeholder="请选择身份id">
                <el-option
                  v-for="item in IdentityData"
                  :key="item.identity_text"
                  :label="item.identity_text"
                  :value="item.identity_id"
                ></el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button
                @click="adds()"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong1">重置</el-button>
            </div>
          </div>
        </div>
        <div v-show="open==1" class="view">
          <div class="box">
            <div class="select">
              <el-select size="small" v-model="shenfen1" placeholder="请选择身份id用户名">
                <el-option
                  v-for="item in UserData"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_id"
                ></el-option>
              </el-select>
            </div>
            <el-input size="small" v-model="user2" id="elbtn1w" placeholder="请输入用户名"></el-input>
            <el-input size="small" v-model="pwd2" placeholder="请输入密码" show-password></el-input>
            <div class="select">
              <el-select size="small" v-model="shenfen2" placeholder="请选择身份id">
                <el-option
                  v-for="item in IdentityData"
                  :key="item.identity_text"
                  :label="item.identity_text"
                  :value="item.identity_id"
                ></el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button
                @click="adds1()"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong2">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
      <ul>
        <div class="view" :class="open==0?'he1':'he2'">
          <div class="title">
            <li class="bg">添加身份</li>
          </div>
          <div class="box" style="height:40%;">
            <el-input size="small" v-model="tianjiashenfen" id="elbtn1e" placeholder="请输入身份名称"></el-input>
            <div class="btn">
              <el-button
                @click="adds2()"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong3()">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
      <ul>
        <div class="view" :class="open==0?'he1':'he2'">
          <div class="title">
            <li class="bg" style="width:120px;">添加api接口权限</li>
          </div>
          <div class="box" style="height:66%;">
            <el-input size="small" v-model="api1" id="elbtn1r" placeholder="请输入api接口权限名称"></el-input>
            <el-input size="small" v-model="api2" id="elbtn1t" placeholder="请输入api接口权限url"></el-input>
            <el-input size="small" v-model="api3" id="elbtn1y" placeholder="请输入api接口权限方法"></el-input>
            <div class="btn">
              <el-button
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
                @click="adds3()"
              >确定</el-button>
              <el-button size="small" @click="chong4">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
      <ul>
        <div class="he11">
          <div class="title">
            <li class="bg" style="width:130px;">添加视图接口权限</li>
          </div>
          <div class="box" style="height:50%;">
            <div class="select">
              <el-select size="small" v-model="views" placeholder="请选择已有视图">
                <el-option
                  v-for="item in UserView"
                  :key="item.view_id"
                  :label="item.view_authority_text"
                  :value="item.view_id"
                ></el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button
                @click="adds4"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong5">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
      <ul>
        <div class="he11">
          <div class="title">
            <li class="bg" style="width:170px;">给身份设置api接口权限</li>
          </div>
          <div class="box" style="height:60%;">
            <div class="select">
              <el-select size="small" v-model="shenfen3" placeholder="请选择身份id">
                <el-option
                  v-for="item in IdentityData"
                  :key="item.identity_text"
                  :label="item.identity_text"
                  :value="item.identity_id"
                ></el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select size="small" v-model="apiid" placeholder="请选择api接口权限id">
                <el-option
                  v-for="item in ApiAuthority"
                  :key="item.api_authority_id"
                  :label="item.api_authority_text"
                  :value="item.api_authority_id"
                ></el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button
                @click="adds5"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong6">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
      <ul>
        <div class="he11">
          <div class="title">
            <li class="bg" style="width:160px;">给身份设置视图权限</li>
          </div>
          <div class="box" style="height:60%;">
            <div class="select">
              <el-select size="small" v-model="shenfen4" placeholder="请选择身份id">
                <el-option
                  v-for="item in IdentityData"
                  :key="item.identity_text"
                  :label="item.identity_text"
                  :value="item.identity_id"
                ></el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select size="small" v-model="shenfen5" placeholder="请选择视图权限id">
                <el-option
                  v-for="item in UserView"
                  :key="item.view_id"
                  :label="item.view_authority_text"
                  :value="item.view_id"
                ></el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button
                @click="adds6"
                type="primary"
                size="small"
                style="width:120px;background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;"
              >确定</el-button>
              <el-button size="small" @click="chong7">重置</el-button>
            </div>
          </div>
        </div>
      </ul>
    </main>
  </div>
</template>
<script>
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";
export default {
  methods: {
    add(i) {
      if (i == 0) {
        this.height.height = "516px";
      } else {
        this.height.height = "558px";
      }
      this.open = i;
    },
    adds() {
      if (this.user1 != "" && this.pwd1 != "" && this.shenfen != "") {
        this.$store.dispatch("examManger/userDatas", {
          user_name: this.user1,
          user_pwd: this.pwd1,
          identity_id: this.shenfen
        });
        return;
      }
    },
    chong1() {
      this.user1 = "";
      this.pwd1 = "";
      this.shenfen = "";
    },
    adds1() {
      if (
        this.shenfen1 != "" &&
        this.user2 != "" &&
        this.pwd2 != "" &&
        this.shenfen2 != ""
      ) {
        this.$store.dispatch("examManger/getUserDatas", {
          user_id: this.shenfen1,
          user_name: this.user2,
          user_pwd: this.pwd2,
          identity_id: this.shenfen2
        });
      }
    },
    chong2() {
      this.shenfen1 = "";
      this.user2 = "";
      this.pwd2 = "";
      this.shenfen2 = "";
    },
    adds2() {
      if (this.tianjiashenfen != "") {
        this.$store.dispatch("examManger/getuseridentityedit", {
          identity_text: this.tianjiashenfen
        });
      }
    },
    chong3() {
      this.tianjiashenfen = "";
    },
    adds3() {
      if (this.api1 != "" && this.api2 != "" && this.api3 != "") {
        this.$store.dispatch("examManger/getuserauthorityApiedit", {
          api_authority_text: this.api1,
          api_authority_url: this.api2,
          api_authority_mehtod: this.api3
        });
      }
    },
    chong4() {
      this.api1 = "";
      this.api2 = "";
      this.api3 = "";
    },
    adds4() {
      let view_id = this.UserView.find(item => item.view_id == this.views);
      console.log(view_id);
      if (this.views != "" && view_id) {
        this.$store.dispatch("examManger/getuserauthorityViewedit", {
          view_authority_text: view_id.view_authority_text,
          view_id: this.views
        });
      }
    },
    chong5() {
      this.views = "";
    },
    adds5() {
      if (this.shenfen3 != "" && this.apiid != "") {
        this.$store.dispatch("examManger/getusersetIdentityApi", {
          identity_id: this.shenfen3,
          api_authority_id: this.apiid
        });
      }
    },
    chong6() {
      this.shenfen3 = "";
      this.apiid = "";
    },
    chong7() {
      (this.shenfen4 = ""), (this.shenfen5 = "");
    },
    adds6() {
      if (this.shenfen4 != "" && this.shenfen5 != "") {
        this.$store.dispatch("examManger/getusersetIdentityView", {
          identity_id: this.shenfen4,
          view_authority_id: this.shenfen5
        });
      }
    }
  },
  data() {
    return {
      open: 0,
      user1: "",
      pwd1: "",
      user2: "",
      pwd2: "",
      shenfen: "",
      shenfen1: "",
      shenfen2: "",
      shenfen3: "",
      shenfen4: "",
      shenfen5: "",
      height: {
        height: "516px"
      },
      input: "",
      value: "",
      options: [],
      tianjiashenfen: "",
      api1: "",
      api2: "",
      api3: "",
      views: "",
      apiid: ""
    };
  },
  computed: {
    ...mapState({
      IdentityData: state => state.examManger.IdentityData,
      UserData: state => state.examManger.UserData,
      UserView: state => state.examManger.UserView,
      ApiAuthority: state => state.examManger.ApiAuthority
    })
  },
  created() {
    this.$store.dispatch("examManger/getIdentityData");
    this.$store.dispatch("examManger/getUserData");
    this.$store.dispatch("examManger/getUserInfo");
    this.$store.dispatch("examManger/getApiAuthority");
  },
  components: {
    TitleTop
  },
  mounted() {}
};
</script>
