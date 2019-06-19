<template>
    <div>
        <Tabs value="name1" @on-click="handle">
            <TabPane label="歌曲" name="name1" class="real-panel"><Song :song=song></Song></TabPane>
            <TabPane label="歌单" name="name2"><Songlist :songlist=sl></Songlist></TabPane>
            <!-- <TabPane label="专辑" name="name3"><Album :albums=albums></Album></TabPane> -->
        </Tabs>
    </div>
</template>

<script>
import mylikesong from './mylike-song'
import mylikealbum from './mylike-album'
import mylikesonglist from './mylike-songlist'
import { AXIOS } from '../../http/http';
export default {
    components: {
			'Song': mylikesong,
			'Songlist': mylikesonglist,
			'Album': mylikealbum
    },
    name: 'mylike',
    props: ['userid', 'sMethod', 'slMethod', 'aMethod'],
    data () {
			return {
				song: [],
				sl: [],
				songlist: {
					createdsonglist:{
						"songlistid": "3000001",
						"songlistname": "我喜欢",
						"songlistimage": null,
						"isprivate": "0",
						"userid": "100001",
						"createtime": "2018-12-21T05:58:19.000+0000"
					},
						
					keepedsonglist: [
					]
				},
				albums: [
									{
										"albumid": "1000000",
										"albumname": "十一月的萧邦",
										"singerid": "200000",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "索尼音乐",
										"adminid": "1000"
									},
									{
										"albumid": "1000001",
										"albumname": "七里香",
										"singerid": "200000",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "索尼音乐",
										"adminid": "1000"
									},
									{
										"albumid": "1000002",
										"albumname": "崇拜",
										"singerid": "200001",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "相信音乐",
										"adminid": "1000"
									},
									{
										"albumid": "1000003",
										"albumname": "几个薛之谦",
										"singerid": "200002",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "索尼音乐",
										"adminid": "1000"
									},
									{
										"albumid": "1000004",
										"albumname": "U87",
										"singerid": "200003",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "索尼音乐",
										"adminid": "1000"
									},
									{
										"albumid": "1000005",
										"albumname": "她说",
										"singerid": "200004",
										"albumimage": null,
										"albumage": "00",
										"language": "中文",
										"company": "索尼音乐",
										"adminid": "1000"
									}
								]
			}
		},
		mounted() {
			this.fetchData()
		},
		// watch: {
		// 	userid: function() {
		// 		this.fetchData()
		// 	}
		// },
    methods: {
			fetchData() {
				console.log(this.userid)
				this.getFavorite(this.userid)
				this.getSongList(this.userid)
			},
			handle(name) {
				switch(name){
					case 'name2':this.sl.length ===0 ? this.getSongList(this.userid): null
				}
			},
			getFavorite(id) {
				AXIOS.get('/getFavorite?id=' + id)
				.then(respond => {
					this.song = respond.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取我喜欢歌单出错',
							desc: error ? error : '未知错误'
					})
				})
			},
			getSongList(id) {
				AXIOS.get('getSongList?id=' + id)
				.then(respond => {
					this.songlist = respond.data
					this.sl = this.songlist.keepedsonglist
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取歌单信息出错',
							desc: error ? error : '未知错误'
					})
				})
			},

    }
}
</script>

<style scoped>
.ivu-tabs-nav-container{
    font-size: 16px !important;
}
.real-panel {
	margin-bottom: 30px;
}
</style>


