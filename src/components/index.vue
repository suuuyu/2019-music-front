<template>
    <div>
        <Carousel autoplay v-model="value2" loop :autoplay-speed="3000">
            <CarouselItem>
                <div class="carousel">
                    <img src="/index/cover1.png" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel">
                    <img src="/index/cover2.png" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel">
                    <img src="/index/cover3.png" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel">
                    <img src="/cover4.jpg" alt="">
                </div>
            </CarouselItem>
        </Carousel>
        <div class="songList">

            <div class="inner mod_index--hot">
                <div class="index__hd">
                    <h2 class="index__tit"><i >歌&nbsp;手&nbsp;推&nbsp;荐</i></h2>
                </div>
                <Row class="mod_playlist">
                    <!-- <i-col span="5" class="playlist__item slide__item" 
                    onmouseover="this.className=(this.className+' playlist__item--hover')" 
                    onmouseout="this.className=this.className.replace(/ playlist__item--hover/, '')"
                    v-for="(songlist, index) in songlists" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <router-link :to="'/songList/' + songlist.songlistid" :key="$route.path" class="js_playlist">
                                    <img :src="songlist.songlistimage &&songlist.songlistimage !=0  ? songlist.songlistimage : errorSongList[index]"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                </router-link>
                            </div>
                            <Tooltip :content="songlist.songlistname">
                                <h4 class="playlist__title">
                                    <span class="playlist__title_txt">
                                        <router-link :to="'/songList/' + songlist.songlistid" :key="$route.path"><p class="js_playlist">{{songlist.songlistname}}</p>
                                        </router-link>
                                    </span>
                                </h4>
                            </Tooltip> 
                        </div>
                    </i-col> -->
                    <show-user :type='2' :user='singers'></show-user>
                </Row>
            </div>

        </div>
        <div class="song">

            <div class="inner mod_index--hot">
                <div class="index__hd">
                    <h2 class="index__tit"><i class="icon_txt">歌单推荐</i></h2>
                </div>
                <Row class="mod_playlist">
                    <i-col span="5" class="playlist__item slide__item" 
                    onmouseover="this.className=(this.className+' playlist__item--hover')" 
                    onmouseout="this.className=this.className.replace(/ playlist__item--hover/, '')"
                    v-for="(song, index) in songs" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <router-link :to="'/song/' + song.songid" :key="$route.path" class="js_playlist">
                                    <img :src="song.songimage?song.songimage:'//p.qpic.cn/music_cover/KaFn5hQACzzVeLFOc4hamAyIL8gMZzaVJdBu6uwyOABMLUz8ICc7wg/300?n=1'" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                </router-link>
                            </div>
                            <Tooltip :content="song.songname">
                                <h4 class="playlist__title">
                                    <span class="playlist__title_txt"><router-link :to="'/song/' + song.songid" :key="$route.path" class="js_playlist"><p class="js_playlist">{{song.songname}}</p></router-link></span>
                                </h4>
                            </Tooltip> 
                            <!-- <div class="playlist__other">
                                播放量：36.5万
                            </div> -->
                        </div>
                    </i-col>
                </Row>
            </div>

        </div>
        <div class="album">

            <div class="inner mod_index--hot">
                <div class="index__hd">
                    <h2 class="index__tit"><i class="icon_txt">歌单推荐</i></h2>
                </div>
                <Row class="mod_playlist">
                    <i-col span="5" class="playlist__item slide__item" 
                    onmouseover="this.className=(this.className+' playlist__item--hover')" 
                    onmouseout="this.className=this.className.replace(/ playlist__item--hover/, '')"
                    v-for="(album, index) in albums" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                 <router-link :to="'/album/' + album.albumid" :key="$route.path" class="js_playlist">
                                    <img :src="album.albumimage?album.albumimage:'//p.qpic.cn/music_cover/KaFn5hQACzzVeLFOc4hamAyIL8gMZzaVJdBu6uwyOABMLUz8ICc7wg/300?n=1'" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                 </router-link>
                            </div>
                            <Tooltip :content="album.albumname">
                                <h4 class="playlist__title">
                                    <span class="playlist__title_txt"><router-link :to="'/album/' + album.albumid" :key="$route.path" class="js_playlist"><p class="js_playlist">{{album.albumname}}</p> </router-link></span>
                                </h4>
                            </Tooltip> 
                            
                        </div>
                    </i-col>
                </Row>
            </div>

        </div>
    </div>
</template>

