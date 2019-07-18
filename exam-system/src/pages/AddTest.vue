<template>
    <div class="addtest">
        <TitleTop titletext="添加考试"></TitleTop>
        <div class="main">
            <div class="content">
                <div class="testpage-name">
                    <span>
                        <em>*</em>试卷名称：
                    </span>
                    <div class="testpage-name-input">
                        <el-input v-model="testpageNameValue" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="test-type">
                    <span>
                        <em>*</em>选择考试类型：
                    </span>
                    <div class="test-type-input">
                        <el-select v-model="testTypeValue" placeholder="请选择">
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
                    <span>
                        <em>*</em>选择课程：
                    </span>
                    <div class="test-type-input">
                        <el-select v-model="courseTypeValue" placeholder="请选择">
                            <el-option
                                v-for="item in courseTypeList"
                                :key="item.subject_id"
                                :label="item.subject_text"
                                :value="item.subject_id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item-count">
                    <span>
                        <em>*</em>设置题量：
                    </span>
                    <div class="test-type-input">
                        <el-input-number
                            v-model="itemCount"
                            controls-position="right"
                            :min="3"
                            :max="10"
                        ></el-input-number>
                    </div>
                </div>
                <div class="exam-time">
                    <span>
                        <em>*</em>考试时间：
                    </span>
                    <div class="exam-time-input">
                        <el-date-picker
                            v-model="testStartTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            @change="changeTime"
                        ></el-date-picker>
                        <span>--</span>
                        <el-date-picker
                            v-model="testEndTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            @change="changeTime"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="create-page">
                    <el-button type="primary" class="submit-btn" @click="createTestPage">创建试卷</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";

export default {
  data() {
    return {
      testpageNameValue: "",
      testTypeValue: "",
      courseTypeValue: "",
      itemCount: 4,
      testStartTime: "",
      testEndTime: ""
    };
  },
  computed: {
    ...mapState({
      testTypeList: state => state.examManger.testTypeList,
      courseTypeList: state => state.examManger.courseTypeList
    })
  },
  created() {
    this.getTestTypeList();
    this.getCourseTypeList();
  },
  methods: {
    changeTime() {
      if (this.testStartTime != "" && this.testEndTime != "") {
        if (Date.parse(this.testStartTime) > Date.parse(this.testEndTime)) {
          this.$message.warning("结束时间不能小于开始时间！");
        }
      }
    },
    getTestTypeList() {
      this.$store.dispatch("examManger/getTestList");
    },
    getCourseTypeList() {
      this.$store.dispatch("examManger/getCourseList");
    },
    createTestPage() {
      if (
        this.courseTypeValue != "" &&
        this.testTypeValue != "" &&
        this.testpageNameValue != "" &&
        this.itemCount != "" &&
        this.testStartTime != "" &&
        this.testEndTime != ""
      ) {
        this.$router.push({
          name: "createTest",
          path: "/Home/createTest",
          params: {
            title: this.testpageNameValue,
            subject_id: this.courseTypeValue,
            exam_id: this.testTypeValue,
            number: this.itemCount,
            start_time: this.testStartTime,
            end_time: this.testEndTime
          }
        });
      } else {
        this.$message.warning("不能为空");
      }
    }
  },
  components: {
    TitleTop
  }
};
</script>
<style scoped  lang="scss">
.addtest {
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
      padding: 20px;
      .testpage-name {
        span {
          line-height: 40px;
          em {
            color: red;
            font-size: 14px;
            font-family: SimSun;
            padding: 0 6px 0 0;
          }
        }
        .testpage-name-input {
          width: 218px;
          height: 40px;
        }
      }
      .test-type {
        margin-top: 30px;
        span {
          line-height: 40px;
          em {
            color: red;
            font-size: 14px;
            font-family: SimSun;
            padding: 0 6px 0 0;
          }
        }
        .test-type-input {
          width: 120px;
          height: 40px;
        }
      }
      .item-count {
        margin-top: 30px;
        span {
          line-height: 40px;
          em {
            color: red;
            font-size: 14px;
            font-family: SimSun;
            padding: 0 6px 0 0;
          }
        }
        .test-type-input {
          width: 88px;
          height: 40px;
        }
      }
      .exam-time {
        margin-top: 30px;
        span {
          line-height: 40px;
          em {
            color: red;
            font-size: 14px;
            font-family: SimSun;
            padding: 0 6px 0 0;
          }
        }
        .exam-time-input {
          height: 40px;
          span {
            margin: 0 15px;
          }
        }
      }
      .create-page {
        width: 136px;
        height: 40px;
        margin-top: 60px;
        margin-bottom: 20px;
        .submit-btn {
          width: 136px;
          height: 40px;
          background-color: #0139fd;
        }
      }
    }
  }
}
</style>