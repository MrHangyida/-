<template>
  <div class="testlist-detail">
    <TitleTop titletext="试卷详情"></TitleTop>
    <div class="main">
      <div class="content">
        <div class="question" v-for="(item,index) in questionsList" :key="index">
          <span>{{(index+1)+'.'+item.title}}</span>
          <mavon-editor
            class="md"
            :value="item.questions_answer"
            :subfield="datas.subfield"
            :defaultOpen="datas.defaultOpen"
            :toolbarsFlag="datas.toolbarsFlag"
            :editable="datas.editable"
            :scrollStyle="datas.scrollStyle"
          ></mavon-editor>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitleTop from "../components/TitleTop";
import { mapState } from "vuex";

export default {
  props: {},
  components: {
    TitleTop
  },
  data() {
    return {
      context: "",
      datas: {
        subfield: false,
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
    };
  },
  computed: {
    ...mapState({
      TestPageList: state => state.examManger.TestPageList,
      questionsList: state => state.examManger.questionsList
    })
  },
  methods: {
    getTestPageList() {
      this.$store.dispatch("examManger/getTestPageList");
    },
    getTestPageDetail() {
      console.log();
      this.$store.dispatch(
        "examManger/getTestPageDetail",
        this.$route.query.exam_exam_id
      );
    }
  },
  created() {
    this.getTestPageList();
    this.getTestPageDetail();
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.testlist-detail {
  width: 100%;
  .main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    background-color: #f2f0f5;
    .content {
      width: 60%;
      height: 100%;
      border-radius: 10px;
      background: #fff;
      padding: 20px;
      .question {
        width: 100%;
        padding: 20px;
        span {
          line-height: 60px;
        }
      }
    }
  }
}
</style>