<script>
import {recommend, singerRecommend, getSingerByID} from '@/request/song'
import { isArray } from 'util';
import showUser from './panel/showUser'
export default {
    name: 'index',
    components: {
    'show-user': showUser,
  },
    data() {
        return {
            errorSongList:['https://p.qpic.cn/music_cover/fPn0iapLleUFx4kZhMPupPlCbqJ9JcevXhr0suia5vI4ZiatY2Fr8ou8A/300?n=1', 
            'https://p.qpic.cn/music_cover/ibJJngZRP5m8ksRvDkGZxdfp4I182hH8FEphWtKfrh6zJQ9lxapp7tQ/300?n=1', 
            'https://p.qpic.cn/music_cover/sv5U6cpoN0dCLVrs9ibkz75fPLICuJNYVGmCkod92vkvbyDKugELsnQ/300?n=1',
            'https://p.qpic.cn/music_cover/A3K6WU7EtiaOWXPWe0T7icHibNjfZMyticGDbxOHj1Pg8pvoEL7mYsJeaw/300?n=1',
            'https://p.qpic.cn/music_cover/AhbCa0vazSRDjEJhYwthgsSbN5oKI78QXeGD1toy3dv0tCVNGicyXIA/300?n=1'],
            value2: 0,
            albums: [],
            songlists: [],
            songs: [],
            singers: [{}, {}, {}, {}, {}]
        }
    },
    created() {
        recommend(sessionStorage.getItem('userid'), json => {
            this.songs = json.songs
            this.albums = json.albums
            this.songlists = json.songlists
        })
    },
    mounted() {
        let id = sessionStorage.getItem('userid')
        singerRecommend(id, singerids => {
            console.log(singerids)
            if (isArray(singerids)) {
                singerids.forEach((singerid, index) => {
                    getSingerByID(singerid, singer => {
                        this.$set(this.singers, index, singer)
                    })
                });
            }
        })
    },
    methods: {
        getRecommend() {

        }
    }
}
</script>

<style scoped>
.js_playlist {
    overflow: hidden;
    max-height: 20px;
    max-width: 200px;
}
a {
  color: #000000;
  text-decoration: none;
}
a:hover {
  color: #57a3f3;
  text-decoration: none;
}
.mod_cover:hover .mod_cover__icon_play {
    opacity: 1;
    filter: none;
}
.mod_cover:hover .mod_cover__icon_play, .mod_cover__icon_play {
    background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006);
    background-image: -webkit-image-set(url(https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006) 1x,
    url(https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9) 2x);
}
.mod_cover__icon_play {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -35px;
    width: 70px;
    height: 70px;
    filter: alpha(opacity=0);
    opacity: 0;
    -webkit-transform: scale(.7) translateZ(0);
    -webkit-transition-property: opacity,-webkit-transform;
    -webkit-transition-duration: .5s;
    transform: scale(.7) translateZ(0);
    transition-property: opacity,transform;
    transition-duration: .5s;
    zoom: 1;
}
.mod_cover:hover .mod_cover__mask {
    opacity: .2;
    filter: alpha(opacity=20);
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
}
.playlist__other {
    float: left;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 22px;
}
.mod_playlist .playlist__title_txt {
    white-space: normal;
}
.mod_playlist .playlist__title_txt {
    float: left;
    max-width: 100%;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    max-height: 44px;
}
.mod_playlist .playlist__title {
    overflow: hidden;
}
.mod_cover__mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    filter: alpha(opacity=0);
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
}
.mod_index--hot .playlist__item_box {
    top: 0;
    left: 0;
    right: 0;
    margin-right:20px; 
}
.mod_playlist .playlist__pic {
    height: 100%;
    object-fit: cover;
}
.mod_playlist .playlist__pic {
    transform: scale(1) translateZ(0);
    transition: transform .75s;
}
.mod_playlist .playlist__pic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-transform: scale(1) translateZ(0);
    -webkit-transition: -webkit-transform .75s;
}
.mod_playlist .playlist__cover:hover .playlist__pic {
    transform: scale(1.07) translateZ(0);
    transition: transform .75s cubic-bezier(0,1,.75,1);
}
.mod_playlist .playlist__cover {
    position: relative;
    display: block;
    overflow: hidden;
    padding-top: 100%;
    margin-bottom: 15px;
}
.mod_cover {
    zoom: 1;
}


.mod_playlist .playlist__item {
    display: inline-block;
    width: 20%;
    padding-bottom: 44px;
    overflow: hidden;
    font-size: 14px;
    vertical-align: top;
}
.inner {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
}
.carousel {
    height: 450px;
}
.index__hd {
    position: relative;
    padding-top: 4.16667%;
    padding-bottom: 2%;
}
.index__tit {
    display: block;
    margin: 0 auto;
    width: 196px;
    height: 40px;
}
i {
    font-style:normal ;
}
.songList .index__tit {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: '';
    font-size: 30px;
    font-weight: 550
}
.song .index__tit {
    background-image: -webkit-image-set(url(/index/index_tit.png) 1x,url(/index/index_tit@2x.png) 2x);
    background-position: 0 -50px;
}
.album .index__tit {
    background-image: -webkit-image-set(url(/index/index_tit.png) 1x,url(/index/index_tit@2x.png) 2x);
    background-position: 0 -150px;
}
.icon_txt {
    font: 0/0 a;
}
.songList {
    background-color:rgb(235, 235, 235)
}
.song {
    background-color:rgb(245, 245, 245)
}
.album {
    background-color:rgb(255, 255, 255)
}

</style>


