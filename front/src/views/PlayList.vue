<template>
  <div class="ms_content_wrapper" :style="{'margin-left':navWidth+20+'px'}">
    <div class="root">
      <div class="top-container">
        <div class="root-main-view">
          <div class="main-view-container">
            <div class="under-main-view">
            </div>
            <div class="horizontal-hidden">
              <div class="resize-observer">
                <div class="observed"></div>
              </div>
              <div class="os-padding">
                <div class="viewport">
                  <div class="os-content">
                    <div class="child-spacer"></div>
                    <div class="main-view-container__scroll-node-child">
                      <main tabindex="-1" aria-label="Name">
                        <section class="artist-page">
                          <div class="playlist-header">
                            <h1>Playlists</h1>
                          </div>
                          <PlaylistsLoader v-if="loading === true"/>
                          <div class="grid-container" v-if="loading === false" :style="'--column-count:'+columnCount+';--column-width:'+columnWidth+'px;--grid-gap:'+gridGap+'px;'">
                            <div class="liked-songs" @click="goToLike()">
                              <div class="liked-arranger">
                                <div class="songs">
                                  <div class="song-grid">
                                    <span v-for="fav in liked.items.slice(0,7)">
                                      <span class="empty"> • </span>
                                      <span>{{fav.track.name}}</span>
                                      <span class="empty">
                                        {{ fav.track.album.name }}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div class="user">
                                  <a href="#">
                                    <div class="liked-song-header">
                                      Liked Tracks
                                    </div>
                                  </a>
                                  <div class="total-likes">
                                    <div class="total">{{ liked.total }} Liked Tracks</div>
                                  </div>
                                </div>
                                <div class="play-liked">
                                  <div class="shrink">
                                    <button class="play-liked-btn">
                                      <span class="colors">
                                        <span class="btn-wrapper">
                                          <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 eqtHWV"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                        </span>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div class="hidden"></div>
                              </div>
                            </div>
                            <div class="playlists" v-for="list in playlists">
                              <div class="playlists-height" @click="navigateTo({name:'playlistDetail',params:{trackId:list.id}})">
                                <div class="playlist-img">
                                  <div class="card-image">
                                    <img :src="list.images.url || list.images[0].url" :alt="list.name">
                                    <div class="play-liked play-playlist">
                                      <div class="shrink">
                                        <button class="play-liked-btn" @click="changeSong(list.uri,1)">
                                          <span class="colors">
                                            <span class="btn-wrapper">
                                              <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 eqtHWV"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                            </span>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="playlist-name">
                                  <a href="#">
                                    <div class="name">
                                      {{list.name}}
                                    </div>
                                  </a>
                                  <div class="creator">
                                    {{list.owner.display_name}}
                                  </div>
                                </div>
                                <div class="card-click-handler"></div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </main>
                    </div>
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
import PlaylistsLoader from "@/components/Loaders/PlaylistsLoader";

export default {
  components: {PlaylistsLoader},
  props:['navWidth'],
  data(){
    return{
      loading:false,
      playlists:[
        {
          description: '',
          name: '',
          images: [{
            url:''
          }],
          id:'',
          owner: '',
          tracks: '',
          uri:'',
        }
      ],
      liked:{
        items:[{
          track:{
            album:{
              images:[{
                url:''
              }],
              name:'',
              release_date:''
            },
            duration_ms:'',
            track_number:'',
            uri:'',
            name:''
          }
        }],
        total:'',
      },
      columnCount:7,
      columnWidth:188,
      gridGap:24
    }
  },
  methods:{
    navigateTo(route){
      this.$router.push(route)
    },
    goToLike(){
      this.$router.push({name:'liked'})
    },
    async changeSong(uri,trackNumber){
      const response = await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
      console.log('response',response)
    },
  },
  async mounted() {
    this.loading = true;
    const response = (await SpotifyService.SpotiPlayLiST()).data
    this.playlists = response;
    const liked = await SpotifyService.getFavorite()
    this.liked = liked.data
    this.loading = false;
  },
  watch: {
    navWidth(newValue) {
      if (newValue <= 175) {
        this.columnCount = 8;
        this.columnWidth = 194
      }else {
        this.columnCount=7;
        this.columnWidth=188;
        this.gridGap=24;
      }
    },
  }
}
</script>

