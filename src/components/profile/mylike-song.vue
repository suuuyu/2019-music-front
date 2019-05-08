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
        <div class="">

        </div>
    </div>
</template>

<script>
export default {
    props:['song'],
    name: 'mylike-song',
    data () {

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

</style>
