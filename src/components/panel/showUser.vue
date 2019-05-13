<template>
  <div>
    <a href="javascript:;" class="mod_btn btn_focus_fan js_focus_friends" style="display: block;"><img src="Index_image/add_more.png" class="operate_btn">关注更多用户</a>
    <div class="js_sub" id="focus_singer_box" style="display: block;">
      <div class="mod_singer_list mod_singer_list--fans">
        <ul class="singer_list__list">
          <li class="singer_list__item" th:each="list,iterStat:${Follows}">
            <div class="singer_list__item_box">
              <a href="#" class="singer_list__cover js_singer" >
                  <img class="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000001Y2Gbc2Xt1hU.jpg?max_age=2592000" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000';this.error=null;" alt="Michael Jackson">
              </a>
              <h3 class="singer_list__title"><a href="https://y.qq.com/n/yqq/singer/001Y2Gbc2Xt1hU.html" class="js_singer" title="Michael Jackson" th:text="${list.getUsername()}"></a></h3>
              <p class="singer_list__info"  th:data-focusnum="${FollowNum.get(iterStat.index)}" th:text="${FollowNum.get(iterStat.index)}+'人已关注'"></p>
              <div class="singer_list__focus">
                  <a href="javascript:;" class="mod_btn singer_list__btn_focus js_follow_singer" ><span class="btn_focus__cont" th:onclick="FollowUser([[${list.getUserid()}]],[[${iterStat.index}]]);" th:text="${isFollow.get(iterStat.index)}?'已关注':'未关注'"></span></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'user'],
  name: 'showUser',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>


