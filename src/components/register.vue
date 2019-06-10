<template>
  <div class="login-form">
    <h1><b>欢迎注册</b></h1>
	<img src="../image/Login_image/shiny_music.png" height="90" width="90" />
    <Form class="input-form" ref="formInline" :model="formInline" :rules="ruleInline" v-inline="inline">
        <FormItem prop="user">
            <Input type="text" class="input-label" v-model="formInline.user" placeholder="Username" size="large">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" class="input-label" v-model="formInline.password" placeholder="Password" size="large">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
				<FormItem prop="pwd_again">
            <Input type="password" class="input-label" v-model="formInline.pwd_again" placeholder="Password" size="large">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
		<div>
        <FormItem>
            <Button class="lg-reg-btn" type="primary" long @click="handleSubmit('formInline')">注册</Button>
        </FormItem>
		<FormItem>
            <Button class="lg-reg-btn" type="primary" long ghost @click="toLogin()" >返回</Button>
        </FormItem>
		</div>
    </Form>
</div>
</template>

<script>
export default{
	name: 'register',
	data() {
		const checkPwdAgain = (ruleInline, value, callback) => {
        if (value && value !== this.formInline.pwd) {
          callback(new Error('两次输入密码不匹配'))
        } else {
          callback()
        }
      }
		return {
			formInline: {
				user: '',
				password: '',
				pwd_again: ''
			},
			ruleInline: {
				user: [
					{ required: true, message: '输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '输入密码.', trigger: 'blur' },
					{ type: 'string', min: 6, message: '密码长度不能少于六位', trigger: 'blur' }
				],
				pwd_again: [
					{ required: true, message: '再次输入密码.', trigger: 'blur' },
					{ type: 'string', min: 6, message: '密码长度不能少于六位', trigger: 'blur' },
					{ validator: checkPwdAgain, trigger: 'blur'}
				]
			},
			inline: true
		}
	},
	methods: {
		toLogin(){
			this.$parent.handleSelect('1')
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		}
	}
}
</script>

<style scoped>
.login-form {
	background:rgba(0,30,41,0.70);
	position: relative;
	width: 600px;
	height: auto;
	padding:2.5em 1.5em 2em 2em;
	margin: 0 auto 0 auto;
	text-align: center;
	border-radius: 15px;/*圆角边框*/;
}
.input-form{
	margin-top: 2%;
	margin-left: auto;
	margin-right: auto;
	width: 60%;
}
.input-label {
	margin-bottom: 8px;
}
h1{
	color:whitesmoke;
	font-size: 30px
}
.lg-reg-btn{
	font-weight: 900
}
</style>

