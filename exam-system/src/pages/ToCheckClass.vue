<template>
  <div class="ToCheckClass">
    <TitleTop titletext="待批班级"></TitleTop>
    <main>
      <Pagintion :ToPageData="ToCheckClassData">
        <el-table-column fixed prop="grade_name" label="班级名"></el-table-column>
        <el-table-column prop="subject_text" label="课程名称"></el-table-column>
        <el-table-column prop label="阅卷状态" width="200"></el-table-column>
        <el-table-column prop="subject_text" label="课程名称"></el-table-column>
        <el-table-column fixed="right" prop="room_text" label="成才率"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index,scope.row)"
              type="text"
              size="small"
            >批卷</el-button>
          </template>
        </el-table-column>
      </Pagintion>
    </main>
  </div>
</template>
<script>
import TitleTop from "../components/TitleTop";
import Pagintion from "../components/Pagintion";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      ToCheckClassData: state => state.examManger.ToCheckClassData
    })
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("examManger/ToCheckClassData");
  },
  methods: {
    deleteRow(index, rows) {
      //   rows.splice(index, 1);
      // console.log(12345, rows);
      this.$router.push({
        path: "/Home/Classmate",
        query: {
          grade_id: rows.grade_id,
          grade_name: rows.grade_name
        }
      });
    }
  },
  components: {
    TitleTop,
    Pagintion
  }
};
</script>
<style scoped  lang="scss">
.ToCheckClass {
  margin-top: 8px;
  width: 100%;
  background: #e9eef3;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}
main {
  width: 97%;
  border-radius: 10px;
  padding-bottom: 30px;
  margin: 0 auto;
  background: #fff;
  flex: 1;

  .block {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>