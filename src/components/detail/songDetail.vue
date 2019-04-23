<template>
    <div class="detail">
        <Layout>
        <Sider hide-trigger height="200" width="200">
					<img src="@/image/Login_image/shiny_music.png" height="200" width="200" />
				</Sider>
        <Layout>
            <Header>
							<h1 v-text="song.name" class="name-text"></h1>
						</Header>
            <Content class="singer-text">Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout>
    </div>
</template>

<script>
export default {
    name: 'songDetail',
    created () {
			let songid = this.$route.params.songid
			console.log('id: ' + songid)
			this.song.id = songid
    },
    data () {
			return {
				song: {
						id: '未知',
						name: '未知',
						imgpath: '未知',
						singername: '未知'
				}
			}
		},
		methods: {

		}

}
</script>

<style scoped>
.ivu-layout-sider
{
	background: white!important
}
.detail {
	width: 80%;
	height: 100%;
	margin-left: auto;
	margin-right: auto; 
}
.name-text {
	float: left;
	font-size: 31px;
	line-height: 50px;
	font-weight: 400;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70%;
	margin-right: 10px
}
.singer-text {
	height: 24px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 90%
}
</style>