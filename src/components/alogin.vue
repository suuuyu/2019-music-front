<template>
  <div class="login-form">
    <h1><b>管理员登录</b></h1>
	<img src="../image/Login_image/shiny_music.png" height="110" width="110" />
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
		<div>
        <FormItem>
            <Button class="lg-reg-btn" type="primary" long @click="adminLogin()" :loading="loading" :shape="circle">{{loading?'':'登录'}}</Button>
        </FormItem>
		<FormItem>
            <Button class="lg-reg-btn" type="primary" long ghost @click="toLogin()" :shape="circle">返回</Button>
        </FormItem>
		</div>
    </Form>
</div>
</template>

<script>
import {AXIOS} from '../http/http'
export default{
	name: 'alogin',
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
		toLogin(){
			this.$parent.handleSelect('1')
		},
		adminLogin(){
			AXIOS.post('/adminLogin',this.$qs.stringify({
				'id':this.formInline.user,
				'pwd':this.formInline.password
			}),
			{
						headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                        }
					})
			.then((response)=>{
				if(1===response.data){
					this.$Message.success('登录成功')
					this.$router.push('/admin')
					sessionStorage.setItem('adminid', this.formInline.user)
				}
				else{
					this.$Message.error('登录失败')
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
	padding:2em;
	padding-top: 1.5em;
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
	font-weight: 900
}
#admin-icon
{
    color:rgb(11, 148, 240);
    font-size:25px;
}
.admin-tip
{
	position: absolute;
    right:1%;
    bottom:1%;
}
</style>

