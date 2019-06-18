<template>
    <Modal v-model="isShow">
        <Row v-for="(s, index) in recognize" :key="index" class="element">
            <Col span="12" ><a @click="toSearch(s.songName)">{{s.songName}}</a></Col>
            <Col span="12">{{`相似系数：${s.score}`}}</Col>
            <!-- <Divider /> -->
        </Row>
    </Modal>
</template>

<script>
export default {
    props:['recognize'],
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        show() {
            this.isShow = true
            console.log(this.recognize)
        },
        close() {
            this.isShow = false
        },
        toSearch(songname) {
            this.$emit('recognizeSong', songname)
        }
    }
}
</script>

<style scoped>
a {
    color: black;
}
.element {
    margin-top: 10px;
}
</style>


