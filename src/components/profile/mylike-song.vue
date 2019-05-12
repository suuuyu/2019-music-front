<template>
    <div>
        <div class="mod_songlist_toolbar">
            <a href="javascript:;" class="mod_btn_blue js_all_play">
                <i class="mod_btn_green__icon_play"></i>
                <img src="Index_image/mod_play.png" class="operate_btn" alt="play">
                播放
            </a>
            <a href="javascript:;" class="mod_btn js_all_fav">
                <i class="mod_btn__icon_add"></i>
                <img src="Index_image/mod_add.png" class="operate_btn" alt="add">
                添加到
            </a>
            <a href="javascript:;" class="mod_btn js_all_down">
                <i class="mod_btn__icon_down"></i>
                <img src="Index_image/mod_download.png" class="operate_btn" alt="download">
                下载
            </a>
            <a href="javascript:;" class="mod_btn js_batch">
                <i class="mod_btn__icon_batch"></i>
                <img src="Index_image/mod_multoperate.png" class="operate_btn" alt="operate">
                批量操作
            </a>
        </div>
        <div class="detail-contain">
            <Table stripe  :columns="columns" :data="song">
                <template slot-scope="{ row }" slot="name">
                    <strong><a class="panel-word">{{ row.name }}</a></strong>
                </template>
                <template slot-scope="{ row }" slot="menuBar">
                    <strong>
                        <songPanel :songid="row.songid" class="panel"></songPanel>
                    </strong>
                </template>
                <template slot-scope="{ row }" slot="singer">
                    <strong><a class="panel-word">{{ row.singer }}</a></strong>
                </template>
                <template slot-scope="{ row }" slot="album">
                    <strong><a class="panel-word">{{ row.album }}</a></strong>
                </template>
                <template slot-scope="{ row }" slot="length">
                    <strong><span class="panel-word">{{ row.length }}</span></strong>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
import songPanel from '../panel/songPanel'
export default {
    components: {
        'songPanel': songPanel
    },
    props:['song'],
    name: 'mylike-song',
    mounted () {
        
    },
    data () {
        return {
            columns:[
                {
                    title: '歌名',
                    width: 200,
                    slot: 'name'
                },
                {
                    title: ' ',
                    width: 400,
                    slot: 'menuBar',
                },
                {
                    title: '歌手',
                    slot: 'singer',
                },
                {
                    title: '专辑',
                    slot: 'album',
                },
                {
                    title: '时长',
                    slot: 'length',
                }
            ],

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.mod_songlist_toolbar {
    float: left;
    margin-bottom: 20px;
    font-size: 0;
    padding-top: 20px;
}
.mod_btn_blue {
    border: 1px solid rgba(22,154,243,1.00);
    background-color: rgba(22,154,243,1.00);
    color: #fff;
}
.mod_btn, .mod_btn_blue {
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    width: 120px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
}
.mod_btn {
    border: 1px solid #c9c9c9;
    background-color: #FFFFFF;
    color: #000;
}
.operate_btn {
    height: 15px;
    position: relative;
    bottom: 3px;
    top: 3px;
    right: 3px;
}
.detail-contain {
    float: left;
    position: relative;
    width: 100%;
    min-width: 1200px;
}
.panel {
    float: right;
    margin-right: 50px;
}
.panel-word {
    font-size: 14px;
    font-family: 微软雅黑,sans-serif;
    font-weight:500;
}
</style>
