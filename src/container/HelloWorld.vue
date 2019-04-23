<template>
  <div :class="bg">
    <Menu mode="horizontal" class="menu" :theme="menuTheme" active-name="1" @on-select="handleSelect">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            登录
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            注册
        </MenuItem>
    </Menu>
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
		} else {
			this.bg = 'register'
			this.$router.push('/register')
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
}
.register {
	background: url(../image/Register_image/register.jpg);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
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
</style>
