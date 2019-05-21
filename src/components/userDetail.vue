<template>
    <div>
        <div class="head-contain">
            <div class="inner">
							<div class="head-img">
									<img src="//thirdqq.qlogo.cn/g?b=sdk&amp;k=FDjMMNJZGGJc9MsnCMnHsw&amp;s=140&amp;t=1529503572" 
									onerror="this.src='//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=31536000';this.onerror=null;" alt="flowrain" class="profile-cover" >
							</div>
            <h1 class="profile__tit">
						<Tooltip placement="left" :content="'id: ' + user.userid">
							<span class="profile-name" v-text="user.username"></span>
						</Tooltip>
						<!-- <a href="https://y.qq.com/portal/vipportal/index.html">
								<img src="//y.gtimg.cn/music/icon/v1/mac/svip_g@2x.png?max_age=2592000" alt="user_cover" class="lv_icon">
						</a> -->
			    </h1>
					<ul class="mod-user-statistic">
							<li class="user_statistic__item">
									<a href="javascript:;"  class="js_tab" @click="showFollow">
											<strong class="user_statistic__number js_num_follow">{{friends.length + followSingers.length}}</strong>
											<span class="user_statistic__tit">关注</span>
									</a>
							</li>
							<li class="user_statistic__item user_statistic__item--last">
									<a href="javascript:;"  class="js_tab" @click="showFan">
											<strong class="user_statistic__number js_num_fans">{{fans.length}}</strong>
											<span class="user_statistic__tit">粉丝</span>
									</a>
							</li>
							<Button v-if="me!==user.userid" type="default" ghost class="follow-btn" @click="handleFollow">{{isFollow==1?'取消关注':'关注'}}</Button>
			    </ul>
					<Menu mode="horizontal" active-name="1" class="main-menu" @on-select="Menuselected">
							<MenuItem name="1">
									<Icon type="ios-paper" />
									我喜欢
							</MenuItem>
							<MenuItem name="2">
									<Icon type="ios-people" />
									我的已购
							</MenuItem>
							<MenuItem name="3">
									<Icon type="ios-construct" />
									我创建的歌单
							</MenuItem>
					</Menu>
					</div>
			</div>
		<div class="body-contain">
				<router-view :userid="userid" :fans="fans" 
				:friends="friends" :followSingers="followSingers"></router-view>
		</div>
	</div>
</template>

