<template>
  <div class="testlist">
    <TitleTop titletext="试卷列表"></TitleTop>
    <div class="main">
      <div class="content">
        <div class="test-type">
          <span>考试类型：</span>
          <div class="test-type-ipt">
            <el-select v-model="testTypeValue" clearable placeholder="请选择">
              <el-option
                v-for="item in testTypeList"
                :key="item.exam_id"
                :label="item.exam_name"
                :value="item.exam_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="test-type">
          <span>课程类型：</span>
          <div class="test-type-ipt">
            <el-select v-model="courseTypeValue" clearable placeholder="请选择">
              <el-option
                v-for="item in courseTypeList"
                :key="item.subject_id"
                :label="item.subject_text"
                :value="item.subject_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" icon="el-icon-search" class="search-btn" @click="searchBtn">搜索</el-button>
      </div>
      <div class="content1">
        <div class="header">
          <div class="title">
            <span>试卷列表</span>
          </div>
          <div class="select-block">
            <div
              v-for="(item,index) in checkBlockList"
              :key="index"
              @click="handleClick(index,item)"
              :class="{'active':index==defaultIndex}"
            >
              <span>{{item}}</span>
            </div>
          </div>
        </div>
        <div class="tables">
          <Pagintion :ToPageData="TestPageListNews">
            <el-table-column prop="title" label="试卷信息"></el-table-column>
            <el-table-column prop="exam_name" label="考试类型"></el-table-column>
            <el-table-column prop="subject_text" label="考试课程"></el-table-column>
            <el-table-column prop="grade_name" label="班级"></el-table-column>
            <el-table-column prop="user_name" label="创建人"></el-table-column>
            <el-table-column prop="start_time_local" label="开始时间"></el-table-column>
            <el-table-column prop="end_time_local" label="结束时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span class="detail-text" @click="ToDetail(scope)">{{scope.row.detail_text}}</span>
              </template>
            </el-table-column>
          </Pagintion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";
import Pagintion from "../components/Pagintion";
import { axios } from "@/utils/http.js";
import { constants } from "fs";

export default {
  data() {
    return {
      testTypeValue: "",
      courseTypeValue: "",
      checkBlockValue: "全部",
      checkBlockList: ["全部", "未开始", "进行中", "已结束"],
      defaultIndex: 0,
      TestPageListNews: [],
      TestPageListNew: [],
      TestPageListNewState: []
    };
  },
  computed: {
    ...mapState({
      testTypeList: state => state.examManger.testTypeList,
      courseTypeList: state => state.examManger.courseTypeList,
      TestPageList: state => state.examManger.TestPageList
    })
  },
  async created() {
    this.getTestList();
    this.getCourseList();
    this.getTestPageLists();
    let result = await this.getTestPageList();
    let results = result.data.exam.map(res => {
      res.end_time_local = new Date(+res.end_time).toLocaleString();
      res.start_time_local = new Date(+res.start_time).toLocaleString();
      res.detail_text = "详情";
      return res;
    });
    this.TestPageListNews = results;
    this.TestPageListNewState = results;
  },
  methods: {
    ToDetail(scope) {
      this.$router.push({
        path: "/Home/TestListDetail",
        query: {
          exam_exam_id: scope.row.exam_exam_id
        }
      });
    },
    getTestPageList() {
      return axios.get("/exam/exam");
    },
    searchBtn() {
      this.testTypeValue = this.testTypeValue == null ? "" : this.testTypeValue;
      this.courseTypeValue =
        this.courseTypeValue == null ? "" : this.courseTypeValue;
      this.TestPageListNew = this.TestPageList;
      let nowTime = new Date().getTime();
      if (this.defaultIndex == 3) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime > +values.end_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 2) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime < +values.end_time &&
            nowTime > +values.start_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 1) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime < +values.start_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 0) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue)
          ) {
            return values;
          }
        });
      }
    },
    handleClick(index, item) {
      this.defaultIndex = index;
      this.checkBlockValue = item;
      this.TestPageListNew = this.TestPageList;
      let nowTime = new Date().getTime();
      if (this.defaultIndex == 3) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime > +values.end_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 2) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime < +values.end_time &&
            nowTime > +values.start_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 1) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue) &&
            nowTime < +values.start_time
          ) {
            return values;
          }
        });
      } else if (this.defaultIndex == 0) {
        this.TestPageListNews = this.TestPageListNew.filter(values => {
          if (
            values.exam_type.includes(this.testTypeValue) &&
            values.subject_id.includes(this.courseTypeValue)
          ) {
            return values;
          }
        });
      }
    },
    getTestList() {
      this.$store.dispatch("examManger/getTestList");
    },
    getCourseList() {
      this.$store.dispatch("examManger/getCourseList");
    },
    getTestPageLists() {
      this.$store.dispatch("examManger/getTestPageList");
    }
  },
  components: {
    TitleTop,
    Pagintion
  }
};
</script>
<style scoped  lang="scss">
.testlist {
  width: 100%;
  .main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    background-color: #f2f0f5;
    .content {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: #fff;
      padding: 20px 20px 60px 20px;
      display: flex;
      .test-type {
        display: flex;
        span {
          margin-left: 60px;
          line-height: 40px;
        }
      }
      .search-btn {
        width: 130px;
        height: 40px;
        margin-left: 60px;
        background-color: #0139fd;
      }
    }
    .content1 {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: #fff;
      padding: 20px;
      .header {
        display: flex;
        justify-content: space-between;
        .title {
          line-height: 32px;
          span {
            margin-left: 20px;
          }
        }
        .select-block {
          display: flex;
          div {
            width: 73px;
            height: 32px;
            text-align: center;
            border: 1px solid #ccc;
            border-collapse: collapse;
            &.active {
              border: 1px solid #0139fd;
              span {
                line-height: 32px;
                color: #0139fd;
              }
            }
            span {
              line-height: 32px;
              color: #ccc;
            }
          }
        }
      }
      .tables {
        padding-left: 20px;
        .detail-text {
          color: #0139fd;
        }
      }
    }
  }
}
</style>