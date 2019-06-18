<template>
    <div>
        <Drawer :closable="false" width="600" v-model="isOpen">
            <div class="demo-drawer-profile">
                <div class="mod_data">
                    <span class="data__cover">
                        <img :src="singer.singerimage" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000';this.onerror=null;" alt="Bodybangers" class="data__photo js_index">
                    </span>
                    <div class="data__cont">
                        <div class="data__name">
                            <h1 class="data__name_txt js_index" >{{singer.singername}}</h1>
                        </div>
                        <div class="data__desc" id="singer_desc">
                            <div class="data__desc_txt" id="short_desc" >国籍：{{singer.region}} </div>
                        </div>
                        <ul class="mod_data_statistic">
                            <li class="data_statistic__item">
                                <a class="js_goto_tab" ><span class="data_statistic__tit">单曲</span><strong class="data_statistic__number">{{songNum}}</strong></a>
                            </li>
                            <li class="data_statistic__item data_statistic__item--last">
                                <a class="js_goto_tab" ><span class="data_statistic__tit">专辑</span><strong class="data_statistic__number">{{albumNum}}</strong></a>
                            </li>
                        </ul>
                        <div class="data__actions" role="toolbar">
                            <Button :type="isFollow?'error':'success'" :loading = loading @click="changeFollow(userid, singer.singerid)">
                                <Icon :type="isFollow? 'md-close':'md-add'" :size=15 v-show="!loading"/>
                                {{isFollow? '取消关注':'添加关注'}}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <p :style="pStyle"><Icon type="md-flame" /> &nbsp; 热门歌曲</p>
            <div class="demo-drawer-profile">
                <Row v-for="(song, index) in songs" :key="index">
                    <Col span="10" style="margin-top:15px;">
                        <router-link :to="'/song/' + song.songid" :key="$route.path"><h5>{{song.songname}}</h5></router-link>
                    </Col>
                    <Col span="12">
                        <songPanel :songid="song.songid" :type="1" @toChoose="toChoose"></songPanel>
                    </Col>
                </Row>
                
            </div>
            <Divider />
            <p :style="pStyle">介绍</p>
            <div class="demo-drawer-profile">
               {{singer.introduction}}
            </div>
        </Drawer>
        <songlist-choose ref="chooser" :songid="songid" :mySonglist="mySonglist"></songlist-choose>
    </div>
</template>

<script>
import {fetchSingers} from '@/jsonp/fetchJSONP'
import {getSingerDetail} from '@/request/singer'
import songPanel from '../panel/songPanel'
import songlistChoose from '../panel/songlistChoose'
import {showCreatedSongList} from '@/request/song'
import { changeFollowSinger } from '@/request/follow'
export default {
    name: 'singerDetail',
    components: {
        'songPanel': songPanel,
        'songlist-choose': songlistChoose,
    },
    data () {
        return {
            back: '',
            isOpen: false,
            pStyle: {
                fontSize: '16px',
                color: 'rgba(0,0,0,0.85)',
                lineHeight: '24px',
                display: 'block',
                marginBottom: '16px'
            },
            singer: {},
            songNum: 0,
            albumNum: 0,
            songs: [],
            isFollow: false,
            loading: false,
            userid: sessionStorage.getItem('userid'),
            chooseList: false,
            songid: '',
            mySonglist: ''
        }
    },
    methods: {
        toChoose(id) {
			this.$refs.chooser.toShow()
			this.songid = id
			showCreatedSongList(sessionStorage.getItem('userid'), json => {
				this.mySonglist = json
			})
		},
        open(singerID) {
            console.log(singerID)
            getSingerDetail(singerID, this.userid, json => {
                this.singer = json.singer
                console.log(this.singer)
                this.singer.name = this.singer.singername
                fetchSingers([this.singer])
                this.songs = json.songs
                this.songNum = json.songNum
                this.albumNum = json.albumNum
                this.isFollow = json.isfollow
            })
            this.isOpen = true
        },
        changeFollow(userid, singerid) {
            if (userid === null || userid === undefined) {
                this.$Notice.error({
                    title: '请先登录后再进行此操作'
                })
                return
            }
            this.loading = true
            changeFollowSinger(userid, singerid, json => {
                this.isFollow = !this.isFollow
                this.$Notice.success({
                    title: json
                })
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.data_statistic__number {
    font-size: 25px;
    font-weight: 400;
    margin-left: 10px;
}
.data__actions {
    margin-top: 30px;
    padding-left: 40px;
}
a {
    color: #000;
    text-decoration: none;
}
.h1, .h2, .h3, h1, h2, h3 {
    margin-top: 0px;
    margin-bottom: 0px;
}
.demo-drawer-profile{
    font-size: 14px;
}
.demo-drawer-profile .ivu-col{
    margin-bottom: 12px;
}
.mod_data {
    position: relative;
    height: 250px;
    padding-left: 305px;
    margin-top: 40px;
    margin-bottom: 35px;
}
.data__cover {

    position: absolute;
    left: 0px;
    top: 0;
    width: 250px;
    height: 250px;

}
.data__photo {

    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
}
.data__cont {

    padding-top: 31px;

}
.data__name {

    overflow: hidden;
    height: 50px;
    line-height: 50px;

}
.data__name_txt {

    float: left;
    font-size: 38px;
    font-weight: 400;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
    margin-right: 10px;

}
.data__desc {

    font-size: 14px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 4px;

}
.data__desc_txt {

    float: left;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2px;

}
.mod_data_statistic {

    height: 23px;
    line-height: 23px;
    overflow: hidden;
    font-size: 0;

}
.data_statistic__item {

    display: inline-block;
    *display: inline;
    *zoom: 1;
    border-right: solid 1px #c9c9c9;
    text-align: center;
    padding-right: 20px;
    margin-right: 20px;
    font-size: 18px;

}
.data_statistic__item--last {

    border-right: 0 none;

}
</style>


