<template>
  <div :style="{'margin-left':navWidth+'px'}" class="ms_content_wrapper padder_top80">
    <div class="banner" ref="color" style="background-color: rgb(107, 99, 164);">
      <div class="banner-color"></div>
      <div class="ms_content_wrapper padder_top80">
        <div class="mt-5">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="banner-detail" id="create" ref="create">
                  <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="liked songs">
                  <h1>Liked Songs</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-start">
      <div class="bg-color-arg" style="background-color: rgb(107, 99, 164);"></div>
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
              <div class="content-spacing action-bar" :style="{'height':height+'px'}">
                <div class="action-bar-row">
                  <div class="action-arranger">
                    <button class="play-artist">
                      <span class="encore-theme btn-inner" @click="changeSong(playlists.tracks.items[0].album.uri,1)">
                        <span class="icon-wrapper">
                          <svg role="img" height="28" width="28" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG">
                            <path fill="#121212" d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                        </span>
                      </span>
                    </button>
                  </div>
                  <button class="others">
                    <svg role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG">
                      <path
                          d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>
                  </button>
                </div>
                <div class="artist-arranger">
                  <div class="presentation">
                    <div class="top-sentinel">
                      <div class="table-header">
                        <div class="grid-arranger">
                          <div class="tag">
                            #
                          </div>
                          <div class="title-arranger">
                            <div class="title">
                              <span class="titled">Title</span>
                            </div>
                          </div>
                          <div class="album-arranger">
                            <div class="title">
                              <span class="titled">album</span>
                            </div>
                          </div>
                          <div class="date-arranger">
                            <div class="title">
                              <span class="titled">date</span>
                            </div>
                          </div>
                          <div class="time-arranger">
                            <div class="title">
                              <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 eqtHWV">
                                <path
                                    d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                                <path
                                    d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="grid-arranger" style="height: calc(100% - 1008);" v-for="(tracks,i) in liked.items">
                        <div class="list-num">
                          <div class="list-num-style">
                            <span class="number">
                              {{ i }}
                            </span>
                            <button class="play-track">
                              <svg role="img" height="24" width="24" class="Svg-ytk21e-0 eqtHWV UIBT7E6ZYMcSDl1KL62g"
                                   viewBox="0 0 24 24">
                                <path
                                    d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="list-img">
                          <img aria-hidden="false" draggable="false" loading="eager" :src="tracks.track.album.images[0].url" :alt="tracks.track.name" width="40" height="40">
                          <div class="list-name">
                            <a class="track-link" href="#">{{ tracks.track.name }}</a>
                            <span class="list-artist">
                            <span @click="navigateTo({name:'artist',params:{artist:tracks.track.artists[0].id}})">
                              {{tracks.track.artists[0].name }}
                            </span>
                          </span>
                          </div>
                        </div>
                        <div class="album-arranger">
                          <div class="title">
                            <span class="titled">{{ tracks.track.album.name }}</span>
                          </div>
                        </div>
                        <div class="date-arranger">
                          <div class="title">
                            <span class="titled">{{ tracks.track.album.release_date }}</span>
                          </div>
                        </div>
                        <div class="time-arranger">
                          <div class="title">
                            {{ millisToMinutesAndSeconds(tracks.track.duration_ms) }}
                          </div>
                        </div>
                      </div>
                      <div style="height: 1008px;"></div>
                    </div>
                    <div class="bottom-sentinel"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from "@/services/SpotifyService";

