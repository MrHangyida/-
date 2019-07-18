import $router from 'vue-router';
import { Message } from "element-ui";
import { axios } from '@/utils/http.js';

const examManger = {
    namespaced: true,
    state: {
        test: 0,
        UserData: [],
        userId: "",
        testTypeList: [],
        courseTypeList: [],
        itemTypeList: [],
        getAllQuestions: [],
        ExamType: [],
        QuestionsType: [],
        Subject: [],
        ToCheckClassData: [],
        detailList: [],
        IdentityData: [],
        ApiAuthority: [],
        identityApiAuthorityRelation: [],
        viewAuthority: [],
        identityViewAuthorityRelation: [],
        MangerGrade: [],
        classRoom: [],
        className: [],
        allStudent: [],
        findPersons: [],
        TestPage: [],
        UserView: [],
        ClassmateData: [],
        addclass: [],
        mangerRoom: [],
        roomSures: [],
        ReviseRowSure: [],
        TestPageList: [],
        questionsList: []
    },
    mutations: {
        setUserData(state, data) {
            state.UserData = data
        },
        setTestList(state, payload) {
            state.testTypeList = payload
        },
        setCourseList(state, payload) {
            state.courseTypeList = payload
        },
        setItemList(state, payload) {
            state.itemTypeList = payload
        },
        setUserId(state, payload) {
            state.userId = payload
        },
        setAllQuestions(state, data) {
            state.getAllQuestions = data
        },
        setExamType(state, data) {
            state.ExamType = data
        },
        setQuestionsType(state, data) {
            state.QuestionsType = data
        },
        setSubject(state, data) {
            state.Subject = data
        },
        setQueryItem(state, data) {
            state.getAllQuestions = data
        },
        setSubjectFlag(state) {
            state.Subject = state.Subject.map(item => {
                item.flag = false;
                return item
            })
        },
        setDetailItem(state, data) {
            state.detailList = data;
        },
        ToCheckClassData(state, data) {
            state.ToCheckClassData = data
        },
        setMangerGrade(state, data) {
            state.MangerGrade = data
        },
        setIdentityData(state, data) {
            state.IdentityData = data
        },
        setApiAuthority(state, data) {
            state.ApiAuthority = data
        },
        setidentityApiAuthorityRelation(state, data) {
            state.identityApiAuthorityRelation = data
        },
        setviewAuthority(state, data) {
            state.viewAuthority = data
        },
        setidentityViewAuthorityRelation(state, data) {
            state.identityViewAuthorityRelation = data
        },
        setClassRoom(state, data) {
            state.classRoom = data;
        },
        setClassName(state, data) {
            state.className = data;
        },
        setAllStudent(state, data) {
            state.allStudent = data;
            state.findPersons = data;
        },
        findPerson(state, obj) {
            let { name, roomValue, gradeName } = obj;
            if (name && gradeName && roomValue) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.student_name.includes(name) && item.grade_name === gradeName && item.room_text === roomValue);
                state.allStudent = hang;
            } else if (name && gradeName) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.student_name.includes(name) && item.grade_name === gradeName);
                state.allStudent = hang;
            } else if (name && roomValue) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.student_name.includes(name) && item.room_text === roomValue);
                state.allStudent = hang;
            } else if (gradeName && roomValue) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.grade_name === gradeName && item.room_text === roomValue);
                state.allStudent = hang;
            } else if (name && !roomValue && !gradeName) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.student_name.includes(name));
                state.allStudent = hang;
            } else if (gradeName) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.grade_name === gradeName);
                state.allStudent = hang;
            } else if (roomValue) {
                state.allStudent = state.findPersons;
                let hang = state.allStudent.filter(item => item.room_text === roomValue);
                state.allStudent = hang;
            }
        },
        setTestPage(state, obj) {
            state.TestPage = obj
        },
        setaddclass(state, data) {
            state.addclass = data
        },
        setMangerRoom(state, data) {
            state.mangerRoom = data
        },
        setroomSures(state, data) {
            state.roomSures = data
        },
        setUserView(state, payload) {
            state.UserView = payload
        },
        ClassmateData(state, data) {
            state.ClassmateData = data
        },
        setreviseRowSure(state, data) {
            state.ReviseRowSure = data
        },
        setTestPageList(state, payload) {
            state.TestPageList = payload
        },
        setTestPageDetail(state, payload) {
            state.questionsList = payload
        },
        setupdataEdit(state, payload) {

        },
    },
    actions: {
        addItemSubmit({ commit }, addItemSubmitObj) {
            let that = this;
            if (addItemSubmitObj.itemTitleInput != "" && addItemSubmitObj.itemThemeInput != "" && addItemSubmitObj.testTypeValue != "" && addItemSubmitObj.itemTypeValue != "" && addItemSubmitObj.answerInfoInput != "" && addItemSubmitObj.courseTypeValue != "") {
                axios.post("/exam/questions", {
                    questions_type_id: addItemSubmitObj.itemTypeValue,
                    questions_stem: addItemSubmitObj.itemTitleInput,
                    subject_id: addItemSubmitObj.courseTypeValue,
                    exam_id: addItemSubmitObj.testTypeValue,
                    user_id: that.state.examManger.userId,
                    questions_answer: addItemSubmitObj.answerInfoInput,
                    title: addItemSubmitObj.itemThemeInput
                }).then(res => {
                    Message.success("添加试题成功！")
                })
            } else {
                Message.error("内容不能为空！")
            }
        },
        getTestList({ commit }) {
            axios.get("/exam/examType").then(res => {
                commit('setTestList', res.data.data)
            })
        },
        getCourseList({ commit }) {
            axios.get("/exam/subject").then(res => {
                commit('setCourseList', res.data.data)
            })
        },
        getItemList({ commit }) {
            axios.get("/exam/getQuestionsType").then(res => {
                let list = res.data.data.map(item => {
                    item.deltext = '删除'
                    return item
                })
                commit('setItemList', list)
            })
        },
        //获取班级列表
        getMangerGrade({ commit }) {
            axios.get('/manger/grade').then(res => {
                commit('setMangerGrade', res.data.data)
            })
        },
        getidentityViewAuthorityRelation({ commit }) {
            axios.get('/user/identity_view_authority_relation').then(res => {
                commit('setidentityViewAuthorityRelation', res.data.data)
            })
        },
        getviewAuthority({ commit }) {
            axios.get('/user/view_authority').then(res => {
                commit('setviewAuthority', res.data.data)
            })
        },
        getidentityApiAuthorityRelation({ commit }) {
            axios.get('/user/identity_api_authority_relation').then(res => {
                commit('setidentityApiAuthorityRelation', res.data.data)
            })
        },
        getUserData({ commit }) {
            axios.get('/user/user').then(res => {
                commit('setUserData', res.data.data)
            })
        },
        getIdentityData({ commit }) {
            axios.get('/user/identity').then(res => {
                commit('setIdentityData', res.data.data)
            })
        },
        getApiAuthority({ commit }) {
            axios.get('/user/api_authority').then(res => {
                commit('setApiAuthority', res.data.data)
            })
        },
        gettoken({ commit }, obj) {
            console.log(obj)
            axios.post('/user/login', {
                user_name: obj.username,
                user_pwd: obj.password
            }).then(res => {
                console.log(res)
                if (res.data.code == 1) {
                    window.sessionStorage.setItem('username', JSON.stringify(obj.username))
                    new $router().push({
                        path: "/Home/Welcome"
                    })
                    new $router().go(0)
                    document.cookie = `token=${res.data.token}`
                } else {
                    Message.error("用户名或密码错误！")
                }
            })
        },
        getUserInfo({ commit }) {
            axios.get('/user/userInfo').then(res => {
                commit('setUserId', res.data.data.user_id)
                axios.get('/user/new', {
                    params: {
                        user_id: res.data.data.user_id
                    }
                })
            })
        },
        getAllQuestions(store) {
            axios.get('/exam/questions/new').then(res => {
                store.commit('setAllQuestions', res.data.data)
            })
        },
        getQueryItem(store, obj) {
            if (obj.subject_id && obj.exam_id && obj.questions_type_id) {
                axios.get(`/exam/questions/condition?exam_id=${obj.exam_id}&questions_type_id=${obj.questions_type_id}&subject_id=${obj.subject_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.subject_id && obj.exam_id) {
                axios.get(`/exam/questions/condition?exam_id=${obj.exam_id}&subject_id=${obj.subject_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.subject_id && obj.questions_type_id) {
                axios.get(`/exam/questions/condition?questions_type_id=${obj.questions_type_id}&subject_id=${obj.subject_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.exam_id && obj.questions_type_id) {
                axios.get(`/exam/questions/condition?exam_id=${obj.exam_id}&questions_type_id=${obj.questions_type_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.exam_id && !obj.questions_type_id) {
                axios.get(`/exam/questions/condition?exam_id=${obj.exam_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.subject_id) {
                axios.get(`/exam/questions/condition?subject_id=${obj.subject_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            } else if (obj.questions_type_id) {
                axios.get(`/exam/questions/condition?questions_type_id=${obj.questions_type_id}`).then(res => {
                    store.commit('setQueryItem', res.data.data)
                })
            }
        },
        getDetailItem(store, obj) {
            let { questions_type_id, subject_id, exam_id, questions_id } = obj;
            axios.get(`/exam/questions/condition?questions_type_id=${questions_type_id}&subject_id=${subject_id}&exam_id=${exam_id}&questions_id=${questions_id}`).then(res => {
                if (res.data.data.length) {
                    store.commit('setDetailItem', res.data.data[0])
                } else {
                    return;
                }
            })
        },
        getExamType(store) {
            axios.get('/exam/examType').then(res => {
                store.commit('setExamType', res.data.data)
            })
        },
        getQuestionsType(store) {
            axios.get('/exam/getQuestionsType').then(res => {
                store.commit('setQuestionsType', res.data.data)
            })
        },
        getSubject(store) {
            axios.get('/exam/subject').then(res => {
                let hang = res.data.data.map(item => {
                    item.flag = false;
                    return item
                })
                store.commit('setSubject', hang)
            })
        },
        addItemType({ commit }, payload) {
            axios.get('/exam/insertQuestionsType', {
                params: {
                    text: payload.text,
                    sort: payload.sort
                }
            }).then(res => {
                commit('setUserView', res.data.data)
                axios.get("/exam/getQuestionsType").then(res => {
                    let list = res.data.data.map(item => {
                        item.deltext = '删除'
                        return item
                    })
                    commit('setItemList', list)
                })
            })
        },
        DelItemType(store, delId) {
            axios.post('/exam/delQuestionsType', {
                id: delId
            })
        },
        ToCheckClassData({ commit }, data) {
            axios.get('/manger/grade').then(res => {
                commit('ToCheckClassData', res.data.data)
            })
        },
        //添加班级
        getaddClass({ commit }, data) {
            axios.post("/manger/grade", {
                grade_name: data.classList,
                room_id: data.room_id,
                subject_id: data.subject_id
            }).then(res => {
                commit('setaddclass', res.data)
                if (res.code) {
                    Message.success(res.msg)
                }
                axios.get('/manger/grade').then(res => {
                    commit('setMangerGrade', res.data.data)
                })
            })
        },
        //删除班级
        handelDelete({ commit }, data) {
            axios.delete('/manger/grade/delete', {
                data: {
                    'grade_id': data.gradeid,
                }
            }).then(res => {
                if (res.code) {
                    Message.success(res.msg)
                }
                axios.get('/manger/grade').then(res => {
                    commit('setMangerGrade', res.data.data)
                })
            })
            if (res.code) {
                Message.success(res.msg)
            }
            axios.get('/manger/grade').then(res => {
                commit('setMangerGrade', res.data.data)
            })
        },
        //修改班级
        reviseRowSure({ commit }, data) {
            axios.put('/manger/grade/update', {
                'grade_id': data.grade_id,
                'grade_name': data.grade_name,
                'subject_id': data.subject_id,
                'room_id': data.room_id
            }).then(res => {
                commit('setreviseRowSure', res.data.data)
                if (res.code) {
                    Message.success(res.msg)
                }
                axios.get('/manger/grade').then(res => {
                    commit('setMangerGrade', res.data.data)
                })
            })
        },
        MangerRooms({ commit }, data) {
            axios.get('/manger/room').then(res => {
                commit('setMangerRoom', res.data.data)
            })
        },
        roomSures({ commit }, data) {
            axios.post('/manger/room', {
                room_text: data.roomManger
            }).then(res => {
                if (res.code === 1) {
                    commit('setroomSures', res.data)
                    Message.success(res.msg)
                }
                axios.get('/manger/room').then(res => {
                    commit('setMangerRoom', res.data.data)
                })
            })
        },
        handelRoomDelete({ commit }, data) {
            axios.delete('/manger/room/delete', {
                data: {
                    'room_id': data.roomId,
                }
            }).then(res => {
                if (res.code) {
                    Message.success(res.msg)
                }
                axios.get('/manger/room').then(res => {
                    commit('setMangerRoom', res.data.data)
                })
                Message.success(res.msg)
            })
        },
        ClassmateData({ commit }, data) {
            let { grade_id, grade_name } = data
            axios.get('/exam/student', {
                params: {
                    grade_id,
                }
            }).then(res => {
                if (res.data.code == 1) {
                    var exam = res.data.exam.map(item => {
                        item.grade_name = grade_name
                        item.end_time = new Date(item.end_time * 1).toLocaleTimeString()
                        item.start_time = new Date(item.start_time * 1).toLocaleTimeString()
                        item.status = item.status == 0 ? '未阅' : "已阅"
                        return item
                    })
                    commit('ClassmateData', exam)
                }
            })
        },
        userDatas(state, data) {
            axios.post('/user', {
                user_name: data.user_name,
                user_pwd: data.user_pwd,
                identity_id: data.identity_id
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getUserDatas({ commit }, data) {
            axios.put('/user/user', {
                user_id: data.user_id,
                user_name: data.user_name,
                user_pwd: data.user_pwd,
                identity_id: data.identity_id,
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getuseridentityedit(store, data) {
            axios.get('/user/identity/edit', {
                params: {
                    identity_text: data.identity_text
                }
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getuserauthorityApiedit(store, data) {
            axios.get('/user/authorityApi/edit', {
                params: {
                    api_authority_text: data.api_authority_text,
                    api_authority_url: data.api_authority_url,
                    api_authority_method: data.api_authority_mehtod
                }
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getuserauthorityViewedit(store, data) {
            axios.get('/user/authorityView/edit', {
                params: {
                    view_authority_text: data.view_authority_text,
                    view_id: data.view_id
                }
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getusersetIdentityApi(store, data) {
            axios.post('/user/setIdentityApi', {
                identity_id: data.identity_id,
                api_authority_id: data.api_authority_id
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        getusersetIdentityView(store, data) {
            axios.post('/user/setIdentityView', {
                identity_id: data.identity_id,
                view_authority_id: data.view_authority_id
            }).then(res => {
                if (res.data.code == 1) {
                    Message.success(res.data.msg)
                } else {
                    Message.error(res.data.msg)
                }
            })
        },
        createTestPage(store, obj) {
            let { title, subject_id, exam_id, number, start_time, end_time } = obj;
            axios.post('/exam/exam', {
                subject_id: subject_id,
                exam_id: exam_id,
                title: title,
                number: number * 1,
                start_time: Date.parse(start_time),
                end_time: Date.parse(end_time)
            }).then(res => {
                if (res.data.code === 1) {
                    store.commit('setTestPage', res.data.data)
                }
            })
        },
        getClassRoom(store) {
            axios.get('/manger/room').then(res => {
                store.commit('setClassRoom', res.data.data)
            })
        },
        getClassName(store) {
            axios.get('/manger/grade').then(res => {
                store.commit('setClassName', res.data.data)
            })
        },
        getAllStudent(store) {
            axios.get('/manger/student').then(res => {
                store.commit('setAllStudent', res.data.data)
            })
        },
        delClassRoom(store, obj) {
            let { student_id } = obj;
            axios.delete(`/manger/student/${student_id}`)
        },
        getTestPageList({ commit }) {
            axios.get("/exam/exam").then(res => {
                let datatimelist = res.data.exam.map(res => {
                    res.end_time_local = new Date(+res.end_time).toLocaleString();
                    res.start_time_local = new Date(+res.start_time).toLocaleString();
                    res.detail_text = "详情";
                    return res
                })
                commit('setTestPageList', datatimelist)
            })
        },
        getTestPageDetail({ commit }, obj) {
            axios.get("exam/exam/" + obj).then(res => {
                commit("setTestPageDetail", res.data.data.questions)
            })
        },
        getNumRoom({ commit }, data) {
            axios.get('/manger/room').then(res => {
                commit('setNumRoom', res.data.data)
            })
        },
        getExamSubject({ commit }, data) {
            axios.get('/exam/subject').then(res => {
                commit('setExamSubject', res.data.data)
            })
        },
        getupdataEdit(store, obj) {
            console.log(obj)
            let { questions_id, title, questions_stem, questions_answer, subject_id, questions_type_id, exam_id } = obj
            axios.put('/exam/questions/update', {
                questions_id: questions_id,
                title: title,
                questions_stem: questions_stem,
                questions_answer: questions_answer,
                subject_id: subject_id,
                questions_type_id: questions_type_id,
                exam_id: exam_id
            }).then(res => {
                console.log(res)
            })
        }
    },
    getters: {

    }
}
export default examManger