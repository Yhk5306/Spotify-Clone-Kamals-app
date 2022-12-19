<template>
  <div class="grid-container pt-3" v-if="topTracks.tracks.length > 0">
    <div class="popular">
      <h2>Popular</h2>
      <div class="popular-tracks">
        <div class="presentation" v-bind:style="[see === 10 ?{'height':'540px'} :{'height':'300px'}]">
          <div class="top-sentinel">
            <div class="grid-arranger pt-1 pb-1" v-for="(mostTracks,i) in topTracks.tracks.slice(0,see)">
              <div class="track-btn" @click="changeSong(mostTracks.album.uri,mostTracks.track_number);">
                <div class="track-info">
                  <span class="track-number">{{i+1}}</span>
                  <button class="play-track">
                    <svg role="img" height="24" width="24" class="Svg-ytk21e-0 jAKAlG UIBT7E6ZYMcSDl1KL62g" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                  </button>
                </div>
              </div>
              <div class="track-img">
                <img :src="mostTracks.album.images[0].url || mostTracks.album.images.url" :alt="mostTracks.name" width="40" height="40">
                <div class="track-name">
                  <div class="track-name-style">
                    {{ mostTracks.name }}
                  </div>
                </div>
              </div>
              <div class="track-listened">
                <div class="listener-count">{{ mostTracks.album.release_date.split("-").reverse().join("-") }}</div>
              </div>
              <div class="track-duration">
                <div class="duration">
                  {{millisToMinutesAndSeconds(mostTracks.duration_ms)}}
                </div>
              </div>
            </div>
            <div v-if="topTracks.tracks.length > 5">
              <button class="see-more" v-if="see === 5" @click="seeMore">
                <div class="see">See more</div>
              </button>
              <button class="see-more" v-if="see === 10" @click="seeLess">
                <div class="see">See less</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid-container pt-3" v-if="topTracks.tracks.length <= 0 ">
    <h2>No Tracks Found</h2>
  </div>
</template>

<script>
import ArtistService from "@/services/ArtistService";


export default {
  props:[
      'artist',
      'songs',
  ],
  data(){
    return{
      topTracks:{
        tracks:[{
          type:'',
          name:'',
          track_number:'',
          duration_ms:'',
          album:{
            images:[{
              url:''
            }],
            id:'',
            release_date:'',
            uri:''
          }
        }]
      },
      see:5,
    }
  },
  methods:{
    seeMore(){
      this.see = 10;
    },
    seeLess(){
      this.see = 5;
    },
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return (
          seconds == 60 ?
              (minutes+1) + ":00" :
              minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      );
    },
    // change song function at client/src/views/ArtistDetail.vue
    changeSong(uri,trackNumber) {
      this.$parent.changeSong(uri, trackNumber)
    }
  },
  async mounted() {
    this.topTracks = (await ArtistService.getArtistTop(this.$route.params.artist)).data
  }
}
</script>

<style scoped>
.grid-container{
  --column-width: 203px;
  --column-count: 6;
  --grid-gap: 24px;
  grid-gap: var(--grid-gap);
  display: grid;
  grid-template-columns: repeat(var(--column-count),minmax(0,1fr));
  width: 100%;
}
.popular{
  --column-count: 6;
  grid-column: span min(var(--column-count),6);
}
.popular h2 {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-base,#000000);
  margin: 0 0 20px;
}
.popular-tracks{
  border: 1px solid transparent;
  border-radius: 4px;
  outline: 0;
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
  grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(120px,1fr);
  grid-gap: 16px;
  display: grid;
  padding: 0 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 4px;
}
.grid-arranger:hover .play-track{
  opacity: 1;
}
.grid-arranger:hover .track-number{
  opacity: 0;
}
.track-btn{
  justify-self: end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.track-info{
  color: #b3b3b3;
  display: inline-block;
  height: 16px;
  min-height: 16px;
  min-width: 16px;
  position: relative;
  width: 16px;
}
.track-number{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
  position: absolute;
  top: -4px;
}
.grid-arranger:hover .play-track{
  opacity: 1;
  pointer-events: auto;
}
.grid-arranger:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.3s;
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
.track-img{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: start;
}
.track-img img {
  margin-right: 16px;
}
.track-name{
  padding-right: 8px;
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
}
.track-name-style{
  grid-area: title;
  justify-self: start;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-base,#000000);
}
.track-listened{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: start;
}
.listener-count{
  font-feature-settings: "ss05" on;
  text-align: right;
  width: 11ch;
  font-size: 0.875rem;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
}
.track-duration{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  grid-column: last;
  justify-self: end;
}
.duration{
  font-size: 0.875rem;
  margin-right: 16px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
}
.see-more{
  background: none;
  border: none;
  color: hsla(0,0%,100%,.7);
  padding: 16px;
}

.see{
  font-size: 0.75rem;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
  cursor: pointer;
  transition: 0.3s;
}
.see:hover{
  color: #ffffff;
  transition: 0.3s;
}
</style>