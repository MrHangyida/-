<template>
  <div class="itemtype">
    <TitleTop titletext="试题分类"></TitleTop>
    <main>
      <div class="box">
        <el-button class="btn" type="primary" @click="open">
          <i class="el-icon-plus elplus"></i>添加分类
        </el-button>
        <el-table class="tables" :data="itemTypeList" stripe style="width: 100%">
          <el-table-column prop="questions_type_id" label="类型ID" width="180"></el-table-column>
          <el-table-column prop="questions_type_text" label="类型名称" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="DelItemType(scope.$index,scope.row)"
              >{{scope.row.deltext}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </main>
  </div>
</template>

<script>
import TitleTop from "@/components/TitleTop";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    TitleTop
  },
  created() {
    this.ItemRender();
  },
  computed: {
    ...mapState({
      itemTypeList: state => state.examManger.itemTypeList
    })
  },
  mounted() {},
  methods: {
    DelItemType(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("examManger/DelItemType", row.questions_type_id);
          this.ItemRender();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ItemRender() {
      this.$store.dispatch("examManger/getItemList");
    },
    open() {
      this.$prompt("", "创建新类型", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(({ value }) => {
          this.$message({
            type: value ? "success" : "error",
            message: value ? "你的类型是: " + value : "值不可以为空！"
          });
          if (value != "") {
            this.ItemRender();
            this.$store.dispatch("examManger/addItemType", {
              text: value,
              sort: this.itemTypeList.length + 10
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
<style scoped  lang="scss">
.itemtype {
  width: 100%;
  height: 100%;
  background: #f2f0f5;
  .btn {
    background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  }
  .elplus {
    margin: 0 10px;
    font-weight: 800;
  }
  main {
    width: 97%;
    margin: 0 auto;
    padding-top: 20px;
    background: #fff;
    border-radius: 10px;
    .box {
      width: 95%;
      padding-bottom: 20px;
      margin: 0 auto;
      .tables {
        margin-top: 20px;
        width: 100% !important;
      }
    }
  }
}
</style>

