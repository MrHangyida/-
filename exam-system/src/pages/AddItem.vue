<template>
  <div class="additem">
    <TitleTop titletext="添加试题"></TitleTop>
    <div class="main">
      <div class="content">
        <div class="item-info">
          <span>题目信息</span>
        </div>
        <div class="item-title">
          <span>题干</span>
          <div class="item-title-ipt">
            <el-input v-model="itemTitleInput" maxlength="20" placeholder="请输入题目标题，不超过20字"></el-input>
          </div>
        </div>
        <div class="item-theme">
          <span>题目主题</span>
          <div class="item-theme-ipt">
            <mavon-editor
              id="markdown-ipt"
              v-model="itemThemeInput"
              :toolbars="toolbars"
              defaultOpen="edit"
              :autofocus="false"
              :boxShadow="false"
            />
          </div>
        </div>
        <div class="test-type">
          <span>请选择考试类型:</span>
          <div class="test-type-ipt">
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
        <div class="course-type">
          <span>请选择课程类型:</span>
          <div class="course-type-ipt">
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
        <div class="course-type">
          <span>请选择题目类型:</span>
          <div class="course-type-ipt">
            <el-select v-model="itemTypeValue" placeholder="请选择">
              <el-option
                v-for="item in itemTypeList"
                :key="item.questions_id"
                :label="item.questions_type_text"
                :value="item.questions_type_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="item-theme">
          <span>答案信息</span>
          <div class="item-theme-ipt">
            <mavon-editor
              id="markdown-ipt"
              v-model="answerInfoInput"
              :toolbars="toolbars"
              defaultOpen="edit"
              :autofocus="false"
              :boxShadow="false"
            />
          </div>
        </div>
        <el-button type="primary" class="submitbtn" @click="addItemSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      itemTitleInput: "",
      itemThemeInput: "",
      testTypeValue: "",
      itemTypeValue: "",
      courseTypeValue: "",
      answerInfoInput: "",
      context: " ", //输入的数据
      toolbars: {
        undo: true, // 上一步
        redo: true, // 下一步
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        quote: true, // 引用
        link: true, // 链接
        imagelink: true, // 图片链接
        fullscreen: true, // 全屏编辑
        save: true, // 保存（触发events中的save事件）
        subfield: true // 单双栏模式
      }
    };
  },
  computed: {
    ...mapState({
      testTypeList: state => state.examManger.testTypeList,
      courseTypeList: state => state.examManger.courseTypeList,
      itemTypeList: state => state.examManger.itemTypeList,
      detailList: state => state.examManger.detailList
    })
  },
  created() {
    this.getTestList();
    this.getCourseList();
    this.getItemList();
    this.getDetail();
  },
  components: {
    TitleTop
  },
  methods: {
    getTestList() {
      this.$store.dispatch("examManger/getTestList");
    },
    getCourseList() {
      this.$store.dispatch("examManger/getCourseList");
    },
    getItemList() {
      this.$store.dispatch("examManger/getItemList");
    },
    addItemSubmit() {
      this.$store.dispatch("examManger/addItemSubmit", {
        itemTitleInput: this.itemTitleInput,
        itemThemeInput: this.itemThemeInput,
        testTypeValue: this.testTypeValue,
        itemTypeValue: this.itemTypeValue,
        courseTypeValue: this.courseTypeValue,
        answerInfoInput: this.answerInfoInput
      });
      this.itemTitleInput = "";
      this.itemThemeInput = "";
      this.testTypeValue = "";
      this.itemTypeValue = "";
      this.courseTypeValue = "";
      this.answerInfoInput = "";
    },
    getDetail() {
      this.$http
        .get(
          `/exam/questions/condition?questions_type_id=${
            this.$route.query.questions_type_id
          }&subject_id=${this.$route.query.subject_id}&exam_id=${
            this.$route.query.exam_id
          }&questions_id=${this.$route.query.questions_id}`
        )
        .then(res => {
          if (res.data.data.length) {
            this.itemTitleInput = res.data.data[0].title;
            this.itemThemeInput = res.data.data[0].questions_stem;
            this.answerInfoInput = res.data.data[0].questions_answer;
            this.testTypeValue = res.data.data[0].exam_name;
            this.courseTypeValue = res.data.data[0].subject_text;
            this.itemTypeValue = res.data.data[0].questions_type_text;
          } else {
            return;
          }
        });
    }
  }
};
</script>
<style scoped  lang="scss">
.additem {
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
      .item-title,
      .item-info {
        line-height: 30px;
      }
      .item-title-ipt {
        width: 500px;
        height: 40px;
      }
      .item-theme {
        margin-top: 25px;
        span {
          line-height: 30px;
        }
        .item-theme-ipt {
          width: 50%;
          height: 227px;
          overflow: hidden;
          border-bottom: 1px solid #ccc;
          mavon-editor {
            width: 100%;
          }
        }
      }
      .test-type {
        margin-top: 35px;
        span {
          line-height: 30px;
        }
        .test-type-ipt {
          width: 200px;
          height: 32px;
        }
      }
      .course-type {
        margin-top: 35px;
        span {
          line-height: 30px;
        }
        .course-type-ipt {
          width: 200px;
          height: 32px;
        }
      }
      .submitbtn {
        margin-top: 35px;
        margin-bottom: 5px;
        width: 112px;
        height: 40px;
        background-color: #0139fd;
      }
    }
  }
}
</style>
