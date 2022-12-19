<template>
  <div class="grid-arranger">
      <div class="img-loader flexer"></div>
      <div class="name-loader flexer"></div>
      <div class="flexer album-loader"></div>
      <div class="flexer artist-loader"></div>
      <div class="duration-loader"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tracklist-row-load{
  grid-gap: 16px;
  display: grid;
  padding: 0 16px;
  grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(120px,1fr);
  height: calc(100% - 1008px);
}
.flexer{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-image: url("https://open.spotifycdn.com/cdn/images/tracklist-placeholder.b3e2f75c.png");
  height: 45px;
}
.img-loader{
  background-position-x: -12px;
  width: 16px;
  justify-self: end;
}
.name-loader{
  background-position-x: -44px;
  width: 195px;
  justify-self: start;
}
.album-loader{
  background-position-x: -693px;
  width: 120px;
}
.artist-loader{
  background-position-x: -693px;
  width: 120px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: start;
}
.duration-loader{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  grid-column: last;
  justify-self: end;
  background-image: url("https://open.spotifycdn.com/cdn/images/tracklist-placeholder.b3e2f75c.png");
  background-position-x: -1175px;
  width: 120px;
}
</style>