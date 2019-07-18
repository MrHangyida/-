<template>
    <div class="classify">
        <TitleTop titletext="教室管理"></TitleTop>
        <el-main>
            <p class="button">
                <el-button
                    @click="centerDialogVisible = true"
                    style="background: #466fff;color:#fff;"
                >+ 添加教室</el-button>
                <el-dialog title="班级" :visible.sync="centerDialogVisible" width="30%" center>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="教室名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button style="background: #466fff;color:#fff;" @click="roomSures">确 定</el-button>
                    </span>
                </el-dialog>
            </p>
            <Pagintion :ToPageData="mangerRoom">
                <el-table-column prop="room_text" label="教室号" width="400"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="RoomDelete(scope.row)">删除</el-button>
                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                            <span>您确定要删除吗</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handelRoomDelete()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </template>
                </el-table-column>
            </Pagintion>
        </el-main>
    </div>
</template>

<script>
import Pagintion from "@/components/Pagintion";
import { mapState } from "vuex";
import TitleTop from "@/components/TitleTop";
export default {
  components: {
    TitleTop,
    Pagintion
  },
  data() {
    return {
      centerDialogVisible: false,
      form: {
        name: ""
      },
      dialogVisible: false,
      roomId: ""
    };
  },
  computed: {
    ...mapState({
      mangerRoom: state => state.examManger.mangerRoom,
      roomSure: state => state.examManger.roomSure
    })
  },
  methods: {
    MangerRooms() {
      this.$store.dispatch("examManger/MangerRooms");
    },
    roomSures() {
      this.centerDialogVisible = false;
      this.$store.dispatch("examManger/roomSures", {
        roomManger: this.form.name
      });
      this.MangerRooms();
    },
    RoomDelete(row) {
      console.log(row);
      this.dialogVisible = true;
      this.roomId = row.room_id;
    },
    handelRoomDelete() {
      this.dialogVisible = false;
      this.$store.dispatch("examManger/handelRoomDelete", {
        roomId: this.roomId
      });
      this.MangerRooms();
    }
  },
  created() {
    this.MangerRooms();
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