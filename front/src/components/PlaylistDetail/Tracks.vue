<template>
  <div :style="{'margin-left':navWidth+20+'px'}" class="ms_content_wrapper" >
    <div class="os-content">
      <div class="child-spacer"></div>
      <div class="main-que">
        <main>
          <section class="content-spacing">
            <div class="que-detail">
              <div class="mt-2"></div>
              <div class="action-bar-row mb-2">
                <div class="action-arranger">
                  <button class="play-artist">
                      <span class="encore-theme btn-inner" @click="changeSong(playlists.uri,1)">
                        <span class="icon-wrapper">
                          <svg  role="img" height="28" width="28" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path  fill="#121212" d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                        </span>
                      </span>
                  </button>
                </div>
                <button class="others">
                  <svg role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                </button>
              </div>
              <div class="grid-arranger" style="height: calc(100% - 1008);" v-for="(tracks,i) in tracks.items">
                <div class="list-num">
                  <div class="list-num-style">
                    <span class="number">
                      {{parseInt(i+1)}}
                    </span>
                    <button class="play-track" @click="changeSong(playlists.uri,parseInt(i+1))">
                      <svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                </div>
                <div class="list-img">
                  <img aria-hidden="false" draggable="false" loading="eager" :src="tracks.track.album.images[0].url" :alt="tracks.track.name" width="40" height="40">
                  <div class="list-name">
                    <div class="track-link" >{{ tracks.track.name }}</div>
                    <span class="list-artist" >
                      <span  @click="navigateTo({name:'artist',params:{artist:tracks.track.artists[0].id}})" >{{tracks.track.artists[0].name}}   </span>
                    </span>
                  </div>
                </div>
                <div class="album-arranger">
                  <div class="list-artist">
                    <span class="titled" @click="navigateTo({name:'album',params:{albumId:tracks.track.album.id}})">{{tracks.track.album.name}}</span>
                  </div>
                </div>
                <div class="date-arranger">
                  <div class="title">
                    <span class="titled">{{tracks.track.album.release_date}}</span>
                  </div>
                </div>
                <div class="time-arranger">
                  <div class="title">
                    {{millisToMinutesAndSeconds(tracks.track.duration_ms)}}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from "@/services/SpotifyService";

export default {
  props:['playlists','navWidth'],
  data(){
    return{
      offset:0,
      tracks:{
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
              id:'',
            },
            artists:[{
              name:'',
              id:''
            }]
          }
        }],
        total:'',
      }
    }
  },
  async mounted(){
    const trackId = this.$route.params.trackId
    const response = await SpotifyService.getAlbumDetail(trackId, this.offset);
    this.tracks = response.data;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods:{
    millisToMinutesAndSeconds(millis) {
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
    async handleScroll() {
      if (this.$route.name === 'playlistDetail'){          // This checks the route,by route otherwise this functions keeps runing on every page
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight ) {
          var offset = this.offset
          this.offset = offset + 25; //Adding offset cause of the backend
          const trackId = this.$route.params.trackId
          const response = await SpotifyService.getAlbumDetail(trackId, {
            offset:this.offset
          });
          for (var i = 0;i < response.data.items.length;i++){
            this.tracks.items.push(response.data.items[i])    //Loop through the old data and add new items to this.tracks.items
          }
        }
      }else{
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
    async changeSong(uri,trackNumber){
      console.log(trackNumber)
      await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
    },
  },
  watch:{
    offset:function (newValue){
      if (newValue >= this.tracks.total){
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
}
</script>

<style scoped>
:root{
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
  max-height: none;
  min-height: 340px;
  margin-bottom: 5rem;
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
  align-items: center;
  background: transparent;
  border: 0;
  color: #fff;
  fill: #ffffff;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  align-content: stretch;
  flex-direction: column;
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
.grid-arranger:hover .play-track{
  opacity: 1;
  pointer-events: auto;
}
.grid-arranger:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.3s;
}
.grid-arranger:hover .play-track{
  opacity: 1;
}
.grid-arranger:hover .number{
  opacity: 0;
}

</style>