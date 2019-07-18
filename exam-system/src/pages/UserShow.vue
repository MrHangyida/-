<template>
  <div class="ListUser">
    <div class="title">
      <TitleTop titletext="用户展示"></TitleTop>
    </div>
    <el-tabs v-model="activeName" @tab-click="getViews(activeName)">
      <el-tab-pane label="用户数据" name="1">
        <h1>用户数据</h1>
        <Pagintion :ToPageData="UserData">
          <el-table-column prop="user_name" label="用户名" width="200"></el-table-column>
          <el-table-column prop="user_pwd" label="密码"></el-table-column>
          <el-table-column prop="identity_text" label="身份" width="200"></el-table-column>
        </Pagintion>
      </el-tab-pane>
      <el-tab-pane label="身份数据" name="2">
        <h1>身份数据</h1>
        <Pagintion :ToPageData="IdentityData">
          <el-table-column prop="identity_text" label="身份名称"></el-table-column>
        </Pagintion>
      </el-tab-pane>
      <el-tab-pane label="api接口权限" name="3">
        <h1>api接口权限</h1>
        <Pagintion :ToPageData="ApiAuthority" style="width: 100%">
          <el-table-column prop="api_authority_text" label="api权限名称" width="400"></el-table-column>
          <el-table-column prop="api_authority_url" label="api权限url" width="400"></el-table-column>
          <el-table-column prop="api_authority_method" label="api权限方法"></el-table-column>
        </Pagintion>
      </el-tab-pane>
      <el-tab-pane label="身份和api接口关系" name="4">
        <h1>身份和api接口关系</h1>
        <Pagintion :ToPageData="identityApiAuthorityRelation" style="width: 100%">
          <el-table-column prop="identity_text" label="身份名称" width="300"></el-table-column>
          <el-table-column prop="api_authority_text" label="api权限名称" width="400"></el-table-column>
          <el-table-column prop="api_authority_url" label="api权限url" width="400"></el-table-column>
          <el-table-column prop="api_authority_method" label="api权限url"></el-table-column>
        </Pagintion>
      </el-tab-pane>
      <el-tab-pane label="视图接口权限" name="5">
        <h1>视图接口权限</h1>
        <Pagintion :ToPageData="viewAuthority" style="width: 100%">
          <el-table-column prop="view_authority_text" label="试图权限名称" width="400"></el-table-column>
          <el-table-column prop="view_id" label="试图id"></el-table-column>
        </Pagintion>
      </el-tab-pane>
      <el-tab-pane label="身份和视图权限关系" name="6">
        <h1>身份和视图权限关系</h1>
        <Pagintion :ToPageData="identityViewAuthorityRelation" style="width: 100%">
          <el-table-column prop="identity_text" label="身份" width="400"></el-table-column>
          <el-table-column prop="view_authority_text" label="视图名称" width="400"></el-table-column>
          <el-table-column prop="view_id" label="视图id"></el-table-column>
        </Pagintion>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Pagintion from "../components/Pagintion";
import { mapState } from "vuex";
import TitleTop from "@/components/TitleTop";
export default {
  components: {
    TitleTop,
    Pagintion
  },
  data() {
    return {
      activeName: "1",
      activeList: [
        "getUserData",
        "getIdentityData",
        "getApiAuthority",
        "getidentityApiAuthorityRelation",
        "getviewAuthority",
        "getidentityViewAuthorityRelation"
      ]
    };
  },
  computed: {
    ...mapState({
      UserData: state => state.examManger.UserData,
      IdentityData: state => state.examManger.IdentityData,
      ApiAuthority: state => state.examManger.ApiAuthority,
      identityApiAuthorityRelation: state =>
        state.examManger.identityApiAuthorityRelation,
      viewAuthority: state => state.examManger.viewAuthority,
      identityViewAuthorityRelation: state =>
        state.examManger.identityViewAuthorityRelation
    })
  },
  methods: {
    getViews(activeName) {
      this.$store.dispatch(`examManger/${this.activeList[activeName - 1]}`);
    }
  },
  created(){
      this.getViews(1)
  }
};
</script>
<style scoped>
.ListUser {
  padding: 0 1.5%;
}
.title {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
}
.ListUser {
  width: 100%;
  height: 100%;
  position: relative;
}
h1 {
  font-size: 26px;
  font-weight: 200;
  padding: 15px 0;
}
.paging {
  position: absolute;
  right: 0px;
}
</style>