export default {
  props:['navWidth'],
  data(){
    return{
      liked:{
        items:[{
          track:{
            name:'',
            track_number:'',
            album:{
              name:'',
              uri:'',
              images:[{
                url:''
              }],
            },
            artists:[{
              name:'',
              id:''
            }]
          }
        }],
        total:''
      },
      height:960,
      offset:0,
      hasScrolledToBottom:false
    }
  },
  async mounted(){
    const response = await SpotifyService.getFavorite()
    this.liked = response.data
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
    navigateTo(route){
      this.$router.push(route)
    },
    async changeSong(uri,trackNumber){
      await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
    },
    async handleScroll() {
      console.log(this.offset)
      if (this.$route.name === 'liked' ){          //This checks the route,by route otherwise this functions keeps runing on every page
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          var offset = this.offset
          this.offset = offset + 25;
          var height = this.height
          this.height = height + 1060;
          const response = await SpotifyService.getFavorite({
            offset:this.offset
          })
          for (var i = 0;i < response.data.items.length;i++){
            this.liked.items.push(response.data.items[i])
          }
        }
      }else{
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
  },
  watch:{
    offset:function (newValue){
      if (newValue >= this.liked.total){
        var removeHeight = this.liked.total *48;
        this.height = removeHeight;
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
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
.banner-detail img {
  height: 232px;
  min-width: 232px;
  width: 232px;
  box-shadow: 10px 10px 10px rgb(0 0 0 / 60%);
  -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 10px 10px 10px rgb(0 0 0 / 60%);
  -khtml-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
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
.artist-arranger{
  width: 100%;
  margin-top: 1rem;
}
.action-bar{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-bottom: var(--action-bar-padding-bottom,24px);
  padding-top: var(--action-bar-padding-top,24px);
  position: relative;
}
.action-bar:after{
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  -ms-flex-negative: 0;
  content: "";
  display: table;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 0.01px;
  line-height: 0;
  visibility: hidden;
  width: 0.01px;
}
.action-bar-row{
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
}
.action-arranger{
  margin-right: 32px;
}
.play-artist{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.125rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
  display: inline-block;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  touch-action: manipulation;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter, transform;
  user-select: none;
  vertical-align: middle;
  transform: translate3d(0px, 0px, 0px);
  padding: 0px;
  min-inline-size: 0px;
  align-self: center;
}
.encore-theme{
  --background-base: #1ed760;
  --background-highlight: #1fdf64;
  --background-press: #169c46;
  --background-elevated-base: #1ed760;
  --background-elevated-highlight: #1ed760;
  --background-elevated-press: #1ed760;
  --background-tinted-base: #1ed760;
  --background-tinted-highlight: #1ed760;
  --background-tinted-press: #1ed760;
  --background-unsafe-for-small-text-base: #1ed760;
  --background-unsafe-for-small-text-highlight: #1ed760;
  --background-unsafe-for-small-text-press: #1ed760;
  --text-base: #000;
  --text-subdued: #000;
  --text-bright-accent: #000;
  --text-negative: #000;
  --text-warning: #000;
  --text-positive: #000;
  --text-announcement: #000;
  --essential-base: #000;
  --essential-subdued: #000;
  --essential-bright-accent: #000;
  --essential-negative: #000;
  --essential-warning: #000;
  --essential-positive: #000;
  --essential-announcement: #000;
  --decorative-base: #000;
  --decorative-subdued: #1abc54;
}
.btn-inner{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  background-color: var(--background-base,#1ed760);
  color: var(--text-base,#000000);
  display: flex;
  border-radius: 500px;
  font-size: inherit;
  min-block-size: 56px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  inline-size: 56px;
  block-size: 56px;
}
.icon-wrapper{
  display: flex;
  position: absolute;
  top: 14px;
  left: 14px;

}
.follow{
  margin-right: 24px;
  background-color: transparent;
  border: 1px solid hsla(0,0%,100%,.3);
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  line-height: 16px;
  padding: 7px 15px;
  text-align: center;
  text-transform: uppercase;
}
.others{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: transparent;
  border: 0;
  color: hsla(0,0%,100%,.6);
  fill: hsla(0,0%,100%,.6);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}
.content-spacing{
  color: #fff;
  display: flex;
  max-width: none;
  overflow: visible;
  position: relative;
  padding: 13px 32px;
  height: 40vh;
  max-height: none;
  min-height: 340px;
}
.table-header{
  border-bottom: 1px solid transparent;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 36px;
  margin: 0 -16px 8px;
  padding: 0 16px;
  position: sticky;
  z-index: 2;
  top: 64px;
}
.tag{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: end;
}
.presentation{
  contain: layout size;
  position: relative;
}
.top-sentinel{
  position: absolute;
  width: 100%;
}
.grid-arranger{
  grid-gap: 16px;
  display: grid;
  padding: 0 16px;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr);
}
.list-num{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.title-arranger{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: start;
}
.title{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  color: #a2a0a1;
  fill: #a2a0a1;
}
.titled{
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: unset;
  word-break: break-all;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
}
.album-arranger{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
.date-arranger{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: start;
}
.time-arranger{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  grid-column: last;
  justify-self: end;
}
.list-num-style{
  color: #b3b3b3;
  display: inline-block;
  height: 16px;
  min-height: 16px;
  min-width: 16px;
  position: relative;
  width: 16px;
}
.number{
  font-variant: tabular-nums;
  right: 0.25em;
  position: absolute;
  top: -4px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
}
.play-track{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: transparent;
  border: 0;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  opacity: 0;
}
.grid-arranger:hover .play-track{
  opacity: 1;
}
.list-img{
  justify-self: start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.list-img img {
  margin-right: 16px;
  background: #282828;
  flex-shrink: 0;
}
.list-name{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-column-gap: 8px;
  -moz-column-gap: 8px;
  column-gap: 8px;
  display: grid;
  grid-template:
        "title title"
        "badges subtitle"/auto 1fr;
  padding-right: 8px;
}
.track-link{
  color: #ffffff;
  text-decoration: none;
  grid-area: title;
  justify-self: start;
}
.e{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  grid-area: badges;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
}
.e-bg{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.6);
  border-radius: 2px;
  color: #121212;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 9px;
  height: 16px;
  justify-content: center;
  line-height: 10px;
  padding: 3px 5px;
  text-transform: uppercase;
}
.list-artist{
  grid-area: subtitle;
  grid-column-start: badges;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: unset;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-artist span {
  color: #b3b3b3;
  text-decoration: none;
  cursor: pointer;
}
.list-artist:hover span{
  text-decoration: underline;
}
</style>