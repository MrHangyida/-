<style scoped>
.Classmate {
  margin-top: 8px;
  width: 100%;
  background: #e9eef3;
  padding-bottom: 100px;
}
.nav {
  width: 97%;
  height: 120px;
  border-radius: 10px;
  background: #fff;
  position: relative;
  top: 40px;
  margin: 0 auto;
}
.nav .btn {
  width: 130px;
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
}
main {
  width: 97%;
  /* height: 420px; */
  border-radius: 10px;
  background: #fff;
  position: relative;
  top: 50px;
  margin: 0 auto;
  padding-bottom: 70px;
}
.nav .centent {
  width: 70%;
  height: 50px;
  /* background: red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 30px;
  margin-left: 50px;
}
</style>
<template>
  <div class="Classmate">
    <div class="nav">
      <div class="centent">
        <div>状态：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>班级：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in ToCheckClassData"
              :key="item.grade_name"
              :label="item.label"
              :value="item.grade_name"
            ></el-option>
          </el-select>
        </div>
        <el-button class="btn" type="primary">
          <i class="el-icon-search"></i>查询
        </el-button>
      </div>
    </div>
    <main>
      <TitleTop titletext="试卷列表"></TitleTop>
      <Pagintion :ToPageData="ClassmateData">
        <!-- answer_json_path: "00cq3-exun9m5-eflgft-7gu9g6r.json"
              end_time: "2019/3/16 上午11:30:00"
              exam_exam_id: "e9gl9p-6wsmgl"
              exam_student_id: "00cq3-exun9m5-eflgft-7gu9g6r"
              grade_id: "bx4ac-o7304f-xl8k2r-7fco1d"
              grade_name: "1612B"
              score: 0
              start_time: "2019/3/16 上午10:00:00"
              status: 0
              student_id: "18382100352"
        student_name: "唐小彬"-->
        <el-table-column prop="grade_name" label="班级" width="150"></el-table-column>
        <el-table-column prop="student_name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="status" label="阅卷状态" width="150"></el-table-column>
        <el-table-column prop="start_time" label="开始时间" width="auto"></el-table-column>
        <el-table-column prop="end_time" label="结束时间" width="auto"></el-table-column>
        <el-table-column prop="-" label="成材率" width="100">-</el-table-column>
        <el-table-column label="操作">
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
import Pagintion from "../components/Pagintion";
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";
export default {
  components: {
    TitleTop,
    Pagintion
  },
  computed: {
    ...mapState({
      ClassmateData: state => state.examManger.ClassmateData,
      ToCheckClassData: state => state.examManger.ToCheckClassData
    })
  },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  methods: {
    deleteRow(index, rows) {
      // console.log(rows);
    }
  },
  created() {
    this.$store.dispatch("examManger/ClassmateData", this.$route.query);
    // console.log(this.ClassmateData,123)
  }
};
</script>
