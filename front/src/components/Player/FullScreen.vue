<template>
  <div class="npv-background-color"></div>
  <div class="background-image">
    <div class="fade-container">
      <img class="npv-img" :src="track.images[0].url" :alt="track.name">
    </div>
    <div class="image-overlay"></div>
    <div class="main-container">
      <div class="is-playing">
        <div class="is-playing-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="npv-header__logo"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.539a.498.498 0 0 1-.686.166c-1.878-1.148-4.243-1.408-7.028-.772a.499.499 0 0 1-.222-.972c3.048-.696 5.662-.396 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.322-5.428-1.705-7.972-.932a.624.624 0 1 1-.362-1.194c2.905-.882 6.517-.455 8.987 1.063a.624.624 0 0 1 .205.858zm.084-2.269C10.153 5.561 5.9 5.42 3.438 6.167a.748.748 0 1 1-.434-1.432c2.826-.857 7.523-.692 10.492 1.07a.748.748 0 0 1-.764 1.287z"></path></svg>
          <div class="is-playing-header-meta">
            <div class="is-playing-header-content-type">
              Playing from playlist
            </div>
            <div class="content-name">
              {{ track.group.name }}
            </div>
          </div>
        </div>
        <div class="is-playing-animation">
          <div class="cover-art">
            <div class="faded-container">
              <img class="cover-img" :src="track.images[0].url" :alt="track.name">
            </div>
            <div class="track-details">
              <div class="track-name">
                {{ track.name }}
              </div>
              <div class="creator-name">
                {{ track.artists[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="playback-container">
        <div class="playback-arranger">
          <div class="playback-bar">
            <div class="playback-position">
              {{ msToMin(position) }}
            </div>
            <div class="playback-progress-bar">
              <div class="spoti-progress-bar">
                <label class="hidden-visually">
                  Change The Song
                  <input type="range">
                </label>
                <div class="progress-bar-line" ref="progress" :style="{'--progress-bar-transform':progress}">
                  <div class="progress-bar-background">
                    <div @click="progressClick" class="progress-arranger">
                      <div class="progress-bg"></div>
                    </div>
                    <div class="progress-button"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="playback-duration">
              {{ msToMin(songDuration) }}
            </div>
          </div>
          <div class="playback-controls">
            <div class="btn-arranger like-btn">
              <button type="button" role="switch" class="save" @click="like(track.uri)" v-if="liked === false" >
                <svg role="img" height="24" width="24" fill="#b3b3b3" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path></svg>
              </button>
              <button type="button" role="switch" class="save" @click="removeLike(track.uri)" v-if="liked === true">
                <svg role="img" height="24" width="24" fill="#1ed760" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
              </button>
            </div>
            <div class="btn-arranger player-control">
              <button class="control-btn shuffle" @click="shuffle">
                <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M18.788 3.702a1 1 0 011.414-1.414L23.914 6l-3.712 3.712a1 1 0 11-1.414-1.414L20.086 7h-1.518a5 5 0 00-3.826 1.78l-7.346 8.73a7 7 0 01-5.356 2.494H1v-2h1.04a5 5 0 003.826-1.781l7.345-8.73A7 7 0 0118.569 5h1.518l-1.298-1.298z"></path><path d="M18.788 14.289a1 1 0 000 1.414L20.086 17h-1.518a5 5 0 01-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0018.568 19h1.518l-1.298 1.298a1 1 0 101.414 1.414L23.914 18l-3.712-3.713a1 1 0 00-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 00-3.826-1.78H1v-2h1.04A7 7 0 017.396 6.49z"></path></svg>
              </button>
              <button class="control-btn back" @click="back">
                <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M6.3 3a.7.7 0 01.7.7v6.805l11.95-6.899a.7.7 0 011.05.606v15.576a.7.7 0 01-1.05.606L7 13.495V20.3a.7.7 0 01-.7.7H4.7a.7.7 0 01-.7-.7V3.7a.7.7 0 01.7-.7h1.6z"></path></svg>
              </button>
              <button class="play" @click="play" v-if="paused === true">
                <svg role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
              </button>
              <button class="play" @click="stop" v-if="paused === false">
                <svg role="img" height="32" width="32" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
              </button>
              <button class="control-btn next" @click="next">
                <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M17.7 3a.7.7 0 00-.7.7v6.805L5.05 3.606A.7.7 0 004 4.212v15.576a.7.7 0 001.05.606L17 13.495V20.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-1.6z"></path></svg>
              </button>
              <button class="control-btn loop" @click="repeat">
                <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M6 2a5 5 0 00-5 5v8a5 5 0 005 5h1v-2H6a3 3 0 01-3-3V7a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3h-4.798l1.298-1.298a1 1 0 10-1.414-1.414L9.373 19l3.713 3.712a1 1 0 001.414-1.414L13.202 20H18a5 5 0 005-5V7a5 5 0 00-5-5H6z"></path></svg>
              </button>
            </div>
            <div class="btn-arranger volume-controls">
              <div class="volume-bar">
                <button class="volume-bar-icon" @click="mute">
                  <svg v-if="volume >= 75" fill="#b3b3b3" role="presentation" height="16" width="16"   viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>
                  <svg v-if="74 > volume  && volume > 26" fill="#b3b3b3" role="presentation" height="16" width="16"  viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg>
                  <svg v-if="volume <= 25 && volume > 6 " fill="#b3b3b3" role="presentation" height="16" width="16"   viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg>
                  <svg v-if="volume < 5" fill="#b3b3b3" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
                </button>
                <div class="volume-progress">
                  <label class="hidden-visually">
                    Change Volume
                    <input type="range">
                  </label>
                  <div class="volume-bar-arranger">
                    <div class="progress-bar-line" ref="volumeBar" :style="{'--progress-bar-transform':volume +'%'}">
                      <div class="progress-bar-background" >
                        <div class="progress-arranger" @click="volumeProgress">
                          <div class="progress-bg"></div>
                        </div>
                        <div class="progress-button"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="close-fs" @click="closeFscreen">
                <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M21.707 2.293a1 1 0 010 1.414L17.414 8h1.829a1 1 0 010 2H14V4.757a1 1 0 112 0v1.829l4.293-4.293a1 1 0 011.414 0zM2.293 21.707a1 1 0 010-1.414L6.586 16H4.757a1 1 0 010-2H10v5.243a1 1 0 01-2 0v-1.829l-4.293 4.293a1 1 0 01-1.414 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerService from "@/services/PlayerService";

export default {
  props:['fullscreen','track','liked','songDuration','position','progress','volume'], // Data comes from here client/src/components/Player/SpotifyPlayer.vue
  inheritAttrs: false,
  computed:{
    paused() {return this.$store.state.paused}
  },
  data(){
    return{
      closeFullscreen:'',
      ffStarted:'',
    }
  },
  methods:{
    closeFscreen(){
      this.closeFullscreen = false;
      document.exitFullscreen();
    },
    progressClick(){
      var progress = this.$refs.progress;
      const duraition = this.songDuration;

      progress.addEventListener('click',async function (e){
        const maxWidth = progress.clientWidth;
        const pos = e.pageX - progress.getBoundingClientRect().left;    //Get the divs width and get the clicked values percentage
        var dual = Math.round(pos/maxWidth * 100);      //Get the percentage of clicked and width of the element
        var position = (dual / 100) * duraition;       //convert value to ms for spotify api

        let positionMs = parseInt(position)
        PlayerService.setPosition(positionMs)
      },false)
    },
    msToMin(value){
      var minutes = Math.floor(value / 60000);
      var seconds = ((value % 60000) / 1000).toFixed(0);
      return (
          seconds == 60 ?
              (minutes+1) + ":00" :
              minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      );
    },
    play(){
      this.$parent.play();
    },
    volumeProgress(){
      var volumeBar = this.$refs.volumeBar;
      var max = volumeBar.clientWidth;
      const that = this;

      volumeBar.addEventListener('click',async function (e){
        var position = e.pageX - volumeBar.getBoundingClientRect().left;
        var percent = Math.round(position/max * 100);

        PlayerService.Volume(percent)
        that.$emit('volumeChanged',percent);
      })
    },
    mute(){
      this.$parent.mute();
    },
    stop(){
      this.$parent.stop();
    },
    like(uri){
      this.$parent.like(uri);
    },
    removeLike(uri){
      this.$parent.removeLike(uri);
    },
    next(){
      this.$parent.nextSong();
    },
    back(){
      this.$parent.prevSong();
    },
    repeat(){
      this.$parent.Repeat();
    },
    shuffle(){
      this.$parent.shuffle();
    }
  },
  mounted:function mounted() {
    const that = this;
    if (document.addEventListener)
    {
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
      document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }

    function exitHandler()
    {
      if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
      {
        that.closeFullscreen = false;
      }
    }
  },
  watch:{
    closeFullscreen:function (newValue){
      this.$emit('changed',newValue)
    },
    started:function (newValue){
      this.$emit('startedChanged',newValue)
    }
  },
}
</script>

<style scoped>
.npv-background-color{
  background: linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.2) 98.07%),linear-gradient(0deg,rgba(0,0,0,.1),rgba(0,0,0,.1)),transparent;
  -webkit-transition: background-color 1s ease-in-out;
  transition: background-color 1s ease-in-out;
  background-color: rgb(64, 32, 40);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}
.background-image{
  -webkit-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
  opacity: 1;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}
.fade-container{
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
}
.npv-img{
  height: 100%;
  left: 0;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}
.image-overlay{
  background-color: rgba(0,0,0,.7);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.main-container{
  -webkit-transition: background-color .5s ease-out;
  transition: background-color .5s ease-out;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
.is-playing{
  bottom: 0;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
}
.is-playing-header{
  height: 8em;
  margin: 9em 0 16em;
  padding: 0 14.5em;
  position: relative;
}
.is-playing-header svg{
  fill: #fff;
  display: inline-block;
  height: 8em;
  margin-right: 3em;
  opacity: .6;
  vertical-align: middle;
  width: 8em;
}
.is-playing-header-meta{
  color: hsla(0,0%,100%,.6);
  display: inline-block;
  max-width: 124.5em;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
}
.is-playing-header-content-type{
  font-size: 2.25em;
  letter-spacing: .1111111111em;
  line-height: 1.3333333333em;
  text-transform: uppercase;
}
.content-name{
  font-weight: 700;
  line-height: 1.3333333333em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.is-playing-animation{
  transform: translateY(-24.5em);
  transition: transform 1s cubic-bezier(.3,0,.4,1);
  bottom: -47.5em;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
}
.cover-art{
  bottom: 38em;
  height: 64em;
  left: 14em;
  opacity: 1;
  position: absolute;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left;
  width: 64em;
  -webkit-transform: scale(.34375);
  transform: scale(.34375);
  -webkit-transition: opacity .5s ease-in-out,bottom 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
  transition: opacity .5s ease-in-out,bottom 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
  transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s ease-in-out,bottom 1s cubic-bezier(.3,0,.4,1);
  transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s ease-in-out,bottom 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
}
.faded-container{
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
}
.cover-img{
  height: 100%;
  left: 0;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}
.track-details{
  bottom: 36.5em;
  font-weight: 700;
  left: 42em;
  opacity: 1;
  position: absolute;
  top: 300px;
  width: 100%;
  white-space: nowrap;
  text-align: left;
  transform: translate3d(42em,0,0);
  right: 55em;
  -webkit-transform: translate3d(42em,0,0);
  transform: translate3d(42em,0,0);
  -webkit-transition: opacity .5s cubic-bezier(.3,0,.4,1),left 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
  transition: opacity .5s cubic-bezier(.3,0,.4,1),left 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
  transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s cubic-bezier(.3,0,.4,1),left 1s cubic-bezier(.3,0,.4,1);
  transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s cubic-bezier(.3,0,.4,1),left 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
}
.track-name{
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  font-size: 8em;
  line-height: 1.25em;
}
.creator-name{
  font-size: 3em;
  line-height: 1.6666666667em;
  opacity: .7;
}
.playback-container{
  font-size: .3vw;
  height: 100vh;
  opacity: 1;
  position: relative;
  -webkit-transition: opacity .25s;
  transition: opacity .25s;
  will-change: opacity;
  z-index: 3;
}
.playback-arranger{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  bottom: 10.5em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  left: 14.5em;
  position: absolute;
  right: 14.5em;
}
.playback-bar{
  --playback-bar-grid-gap: 8px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  gap: var(--playback-bar-grid-gap);
  justify-content: space-between;
  width: 100%;
}
.playback-position{
  min-width: 40px;
  text-align: right;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
}
.playback-progress-bar{
  height: 12px;
  position: relative;
  width: 100%;
}
.playback-duration{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color:#ffffff;
}
.playback-controls{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 19.5em;
  z-index: 9;
}
.btn-arranger{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 20px;
}
.like-btn{
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.save{
  background: transparent;
  border: 0;
  color: hsla(0,0%,100%,.7);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0;
}
.player-control{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.control-btn{
  fill: #ffffff;
  --button-size: 48px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: transparent;
  border: none;
  color: hsla(0,0%,100%,.7);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: var(--button-size);
  justify-content: center;
  min-width: var(--button-size);
  position: relative;
  width: var(--button-size);
}

.active-btn {
  fill: #15c54b;
}

.active-btn:after{
  background-color: currentcolor;
  border-radius: 50%;
  bottom: 0;
  content: "";
  display: block;
  height: 4px;
  left: 50%;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 4px;
}

.play{
  --button-size: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: var(--button-size);
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: var(--button-size);
  justify-content: center;
  min-width: var(--button-size);
  position: relative;
  -webkit-transition: none 33ms cubic-bezier(.3,0,.7,1);
  transition: none 33ms cubic-bezier(.3,0,.7,1);
  -webkit-transition-property: all;
  transition-property: all;
  width: var(--button-size);
}
.volume-controls{
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.close-fs{
  background: transparent;
  border: none;
  fill: hsla(0,0%,100%,.7);
  height: 32px;
  width: 32px;
}

</style>