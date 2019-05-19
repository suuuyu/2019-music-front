<template>
    <div>
        <div style="margin-bottom:20px">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-build" />自动封禁</p>
                <p>点击扫描按钮，系统会自动扫描，对于发布超过3条违规评论的用户予以封禁</p>
                <div>
                <Button size="large" icon="md-qr-scanner" type="primary" shape="circle"></Button>
                </div>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-body" />评论审核</p>
                <p>人工审核评论，对于违规评论予以删除</p>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
    name:'BanUser'
}
</script>
<style scoped>
.ivu-card-body > div{
    margin-top:20px
}
</style>