<script>
import {AXIOS} from '../http/http'
import { changeFollowUser, isFollowUser} from '@/request/follow'
export default {
    name: 'userDetail',
    created () {
			this.init();
		},
		watch: {
			userid: function () {
				this.init()
				console.log(this.userid + ' !!!!!!!!!!!')
			}
		},
		beforeRouteUpdate(to, from, next){
			// 在当前路由改变，但是该组件被复用时调用
			// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
			// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
			// 可以访问组件实例 `this`
			this.userid = to.params.userid
			next()
		},
    data () {
        return {
					isFollow: -1,
					me: sessionStorage.getItem('userid'),
					userid: this.$route.params.userid,
					user: {
							// "userid": "100001",
							// "username": "lemon",
							// "userpassword": "123",
							// "userimage": null,
							// "usersex": "1",
							// "isvip": "0",
							// "userbalance": 0,
							// "isbanned": "0"
					},
					fans: [], //关注我人
					friends: [
						// like this:
						// {
						// "userid": "100000",
						// "username": "tongji",
						// "userpassword": "123",
						// "userimage": null,
						// "usersex": "1",
						// "isvip": "0",
						// "userbalance": 0,
						// "isbanned": null
						// }
					], //我关注的人
					followSingers: [
						// like this
						// 	{
						// 	"singerid": "200000",
						// 	"singername": "周杰伦",
						// 	"singerimage": null,
						// 	"singersex": "男",
						// 	"region": "中国台湾",
						// 	"introduction": "中国台湾流行男歌手"
						// }
					] //我关注的歌手
        }
    },
    methods: {
			init() {
				this.user.userid = this.$route.params.userid
				this.getUser(this.user.userid)
				this.getFans(this.user.userid)
				this.getFriends(this.user.userid)
				this.getFollowSinger(this.user.userid)
				isFollowUser(this.me, this.user.userid, json => {
					this.isFollow = json?1:-1
					console.log(json)
				})
			},
			handleFollow() {
				changeFollowUser(this.me, this.user.userid, json => {
					this.$Notice.success({
							title: json
					})
					this.getFans(this.user.userid)
					this.isFollow = -this.isFollow
					console.log(this.isFollow)
				})
			},
			Menuselected(name) {
				console.log(name)
				switch(name){
					case '1':
						this.$router.push('/profile/' + this.user.userid + '/mylike')
						break
					case '3':
						this.$router.push('/profile/' + this.user.userid + '/myCreated')
						break
				}
			},
			showFollow() {
				this.getFriends(this.user.userid)
				this.getFollowSinger(this.user.userid)
				this.$router.push('/profile/' + this.user.userid + '/follow')
			},
			showFan() {
				this.getFans(this.user.userid)
				this.$router.push('/profile/' + this.user.userid + '/friend')
			},
			getUser(id) {
				AXIOS.get('getUser?id=' + id)
				.then(response => {
					this.user = response.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取个人信息出错',
							desc: error ? error : '未知错误'
					})
				})
			},
			getFans(id) {
				AXIOS.get('/getFans?id=' + id)
				.then(response => {
					this.fans = response.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取粉丝信息出错',
							desc: error ? error : '未知错误'
					})
				})
			},
			getFriends(id) {
				AXIOS.get('/getFriends?id=' + id)
				.then(response => {
					this.friends = response.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取好友信息出错',
							desc: error ? error : '未知错误'
					})
				})
			},
			getFollowSinger(id) {
				AXIOS.get('/getFollowSinger?id=' + id)
				.then(response => {
					this.followSingers = response.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取关注歌手信息出错',
							desc: error ? error : '未知错误'
					})
				})
			}
    }
}
</script>

<style scoped>
.follow-btn {
	margin-bottom: 40px;
}
.head-contain {
    height: 380px;
    padding-top: 65px;
    background: url(../image/PM_BG.jpg) 50% no-repeat;
    background-size: auto auto;
    background-size: cover;
    text-align: center;
}
.body-contain, .head-contain .inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}
.head-img {
    position: relative;
    width: 102px;
    height: 102px;
    margin: 0 auto;
}
.profile-cover {
    display: block;
    width: 100%;
    height: 100%;
    border: 4px solid #fff;
    border-radius: 99px;
    background: #fff;
}
.profile-name {
    color: #fff;
    font-size: 30px;
    font-weight: 100;
    line-height: 64px;
    margin-right: 4px;
}
.mod-user-statistic {
    height: 40px;
    margin: 4px 15px 26px;
    overflow: hidden;
    font-size: 0;
}
.user_statistic__item {
    display: inline-block;
    border-right: solid 1px #24313d;
    width: auto;
    text-align: center;
    padding: 0 25px;
}
.user_statistic__item--last {
    border-right: 0 none;
}
.user_statistic__number, .user_statistic__tit {
    color: #fff;
}
.user_statistic__number {
    display: block;
    font-size: 22px;
    line-height: 24px;
    margin-top: -1px;
    font-weight: 100;
}
.user_statistic__tit {

    display: block;
    color: #999;
    font-size: 14px;
}
.user_statistic__number, .user_statistic__tit {
    color: #fff;
}
.ivu-menu-light {
    background: #02020200 !important;
}
.main-menu {
    margin-top: 45px;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
    color: rgb(255, 255, 255) ;
    font-family: poppin,Tahoma,Arial,微软雅黑,sans-serif;
    font-size: 16px;
}
.body-contain {
    margin-top: 20px;
}
</style>

