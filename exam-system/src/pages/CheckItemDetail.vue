<template>
    <div class="Detail">
        <h1>查看试题</h1>
        <div class="section">
            <div class="section-left">
                <p class="user">出题人：{{detailList.user_name}}</p>
                <h3>题目信息</h3>
                <p class="itemPro">
                    <span>{{detailList.questions_type_text}}</span>
                    <span class="geekblue">{{detailList.subject_text}}</span>
                    <span class="orange">{{detailList.exam_name}}</span>
                </p>
                <p class="title">{{detailList.title}}</p>
                <div class="content">
                    <mavon-editor
                        id="markdown-ipt"
                        v-model="detailList.questions_stem"
                        :toolbars="toolbars"
                        defaultOpen="edit"
                        :autofocus="false"
                        :boxShadow="false"
                    />
                </div>
            </div>
            <div class="section-right">
                <h3>答案信息</h3>
                <mavon-editor
                    id="markdown-ipt"
                    v-model="detailList.questions_answer"
                    :toolbars="toolbars"
                    defaultOpen="edit"
                    :autofocus="false"
                    :boxShadow="false"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      detailList: state => state.examManger.detailList
    })
  },
  data() {
    return {
      questions_type_id: "",
      subject_id: "",
      exam_id: "",
      questions_id: "",
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
  created() {
    let {
      questions_type_id,
      subject_id,
      exam_id,
      questions_id
    } = this.$route.query;
    this.questions_type_id = questions_type_id;
    this.subject_id = subject_id;
    this.exam_id = exam_id;
    this.questions_id = questions_id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$store.dispatch("examManger/getDetailItem", {
        questions_type_id: this.questions_type_id,
        subject_id: this.subject_id,
        exam_id: this.exam_id,
        questions_id: this.questions_id
      });
    }
  }
};
</script>
<style scoped  lang="scss">
.Detail {
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
    flex-shrink: 0;
    margin-bottom: 20px;
    .section-left {
      padding: 24px;
      width: 57.5%;
      height: 500px;
      overflow-y: auto;
      background: rgb(255, 255, 255);
      margin-right: 5%;
      border-radius: 10px;
      .user {
        margin-bottom: 20px;
      }
      h3 {
        margin-bottom: 20px;
        font-weight: normal;
      }
      .itemPro {
        margin-bottom: 20px;
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
      .title {
        margin-bottom: 20px;
      }
    }
    .section-right {
      padding: 24px;
      width: 37.5%;
      height: 100%;
      background: rgb(255, 255, 255);
      border-radius: 10px;
      height: 500px;
      overflow-y: auto;
      h3 {
        margin-bottom: 20px;
        font-weight: normal;
      }
    }
  }
}
</style>