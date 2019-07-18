<template>
  <div class="StudentManger">
    <h1>学生管理</h1>
    <div class="btn">
      <el-input style="width:200px" placeholder="输入学生姓名" v-model="name"></el-input>
      <el-select v-model="roomValue" filterable placeholder="请选择教室号">
        <el-option
          v-for="item in classRoom"
          :key="item.room_id"
          :label="item.room_text"
          :value="item.room_text"
        ></el-option>
      </el-select>
      <el-select v-model="gradeName" filterable placeholder="班级名">
        <el-option
          v-for="item in className"
          :key="item.grade_id"
          :label="item.grade_name"
          :value="item.grade_name"
        ></el-option>
      </el-select>
      <el-button size="medium" class="addClass" @click="serch(name)">搜索</el-button>
      <el-button size="medium" class="addClass" @click="refresh">重置</el-button>
    </div>
    <section>
      <Pagintion :ToPageData="allStudent">
        <el-table-column prop="student_name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="student_id" label="学号" width="250"></el-table-column>
        <el-table-column prop="grade_name" label="班级" width="180"></el-table-column>
        <el-table-column prop="room_text" label="教室" width="180"></el-table-column>
        <el-table-column prop="student_pwd" label="密码" width="270"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="deleted(scope)">删除</a>
          </template>
        </el-table-column>
      </Pagintion>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Pagintion from "../components/Pagintion.vue";
export default {
  components: {
    Pagintion
  },
  computed: {
    ...mapState({
      classRoom: state => state.examManger.classRoom,
      className: state => state.examManger.className,
      allStudent: state => state.examManger.allStudent
    })
  },
  data() {
    return {
      roomValue: "",
      gradeName: "",
      name: ""
    };
  },
  created() {
    this.$store.dispatch("examManger/getClassRoom");
    this.$store.dispatch("examManger/getClassName");
    this.$store.dispatch("examManger/getAllStudent");
  },
  methods: {
    deleted(scope) {
      this.$store.dispatch("examManger/delClassRoom", {
        student_id: scope.row.student_id
      });
      this.$store.dispatch("examManger/getAllStudent");
    },
    serch() {
      this.$store.commit("examManger/findPerson", {
        name: this.name,
        roomValue: this.roomValue,
        gradeName: this.gradeName
      });
    },
    refresh() {
      this.$store.dispatch("examManger/getAllStudent");
      (this.name = ""), (this.roomValue = ""), (this.gradeName = "");
    }
  }
};
</script>
<style lang="scss" scoped>
.StudentManger {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  a {
    color: blue;
  }
  h1 {
    padding: 20px 0;
    margin: 5px 0;
    font-weight: 500;
    font-size: 1.5em;
  }
  .btn {
    width: 100%;
    flex-shrink: 0;
    border-radius: 15px;
    margin-bottom: 3px;
    .el-input {
      margin: 0 10px 0 0;
    }
    .el-select {
      margin: 0 10px 0 0;
    }
    .addClass {
      background: blue;
      color: white;
      padding: 12px 30px !important;
    }
  }
  section {
    width: 100%;
    background: white;
    .dialog {
      height: auto;
    }
  }
}
</style>