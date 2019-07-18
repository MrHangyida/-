<template>
    <div class="login" @keyup.enter="login">
        <div class="login-content">
            <div class="iptbox user_name">
                <el-input
                    class="ipt"
                    placeholder="请输入用户名"
                    v-model="username"
                    clearable
                    prefix-icon="el-icon-user"
                ></el-input>
            </div>
            <div class="iptbox pwd">
                <el-input
                    class="ipt"
                    placeholder="请输入密码"
                    v-model="password"
                    show-password
                    prefix-icon="el-icon-unlock"
                ></el-input>
            </div>
            <div class="text-area">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <span>忘记密码</span>
            </div>
            <el-row>
                <el-button type="primary" class="login-btn" @click.stop="login">登录</el-button>
            </el-row>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "w916peach",
      password: "Peach0126!",
      checked: false
    };
  },
  computed: {},
  methods: {
    login() {
      if (this.username != "" && this.password != "") {
        this.$store.dispatch("examManger/gettoken", {
          username: this.username,
          password: this.password
        });
      } else {
        this.$message.error("用户名和密码不能为空！");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../public/images/background.png");
  background-size: 100% 100%;
  background-repeat: repeat;
  position: relative;
  .login-content {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(30%, -60%);
    border-radius: 5px;
    box-sizing: border-box;
    padding-top: 40px;
    .iptbox {
      width: 358px;
      height: 40px;
      background-color: #f0f0f0;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      .ipt {
        background-color: #f0f0f0;
      }
    }
    .text-area {
      width: 358px;
      height: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #409eff;
      }
    }
    .login-btn {
      margin-top: 30px;
      width: 358px;
      height: 40px;
    }
  }
}
</style>