<style scoped>
:root{
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
}
.ms_content_wrapper{
  padding-top: 64px !important;
  margin-left: 264px;
  margin-right: 15px !important;
}
.root{
  height: 100%;
  position: relative;
  --background-base: #121212;
  --background-highlight: #1a1a1a;
  --background-press: #000;
  --background-elevated-base: #242424;
  --background-elevated-highlight: #2a2a2a;
  --background-elevated-press: #000;
  --background-tinted-base: hsla(0,0%,100%,.07);
  --background-tinted-highlight: hsla(0,0%,100%,.1);
  --background-tinted-press: hsla(0,0%,100%,.04);
  --background-unsafe-for-small-text-base: #121212;
  --background-unsafe-for-small-text-highlight: #121212;
  --background-unsafe-for-small-text-press: #121212;
  --text-base: #fff;
  --text-subdued: #a7a7a7;
  --text-bright-accent: #1ed760;
  --text-negative: #f15e6c;
  --text-warning: #ffa42b;
  --text-positive: #1ed760;
  --text-announcement: #3d91f4;
  --essential-base: #fff;
  --essential-subdued: #727272;
  --essential-bright-accent: #1ed760;
  --essential-negative: #e91429;
  --essential-warning: #ffa42b;
  --essential-positive: #1ed760;
  --essential-announcement: #0d72ea;
  --decorative-base: #fff;
  --decorative-subdued: #292929;
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
}
main{
  padding-bottom: 5rem;
}
.top-container{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 100%;
  position: relative;
  width: 100%;
  grid-template-areas:
        "top-bar top-bar"
        "nav-bar main-view"
        "now-playing-bar now-playing-bar";
}
.root-main-view{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  grid-area: main-view;
  min-height: 0;
  position: relative;
  width: 100%;
}
.main-view-container{
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-height: 0;
  position: relative;
}
.horizontal-hidden{
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
  overflow: visible !important;
  position: relative;
  height: 100%;
}
.artist-arranger{
  position: relative;
  padding-bottom: 3rem;
  width: 100%;
}
.artist-bg-img{
  -webkit-animation: background-animation 1s linear;
  animation: background-animation 1s linear;
  -webkit-animation-delay: calc(var(--scroll)*-1s);
  animation-delay: calc(var(--scroll)*-1s);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  opacity: 1;
  background-attachment: scroll;
  background-position: 50% 35%;
  background-repeat: no-repeat;
  background-size: cover;
  contain: strict;
  content-visibility: auto;
  height: 40vh;
  min-height: 340px;
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.artist-bg{
  --bgColor: #535353;
  background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise);
  background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),var(--background-noise);
  contain: strict;
  content-visibility: auto;
  height: 40vh;
  min-height: 340px;
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.artist-bg:after{
  -webkit-animation: overlay-animation 1s linear;
  animation: overlay-animation 1s linear;
  -webkit-animation-delay: calc(var(--scroll)*-1s);
  animation-delay: calc(var(--scroll)*-1s);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.6)),to(rgba(0,0,0,.6))),-webkit-gradient(linear,left top,left bottom,from(var(--bgColor)),to(var(--bgColor)));
  background-image: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),linear-gradient(var(--bgColor),var(--bgColor));
  content: "";
  height: 40vh;
  left: 0;
  min-height: 340px;
  opacity: 0;
  position: absolute;
  right: 0;
}
.resize-observer{
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
  border: inherit;
  border-color: transparent;
  border-style: solid;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: inherit;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
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
.observed{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  left: 0px;
  right: auto;
  overflow: visible;
  pointer-events: none;
  top: 0;
  visibility: hidden;
  z-index: -1;
  height: 200%;
  margin: 0;
  padding: inherit;
  width: 200%;
}
.observed:before{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  border: inherit;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: "";
  margin: 0;
  padding: inherit;
}
.os-padding{
  bottom: 0;
  direction: inherit;
  height: auto!important;
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto!important;
  z-index: 0;
  overflow: visible;
}
.viewport{
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
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
}
.os-content{
  position: relative;
  visibility: visible;
  padding: 0px;
  height: 100%;
  width: 100%;
  direction: inherit;
  display: block;
}
.os-content::before{
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
.child-spacer{
  position: sticky;
  top: 0;
}
.main-view-container__scroll-node-child{
  min-height: calc(((100vh - 64px) - 90px) - 519px);
  scroll-behavior: smooth;
  isolation: isolate;
  padding-bottom: 32px;
}
.artist-page{
  display: block;
}
.artist-page-start{
  margin-top: -64px;
}
.playlist-header{
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -ms-flex-line-pack: justify;
  align-content: space-between;
  align-items: center;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
.playlist-header h1 {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
}
.grid-container{
  grid-gap: var(--grid-gap);
  display: grid;
  grid-template-columns: repeat(var(--column-count),minmax(0,1fr));
  grid-auto-rows: 1fr;
}
.liked-songs{
  color: #fff;
  font-size: 1rem;
  grid-column: span 2;
  height: inherit;
  --card-container-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  -webkit-box-flex: 1;
  background: linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%);
  border-radius: calc(var(--card-container-border-radius) + 2px);
  -ms-flex: 1;
  flex: 1;
  isolation: isolate;
  padding: 20px;
  position: relative;
  -webkit-transition: background-color .3s ease;
  transition: background-color .3s ease;
  width: 100%;
}
.liked-arranger{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}
.songs{
  -webkit-box-flex: 1;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  margin-bottom: 12px;
}
.song-grid{
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  max-height: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  width: 100%;
}
.empty{
  opacity: 0.7;
}
.empty::before{
  content: '';
}
.user{
  min-height: 62px;
}
.user a {
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  color: #fff;
  text-decoration: none;
}
.liked-song-header{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  padding-block-end: 4px;
  color: inherit;
}
.total-likes{
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
}
.total{
  color: #fff;
  font-size: 1rem;
  text-transform: lowercase;
}
.play-liked{
  right: 20px;
  border-radius: 500px;
  bottom: 20px;
  -webkit-box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
  box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  -webkit-transform: translateY(8px);
  transform: translateY(8px);
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  z-index: 2;
}
.liked-songs:hover .play-liked{
  opacity: 1;
  pointer-events: auto;
  position: absolute;
}
.shrink{
  flex-shrink: 0;
}
.play-liked-btn{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
  display: inline-block;
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
  position: relative;
  z-index: 1;
}
.colors{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  background-color: var(--essential-bright-accent,#1ed760);
  color: var(--text-base,#000000);
  display: flex;
  border-radius: 500px;
  font-size: inherit;
  min-block-size: 48px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  inline-size: 48px;
  block-size: 48px;
}
.btn-wrapper{
  display: flex;
  position: absolute;
  top: 12px;
  left: 12px;
}
.hidden{
  position: absolute;
  z-index: 0;
  bottom: 0;
  content: "";
  cursor: pointer;
  left: 0;
  overflow: hidden;
  right: 0;
  text-indent: 100%;
  top: 0;
  white-space: nowrap;
}
.hidden:hover{
  cursor: pointer;
}
.playlists{
  --card-container-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  -webkit-box-flex: 1;
  background: #181818;
  border-radius: calc(var(--card-container-border-radius) + 2px);
  -ms-flex: 1;
  flex: 1;
  isolation: isolate;
  padding: 16px;
  position: relative;
  -webkit-transition: background-color .3s ease;
  transition: background-color .3s ease;
  width: 100%;
}
.playlists-height{
  height: 100%;
}
.playlist-img{
  margin-bottom: 16px;
  position: relative;
}
.card-image{
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  background-color: var(--card-color,#333);
  border-radius: var(--card-image-border-radius);
  -webkit-box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  padding-bottom: 100%;
  position: relative;
  width: 100%;
}
.card-image img{
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  border-radius: var(--card-image-border-radius);
  display: block;
  -webkit-animation: imageFadeInAnimation .25s ease;
  animation: imageFadeInAnimation .25s ease;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
.play-playlist{
  right: 0;
  bottom: 0;
}
.playlist-name{
  min-height: 62px;
}
.playlist-name a {
  position: relative;
  z-index: 1;
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  text-decoration: none;
  color: #ffffff;
}
.name{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.creator{
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
  font-size: 0.875rem;
}
.card-click-handler{
  bottom: 0;
  content: "";
  cursor: pointer;
  left: 0;
  overflow: hidden;
  right: 0;
  text-indent: 100%;
  top: 0;
  white-space: nowrap;
  position: absolute;
  z-index: 0;
}
.card-click-handler:hover{
  cursor: pointer;
}
.playlists:hover .play-playlist{
  opacity: 1;
}
</style>