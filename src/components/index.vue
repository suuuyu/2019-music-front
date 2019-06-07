<template>
    <div>
        <Carousel autoplay v-model="value2" loop :autoplay-speed="3000">
            <CarouselItem>
                <div class="carousel">
                    <img src="/cover1.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel">
                    <img src="/cover2.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel">
                    <img src="/cover3.jpg" alt="">
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
                    <h2 class="index__tit"><i class="icon_txt">歌单推荐</i></h2>
                </div>
                <Row class="mod_playlist">
                    <i-col span="5" class="playlist__item slide__item" 
                    onmouseover="this.className=(this.className+' playlist__item--hover')" 
                    onmouseout="this.className=this.className.replace(/ playlist__item--hover/, '')"
                    v-for="index in 5" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <a class="js_playlist">
                                    <img src="//p.qpic.cn/music_cover/KaFn5hQACzzVeLFOc4hamAyIL8gMZzaVJdBu6uwyOABMLUz8ICc7wg/300?n=1" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                </a>
                            </div>
                            <h4 class="playlist__title">
                                <span class="playlist__title_txt"><a class="js_playlist">端午赏 · 轻柔温婉国风集</a></span>
                            </h4>
                            <div class="playlist__other">
                                播放量：36.5万
                            </div>
                        </div>
                    </i-col>
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
                    v-for="index in 5" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <a class="js_playlist">
                                    <img src="//p.qpic.cn/music_cover/KaFn5hQACzzVeLFOc4hamAyIL8gMZzaVJdBu6uwyOABMLUz8ICc7wg/300?n=1" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                </a>
                            </div>
                            <h4 class="playlist__title">
                                <span class="playlist__title_txt"><a class="js_playlist">端午赏 · 轻柔温婉国风集</a></span>
                            </h4>
                            <div class="playlist__other">
                                播放量：36.5万
                            </div>
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
                    v-for="index in 5" :key="index">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <a class="js_playlist">
                                    <img src="//p.qpic.cn/music_cover/KaFn5hQACzzVeLFOc4hamAyIL8gMZzaVJdBu6uwyOABMLUz8ICc7wg/300?n=1" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"  class="playlist__pic">
                                    <i class="mod_cover__mask"></i>
                                    <i class="mod_cover__icon_play js_play" ></i>
                                </a>
                            </div>
                            <h4 class="playlist__title">
                                <span class="playlist__title_txt"><a class="js_playlist">端午赏 · 轻柔温婉国风集</a></span>
                            </h4>
                            <div class="playlist__other">
                                播放量：36.5万
                            </div>
                        </div>
                    </i-col>
                </Row>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            value2: 0
        }
    },
    methods: {

    }
}
</script>

<style scoped>
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
    background-image: -webkit-image-set(url(/index/index_tit.png) 1x,url(/index/index_tit@2x.png) 2x);
}
.song .index__tit {
    background-position: 0 -50px;
}
.album .index__tit {
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


