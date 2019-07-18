<template>
  <div class="CheckItem">
    <h1>查看试题</h1>
    <div class="section" v-loading.body="loading">
      <el-row :gutter="20">
        <el-col :span="3.1" class="subject">课程类型：</el-col>
        <el-col :span="20">
          <div class="content">
            <p
              v-for="(item,index) in Subject"
              :class="item.flag?'active':''"
              :key="item.subject_id"
              @click="chooseSubject(index,item.subject_id)"
            >{{item.subject_text}}</p>
          </div>
        </el-col>
      </el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="考试类型">
          <el-select v-model="exam_id" placeholder="请选择">
            <el-option
              v-for="item in ExamType"
              :key="item.exam_id"
              :label="item.exam_name"
              :value="item.exam_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目类型">
          <el-select v-model="type_id" placeholder="请选择">
            <el-option
              v-for="item in QuestionsType"
              :key="item.questions_type_id"
              :label="item.questions_type_text"
              :value="item.questions_type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="section">
      <dl
        class="edit"
        v-for="(item,index) in getAllQuestions"
        :key="index"
        @click="condition(item.questions_type_id,item.subject_id,item.exam_id,item.questions_id)"
      >
        <dt>
          <h3>{{item.title}}</h3>
          <p>
            <span>{{item.questions_type_text}}</span>
            <span class="geekblue">{{item.subject_text}}</span>
            <span class="orange">{{item.exam_name}}</span>
          </p>
          <b>{{item.user_name}} 发布</b>
        </dt>
        <dd
          @click.stop="edit(item.questions_type_id,item.subject_id,item.exam_id,item.questions_id)"
        >编辑</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      getAllQuestions: state => state.examManger.getAllQuestions,
      ExamType: state => state.examManger.ExamType,
      QuestionsType: state => state.examManger.QuestionsType,
      Subject: state => state.examManger.Subject
    })
  },
  data() {
    return {
      loading: true,
      exam_id: "",
      type_id: "",
      subject_id: "",
      chooseSubjectInd: 0
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.$store.dispatch("examManger/getAllQuestions");
    this.$store.dispatch("examManger/getExamType");
    this.$store.dispatch("examManger/getQuestionsType");
    this.$store.dispatch("examManger/getSubject");
  },
  methods: {
    chooseSubject(index, subject_id) {
      if (this.Subject[index].flag) {
        this.Subject[index].flag = false;
        this.subject_id = "";
      } else {
        this.$store.commit("examManger/setSubjectFlag");
        this.Subject[index].flag = true;
        this.subject_id = subject_id;
      }
    },
    onSubmit() {
      this.$store.dispatch("examManger/getQueryItem", {
        exam_id: this.exam_id,
        questions_type_id: this.type_id,
        subject_id: this.subject_id
      });
    },
    condition(a, b, c, d) {
      this.$router.push(
        `/Home/CheckItemDetail?questions_type_id=${a}&subject_id=${b}&exam_id=${c}&questions_id=${d}`
      );
    },
    edit(a, b, c, d) {
      // this.$router.push(
      //   `/Home/CheckItemEdit?questions_type_id=${a}&subject_id=${b}&exam_id=${c}&questions_id=${d}`
      // );
      this.$router.push({
        name:'CheckItemEdit',
        path:'/Home/CheckItemEdit',
        params:{
          questions_type_id:a,
          subject_id:b,
          exam_id:c,
          questions_id:d,
        }
      });
      window.localStorage.setItem("a", a);
      window.localStorage.setItem("b", b);
      window.localStorage.setItem("c", c);
      window.localStorage.setItem("d", d);
    }
  }
};
</script>
<style scoped  lang="scss">
.CheckItem {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #e9eef3;
  color: #333;
  padding: 0 20px;
  box-sizing: border-box;
  h1 {
    padding: 20px 0;
    font-weight: 500;
    font-size: 1.5em;
  }
  .section {
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    margin-bottom: 20px;
    .el-button {
      background: #2f54eb;
    }
    .subject {
      padding-top: 5px;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      align-items: center;
      p {
        padding: 5px 8px;
        margin: 0 5px 5px 5px;
        color: #ccc;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
      }
      .active {
        background: blue;
        color: #fff;
      }
    }
    .edit {
      width: 100%;
      height: 114px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      margin: 5px 0;
      dt {
        height: 100%;
        align-items: center;
        cursor: pointer;
        h3 {
          margin: 10px 0;
        }
        p {
          margin-bottom: 10px;
          display: flex;
          span {
            border: 1px solid #91d5ff;
            font-size: 12px;
            color: #1890ff;
            background: #e6f7ff;
            padding: 3px 5px;
            margin-right: 8px;
          }
          .geekblue {
            border: 1px solid #adc6ff;
            color: #2f54eb;
            background: #f0f5ff;
          }
          .orange {
            border: 1px solid #ffd591;
            color: #fa8c16;
            background: #fff7e6;
          }
        }
      }
      dd {
        cursor: pointer;
        height: 114px;
        line-height: 114px;
        color: blue;
      }
    }
    > .edit:hover {
      background: #f7f8ff;
    }
  }
}
</style>