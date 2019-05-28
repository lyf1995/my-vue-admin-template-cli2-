<template>
  <div class="login-container">
    <el-form :model="loginForm" ref="loginForm" class="login-form">
      <div class="title">后台管理系统</div>
      <el-form-item
        prop="username"
        :rules="[{ require: true, message: '请输入用户名',trigger: 'blur'  }]"
      >
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="[{ require: true, message: '请输入密码',trigger: 'blur'  }]">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          :type="passwordShow ? 'text' : 'password'"
        ></el-input>
        <span class="svg-container eye-svg" @click="passwordShow = !passwordShow">
          <svg-icon :icon-class="passwordShow ? 'eye-open' : 'eye'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%;" @click="login">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      redirect: undefined,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      passwordShow: false
    };
  },
  methods: {
    login() {
      // this.$router.push({
      //   path: '/dashboard'
      // })
      this.loading = true;
      let params = { ...this.loginForm };
      this.$store
        .dispatch('login', params)
        .then(res => {
          this.loading = false;
          this.$router.push({ path: this.redirect || '/dashboard' });
        })
        .catch(error => {
          this.loading = false;
        });
    }
  },
  created() {
    this.redirect = this.$route.query && this.$route.query.redirect;
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  background: {
    image: url('../../assets/images/login-bg.jpeg');
    size: cover;
    attachment: fixed;
  }
  .login-form {
    position: absolute;
    width: 500px;
    max-width: 100%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
    padding: 35px 35px 15px 35px;
    .title {
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .svg-container {
      height: 45px;
      padding-left: 10px;
      color: #ccc;
    }
    .eye-svg {
      position: absolute;
      right: 10px;
      top: 7px;
      cursor: pointer;
      box-sizing: border-box;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
