<template>
  <div :style="{'margin-left':navWidth+'px'}" class="ms_content_wrapper padder_top80" >
    <div class="banner" ref="color" :style="{'background':color}">
      <div class="banner-color"></div>
      <div class="ms_content_wrapper padder_top80">
        <div class="mt-5">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="banner-detail" id="create" ref="create" >
                  <h1>{{playlists.name}}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-start">
      <div class="bg-color-arg" :style="{'background-color':color}"></div>
      <div class="foreign-theme">
        <div class="host">
          <div class="resize-observer"></div>
        </div>
        <div class="size-observer">
          <div class="os-resize-observer"></div>
        </div>
        <div class="os-glue"></div>
        <div class="os-padding">
          <div class="os-viewport">
            <div class="os-content">
              <Tracks :playlists="playlists"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from "@/services/SpotifyService";
import Tracks from '@/components/PlaylistDetail/Tracks';

export default {
  props:['navWidth'],
  components:{
    Tracks
  },
  data(){
    return{
      playlists:{
        name:'',
        images:[{
          url:''
        }],
        description:'',
        uri:'',
      },
      color:'',
      base:'',
      offset:0,
      hasScrolledToBottom:false,
      img:'',
    }
  },
  async mounted(){
    const trackId = this.$route.params.trackId
    this.playlists = (await SpotifyService.GetTracks(trackId)).data
    const that = this;
      this.imgDataURL(this.playlists.images[0].url,async function(dataUrl) {
        that.createImg(dataUrl)
    })
    window.addEventListener("scroll", this.handleScroll);
  },
  methods:{
    millisToMinutesAndSeconds(millis) {         //Ms to minutes and seconds
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return (
          seconds == 60 ?
              (minutes+1) + ":00" :
              minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      );
    },
    //First of all we need to create new img element cause getAverageRGB not working on images that comes from another url
     async createImg(src){

      var parent = this.$refs.create;
      var doc = document.createElement('img')
      doc.src = src;
      parent.insertBefore(doc,parent.children[0]).setAttribute("id", "banner");
      var rgb = this.getAverageRGB(await document.getElementById('banner'));
      this.color ='rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
      var styleSheet = document.createElement("style")

      //Adding styles for new appended element
      var styles = `
                .banner-detail img {
                  height: 232px;
                  min-width: 232px;
                  width: 232px;
                  box-shadow: 10px 10px 10px rgb(0 0 0 / 60%);
                  -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
                  -webkit-box-shadow:10px 10px 10px  rgb(0 0 0 / 60%);
                  -khtml-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
                }
              `
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)
    },
    //Img to base64
    imgDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    },
    //Warning you can't use this function if you get image from another domain but if you have the images you won't need the createImg function
      getAverageRGB(imgEl){
      var blockSize = 5, // only visit every 5 pixels
          defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
          canvas = document.createElement('canvas'),
          context = canvas.getContext && canvas.getContext('2d'),
          data, width, height,
          i = -4,
          length,
          rgb = {r:0,g:0,b:0},
          count = 0;



      height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

      context.drawImage(imgEl, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch(e) {
        return defaultRGB;
      }

      length = data.data.length;

      while ( (i += blockSize * 4) < length ) {
        ++count;
         rgb.r += data.data[i];
         rgb.g += data.data[i+1];
         rgb.b += data.data[i+2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      return rgb;
    },
  },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap');
.ms_content_wrapper{
  margin-right: 0;
}
.banner{
  width: 100%;
  height: 30vh;
  max-height: 500px;
  min-height: 340px;
  display: flex;
  max-width: none;
  overflow: hidden;
  position: relative;
  padding-bottom: 450px;
}
.banner-color{
  background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=);
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.banner-detail{
  display: flex;
  align-items: center;
}

.banner-detail h1 {
  color: #ffffff !important;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  visibility: visible;
  width: 100%;
  font-size: 5rem;
  margin-left: 1rem;
}
.ms_content_wrapper{
  padding-bottom: 1rem !important;
  margin-left: 50px;
}
.play-button-banner{
  margin-left: 150px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8) !important;
}
.table-start{
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.start-btn {
  background-color: #1ed760;
  max-width: 60px;
  height: 60px;
  color: #000000;
  display: flex;
  justify-content: center;
  border-radius: 50px;
}
.start-btn svg{
  display: block;
  margin: auto;
}
.like-song {
  color: #ffffff !important;
  border-bottom: 0 !important;
}
.like-song tbody{
  border-top: 1px solid #aea5a5ab !important;
  max-width: 100%;
  position: relative;
}
.like-song th {
  color: #aea5a5ab;
  border: 0 !important;
}
.like-song td {
  border: 0 !important;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.like-song td svg{
  color: #15c54b;
  margin-right: 25px;
}

.table-img {
  display: flex;
  align-items: center;
}
.like-song tbody tr:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.5;
}
.table-img img {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}
.like-song .number svg{
  display: none;
}
.like-song tbody tr:hover .number svg{
  display: block;
  position: absolute;
  left:0;
}
.like-song tbody tr:hover .number span{
  display: none;
}
.content-start{
  background-color: var(--background-base);
  isolation: isolate;
}
.bg-color-arg{
  --background-base: #121212;
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
  background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.6)),to(var(--background-base))),var(--background-noise);
  background-image: linear-gradient(rgba(0,0,0,.6) 0,var(--background-base) 100%),var(--background-noise);
  height: 232px;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.foreign-theme{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -ms-flex-line-pack: start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -ms-grid-row-align: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: visible!important;
  position: relative;
}
.host{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-content: flex-start;
  border-color: transparent;
  border-style: solid;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: inherit;
  height: 100%;
  left: 0;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
  width: 100%;
  z-index: -1;
}
.size-observer{
  height: calc(100% + 1px);
  float: left;
  -webkit-box-flex: inherit;
  -ms-flex-positive: inherit;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: 0;
  -webkit-box-sizing: inherit!important;
  box-sizing: inherit!important;
  flex-basis: 0;
  flex-grow: inherit;
  flex-shrink: 0;
  margin: 0;
  max-height: 1px;
  max-width: 1px;
  overflow: visible;
  padding: 0;
  pointer-events: none;
  position: relative;
  width: inherit;
  z-index: -1;
}
.os-resize-observer{
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
  left: 0;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: -1;
  height: 1000%;
  min-height: 1px;
  min-width: 1px;
  width: 1000%;
}
.os-glue{
  margin: 0px;
  height: 104px;
  width: 1142px;
  max-height: 100%;
  max-width: 100%;
  pointer-events: none;
}
.os-viewport{
  -webkit-overflow-scrolling: touch;
  bottom: 0;
  -webkit-box-sizing: inherit!important;
  box-sizing: inherit!important;
  direction: inherit!important;
  left: 0;
  margin: 0;
  outline: none!important;
  padding: 0;
  position: absolute;
  resize: none!important;
  right: 0;
  top: 0;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

</style>