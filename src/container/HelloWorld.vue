<template>
  <div :class="bg">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
	name: 'HelloWorld',
  mounted () {
    this.$router.push('/login')
  },
	data() {
		return {
			menuTheme: 'dark',
      bg: 'login'
		}
  },
  methods: {
	  handleSelect(name) {
		if (name === '1') {
			this.bg = 'login'
			this.$router.push('/login')
		} else if (name === '2') {
			this.bg = 'register'
			this.$router.push('/register')
		} else {
      this.bg = 'alogin'
      this.$router.push('/alogin')
    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu > .ivu-menu.ivu-menu-light {
	background:rgba(0,30,41,0.70);
}
.login {
	background: url(../image/Login_image/bg.png);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
  padding-top: 3%
}
.register {
	background: url(../image/Register_image/register.jpg);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
  padding-top: 2%
}
.alogin {
  background: url(../image/Login_image/bg.png);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
  padding-top: 3%
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#admin-alert
{
	float:left;
    margin:auto;
    top:10px;
    color:rgb(199, 113, 0);
    background-color: rgb(255, 234, 209);
    font-size:18px;
    font-family:"Microsoft YaHei";
    font-weight: 600
}
</style>
