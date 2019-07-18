<template>
  <div class="createTest">
    <h1>创建考试</h1>
    <div class="section">
      <p v-if="flag">添加新题</p>
      <div class="content">
        <h3 v-show="flag">{{TestPage.title}}</h3>
        <p v-show="flag" class="testTime">考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
        <div class="testcontent">
          <mavon-editor
            v-for="item in TestPage.questions"
            :key="item.questions_id"
            id="markdown-ipt"
            v-model="item.questions_stem"
            :toolbars="toolbars"
            defaultOpen="edit"
            :autofocus="false"
            :boxShadow="false"
          />
        </div>
        <div class="create-page" v-if="flag">
          <el-button type="primary" class="submit-btn" @click="createTestPage">创建试卷</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      flag: false,
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
      TestPage: state => state.examManger.TestPage
    })
  },
  created() {
    let {
      title,
      subject_id,
      exam_id,
      number,
      start_time,
      end_time
    } = this.$route.params;
    if (title && subject_id && exam_id && number && start_time && end_time) {
      this.flag = true;
      this.$store.dispatch("examManger/createTestPage", {
        title: title,
        subject_id: subject_id,
        exam_id: exam_id,
        number: number,
        start_time: start_time,
        end_time: end_time
      });
    } else {
      this.$message.warning("无权限");
    }
  },
  methods: {
    createTestPage() {
      this.$router.push("/Home/TestList");
    }
  },
};
</script>
<style scoped  lang="scss">
.createTest {
  width: 100%;
  display: flex;
  flex-direction: column;
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
    height: 1060px;
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    margin-bottom: 20px;
    .content {
      width: 90%;
      padding: 40px 30px;
      h3 {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .testTime {
        text-align: center;
        margin-bottom: 10px;
      }
      .testcontent {
        .v-note-wrapper {
          margin-top: 20px;
        }
      }
      .create-page {
        text-align: center;
        height: 40px;
        margin-top: 20px;
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