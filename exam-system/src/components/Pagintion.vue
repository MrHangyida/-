<template>
    <div>
        <el-table
            class="title"
            background=""
            :data="ToPageData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%;border-radius: 10px;  margin:0 auto; "
            :header-cell-style="{color:'#262626',background:'#F4F7F9'}"
        >
            <slot></slot>
        </el-table>
        <div class="block">
            <el-pagination
                class="pagin"
                background=""
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pagesizes"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="ToPageData.length"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  props: ["ToPageData"], //数据
  components: {},
  data() {
    return {
      currentPage: 1, //当前页数
      pagesize: 10, //默认10条
      pagesizes: [5, 10, 20, 50, 100] //下拉框
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.block {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.title {
  margin: 20px 0;
}
.pagin {
  margin: 10px 0 20px 0;
}
</style>