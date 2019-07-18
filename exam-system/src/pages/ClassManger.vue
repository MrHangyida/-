<template>
    <div class="classify">
        <TitleTop titletext="班级管理"></TitleTop>
        <el-main>
            <p class="button">
                <el-button
                    @click="centerDialogVisible = true"
                    style="background: #466fff;color:#fff;"
                >+ 添加班级</el-button>
                <el-dialog title="班级" :visible.sync="centerDialogVisible" width="30%" center>
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="formLabelAlign"
                    >
                        <el-form-item label="班级名称">
                            <el-input v-model="formLabelAlign.classList"></el-input>
                        </el-form-item>
                        <el-form-item label="教室号">
                            <el-select
                                v-model="formLabelAlign.classRoom"
                                style="width:100%"
                                placeholder="选择教室号"
                            >
                                <el-option
                                    v-for="(item,i) in MangerGrade"
                                    :key="i"
                                    :label="item.room_text"
                                    :value="item.room_id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="课程名称">
                            <el-select
                                v-model="formLabelAlign.courseTitle"
                                style="width:100%"
                                placeholder="选择课程"
                            >
                                <el-option
                                    v-for="(item,i) in MangerGrade"
                                    :key="i"
                                    :label="item.subject_text"
                                    :value="item.subject_id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button style="background: #466fff;color:#fff;" @click="getaddClass">确 定</el-button>
                    </span>
                </el-dialog>
            </p>
            <Pagintion :ToPageData="MangerGrade"> 
           
                <el-table-column prop="grade_name" label="班级名" width="200"></el-table-column>
                <el-table-column prop="subject_text" label="课程名" width="400"></el-table-column>
                <el-table-column prop="room_text" label="教室号" width="400"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handelrevise(scope.row)">修改</el-button>
                        <el-dialog title="班级" :visible.sync="centerDialog" width="30%" center>
                            <el-form
                                :label-position="labelPosition"
                                label-width="80px"
                                :model="reviseRow"
                            >
                                <el-form-item label="班级名称">
                                    <el-input v-model="reviseRow.grade_name" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="教室号">
                                    <el-select
                                        v-model="numclass"
                                        style="width:100%"
                                        placeholder="选择教室号"
                                    >
                                        <el-option
                                            v-for="(item,i) in MangerGrade"
                                            :key="i"
                                            :label="item.room_text"
                                            :value="item.room_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="课程名称">
                                    <el-select
                                        v-model="subjectclass"
                                        style="width:100%"
                                        placeholder="选择课程"
                                    >
                                        <el-option
                                            v-for="(item,i) in MangerGrade"
                                            :key="i"
                                            :label="item.subject_text"
                                            :value="item.subject_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="centerDialog = false">取 消</el-button>
                                <el-button
                                    style="background: #466fff;color:#fff;"
                                    @click="reviseRowSure"
                                >确 定</el-button>
                            </span>
                        </el-dialog>
                        <el-button type="text" size="small" @click="dialogDelete(scope.row)">删除</el-button>
                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                            <span>您确定要删除吗</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handelDelete()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </template>
                </el-table-column>
            </Pagintion>
        </el-main>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TitleTop from "@/components/TitleTop";
import Pagintion from "../components/Pagintion";

export default {
  components: {
    TitleTop,
    Pagintion
  },
  data() {
    return {
      dialogVisible: false,
      centerDialog: false,
      centerDialogVisible: false,
      labelPosition: "top",
      formLabelAlign: {
        classList: "",
        classRoom: "",
        courseTitle: ""
      },
      numclass: "",
      subjectclass: "",
      reviseRow: {},
      dialogDeleteGradeId: ""
    };
  },
  computed: {
    ...mapState({
      MangerGrade: state => state.examManger.MangerGrade,
      addclass: state => state.examManger.addclass
    })
  },
  methods: {
    getMangerGrade() {
      this.$store.dispatch("examManger/getMangerGrade");
    },
    getaddClass() {
      this.centerDialogVisible = false;
      if (
        (this.formLabelAlign.classList,
        this.formLabelAlign.classRoom,
        this.formLabelAlign.courseTitle)
      ) {
        this.$store.dispatch("examManger/getaddClass", {
          classList: this.formLabelAlign.classList,
          room_id: this.formLabelAlign.classRoom,
          subject_id: this.formLabelAlign.courseTitle
        });
      } else {
        alert("请输入有效信息");
      }
    },
    handelrevise(row) {
      this.centerDialog = true;
      this.reviseRow = row;
    },
    reviseRowSure() {
      if (
        (this.reviseRow.grade_name,
        this.reviseRow.room_text,
        this.reviseRow.subject_text)
      ) {
        this.$store.dispatch("examManger/reviseRowSure", {
          grade_id: this.reviseRow.grade_id,
          room_id: this.numclass,
          subject_id: this.subjectclass
        });
      }
      this.centerDialog = false;
    },
    reviseRowSure() {
      if (
        (this.reviseRow.grade_name,
        this.reviseRow.room_text,
        this.reviseRow.subject_text)
      ) {
        this.$store.dispatch("examManger/reviseRowSure", {
          grade_id: this.reviseRow.grade_id,
          room_id: this.numclass,
          subject_id: this.subjectclass
        });
      }
      this.centerDialog = false;
    },

    handelDelete() {
      this.dialogVisible = false;
      this.$store.dispatch("examManger/handelDelete", {
        gradeid: this.dialogDeleteGradeId
      });
    },
    dialogDelete(row) {
      this.dialogDeleteGradeId = row.grade_id;
      this.dialogVisible = true;
    }
  },
  created() {
    this.getMangerGrade();
  }
};
</script>
<style scoped>
.classify {
  width: 100%;
}
.el-main {
  width: 98%;
  background-color: #fff;
  color: #333;
  margin-left: 1%;
  border-radius: 10px;
}
.button {
  margin: 0 0 10px 0;
}
</style>