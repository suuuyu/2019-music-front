<template>
  <div class="login-form">
    <h1>欢迎登录</h1>
	<img src="../image/Login_image/shiny_music.png" height="120" width="120" />
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
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
export default{
	name: 'login',
	data() {
		return {
			formInline: {
				user: '',
				password: ''
			},
			ruleInline: {
				user: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码.', trigger: 'blur' },
					{ type: 'string', min: 6, message: '密码不正确', trigger: 'blur' }
				]
			},
			inline: true
		}
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!')
				} else {
					this.$Message.error('Fail!')
				}
			})
		}
	}
}
</script>

<style scoped>
.login-form {
	padding-top: 1.5em;
	background:rgba(0,30,41,0.70);
	position: relative;
	width: 600px;
	height: auto;
	padding:2em;
	margin: 100px auto 0 auto;
	text-align: center;
	border-radius: 15px;/*圆角边框*/;
	padding-bottom: 50px;
	padding-top: 50px;
}
.input-form{
	margin-top: 10%;
	margin-left: auto;
	margin-right: auto;
	width: 60%;
}
.input-label {
	margin-bottom: 10px;
}


</style>

