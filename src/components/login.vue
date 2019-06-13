<template>
  <div class="login-form">
    <h1><b>欢迎登录</b></h1>
	<img src="../image/Login_image/shiny_music.png" height="120" width="120" />
    <Form class="input-form" ref="formInline" :model="formInline" :rules="ruleInline" >
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
		<div class="btn-div">
        <FormItem>
            <Button class="lg-reg-btn" type="primary" long @click="handleSubmit('formInline')" :loading="loading" >{{loading?'':'登录'}}</Button>
        </FormItem>
		<FormItem>
            <Button class="lg-reg-btn" type="primary" ghost long @click="toRegister()" >注册</Button>
        </FormItem>
		</div>
    </Form>
	<Poptip
	    class="admin-tip"
		confirm
		transfer
        title="如果您是用户，请按取消；如果您是管理员，请按确定"
        @on-ok="toAdminLogin">
        <Icon id="admin-icon" type="md-contact" />
    </Poptip>
	<Poptip
	    class="back-tip"
		confirm
		transfer
        title="放弃登录并返回之前的页面吗"
        @on-ok="back">
        <Icon id="back-icon" type="md-arrow-round-back" />
    </Poptip>
</div>
</template>

<script>
import {AXIOS} from '../http/http'
export default{
	name: 'login',
	data() {
		return {
			loading: false,
			circle: '',
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
					{ type: 'string', min: 3, message: '密码不正确', trigger: 'blur' }
				]
			},
			inline: true
		}
	},
	methods: {
		back() {
			let path = sessionStorage.getItem('path')
			if (path) {
				this.$router.push(path)
				sessionStorage.removeItem('path')
			} else {
				this.$router.push('/')
			}
		},
		toRegister(){
			this.$parent.handleSelect('2')
		},
		toAdminLogin(){
			this.$parent.handleSelect('3')
		},
		handleSubmit(name) {
			this.loading = true
			AXIOS.get('/isUserBanned',{params:{uid:this.formInline.user}})
			.then((res)=>{
				if(res.data=='1'){
					this.$Message.info({
                		content: '您已经因为多次发表违规评论被封禁。若要解封，请发送邮件到music@xx.com或拨打12345咨询客服',
                		duration: 8
					});
				}
			else{
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.circle = 'circle'
						AXIOS.post('/Login', this.$qs.stringify({
							'id': this.formInline.user,
							'pwd': this.formInline.password
						}), 
						{
							headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
							}
						})
						.then(response => {
							console.log(response.data)
							let data = response.data
							if(data.success) {
								this.$Message.success('Success!')
								sessionStorage.setItem('userid', this.formInline.user)
								let path = sessionStorage.getItem('path')
								console.log(path)
								if (path) {
									this.$router.push(path)
									sessionStorage.removeItem('path')
								} else {
									this.$router.push('/')
								}
								// this.$router.push('/profile/' + this.formInline.user + '/mylike')
							} else {
								this.$Message.error('密码错误或用户不存在')
							}
						})
						.catch(error => {
							this.$router.push('/')
							this.$Message.error('Fail!')
						})
						.finally(() => {
							this.loading = false
							this.circle = ''
						})
					} else {
						this.$Message.error('Fail!')
					}
				})
				}
			})
			this.loading = false
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
	margin: 0 auto 0 auto;
	text-align: center;
	border-radius: 15px;/*圆角边框*/;
	padding-bottom: 50px;
	padding-top: 36px;
}
.input-form{
	margin-top: 3%;
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
	/*margin:0 55px;*/
	font-weight: 900
}
#admin-icon
{
    color:rgb(11, 148, 240);
    font-size:25px;
}
#back-icon {
	color:rgb(11, 148, 240);
    font-size:25px;
}
.admin-tip
{
	position: absolute;
    right:1%;
    bottom:1%;
}
.back-tip
{
	position: absolute;
    left:1%;
    top:1%;
}
</style>

