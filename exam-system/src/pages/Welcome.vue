<template>
    <div class="welcome">
        <div class="textarea">
            <h4>Welcome!</h4>
            <p>北京八维研修学院考试后台管理系统</p>
            <img
                height="80px"
                alt=""
                src="http://172.16.10.111/exam/resources/images/logoPicture.png"
            >
            <span>@developed by Team-two</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped  lang="scss">
.welcome {
  width: 100%;
  height: 100%;
  .textarea {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #232a41;
    position: relative;
    h4 {
      font-size: 100px;
      line-height: 160px;
      margin-top: 60px;
    }
    p {
      font-size: 46px;
    }
    img {
      margin-top: 50px;
      transform: scale(1.5);
    }
    span {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 22px;
      color: #ccc;
    }
  }
}
</style>