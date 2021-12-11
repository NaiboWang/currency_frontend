<template>
  <div></div>
</template>

<script>
function GetUrlRelativePath() {
  var url = document.location.toString();
  var arrUrl = url.split("//");

  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

export default {
  name: "redirect",
  created() {
    window.location.href=process.env.VUE_APP_INDEX_PAGE
  },
}
</script>

<style scoped>

</style>
