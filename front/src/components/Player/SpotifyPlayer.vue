<template>
  <div class="ms_player_wrapper" >
    <div class="added-playlist" v-if="addedToPlaylist.added">
      {{this.addedToPlaylist.added}}
    </div>
    <div class="added-playlist" v-if="removeDfromList.removed">
      {{this.removeDfromList.removed}}
    </div>
    <div class="player-details" >
      <div class="player-left">
        <div class="now-playing">
          <div class="playing-img" v-if="expanded.value === false || expanded.value === ''">
            <div class="player-img-arranger">
              <div class="now-playing-img">
                <img :src="track.images[0].url" :alt="track.name">
              </div>
            </div>
            <button class="expand" @click="expand">
              <svg role="img" fill="#ffffff" height="16" width="16" viewBox="0 0 16 16" ><path d="M.47 11.03a.75.75 0 001.06 0L8 4.56l6.47 6.47a.75.75 0 101.06-1.06L8 2.44.47 9.97a.75.75 0 000 1.06z"></path></svg>
            </button>
          </div>
        </div>
        <div class="track-detail">
          <div class="track-name">
            {{track.name}}
          </div>
          <div class="goto-artist" v-if="track.artists.length > 1" >
            <span v-for="artist in track.artists" @click="navigateTo(({name:'artist',params:{artist:artist.url.split('/').pop()}}))" >{{artist.name}}</span>
          </div>
          <div class="goto-artist" v-if="track.artists.length < 2" >
            <span @click="navigateTo(({name:'artist',params:{artist:track.artists[0].url.split('/').pop()}}))" >{{track.artists[0].name}}</span>
          </div>
        </div>
        <div class="icons" v-if="liked === false" @click="like(track.uri)">
          <svg role="img" fill="#a7a7a7" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG">
            <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
          </svg>
        </div>
        <div class="icons" v-if="liked === true"  @click="removeLike(track.uri)">
            <svg role="img" height="16" width="16" fill="#1ed760" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
        </div>
      </div>
      <div class="player-center">
        <div class="player-items">
          <div class="player-controls">
            <div class="player-controls-left">
              <button class="shuffle"  @click="shuffle(); shuffled = !shuffled">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" :style="[shuffled === true ?{'fill':'#1ed760'}:{'fill':'#ffffff'}]" class="Svg-ytk21e-0 jAKAlG"><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"></path><path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"></path></svg>
              </button>
              <button class="back" @click="prevSong">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path></svg>
              </button>
            </div>
            <button class="play" @click="play" v-if="paused === true">
              <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>
            </button>
            <button class="play" @click="stop" v-if="paused === false">
              <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>            </button>
            <div class="player-controls-right">
              <button class="next" aria-label="next" @click="nextSong">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path></svg>
              </button>
              <button class="repeat" aria-label="repeat" @click="Repeat">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path></svg>
              </button>
            </div>
          </div>
          <div class="playback-bar">
            <div class="start" > {{ millisToMinutesAndSeconds(getPosition) }}</div>
            <div class="spoti-progress-bar">
              <label class="hidden-visually">
                Change The Song
                <input type="range">
              </label>
              <div class="progress-bar-line" ref="progress" :style="{'--progress-bar-transform':progress}">
                <div class="progress-bar-background" >
                  <div @click="progressClick" class="progress-arranger">
                    <div class="progress-bg"></div>
                  </div>
                  <div class="progress-button"></div>
                </div>
              </div>
            </div>
            <div class="duration">{{millisToMinutesAndSeconds(songDuration)}}</div>
          </div>
        </div>
      </div>
      <div class="player-right">
        <div class="right-icons">
          <div class="que-button">
            <div class="que" v-if="this.$route.name !== 'que'">
              <button class="que-btn" @click="navigateTo({name:'que'})" data-testid="control-button-queue" aria-label="Sıraya Ekle" aria-expanded="false">
                <span aria-hidden="true" class="icon-wrapper">
                  <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG">
                    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="que" v-if="this.$route.name === 'que'">
              <button class="que-btn active-que" @click="$router.go(-1)" data-testid="control-button-queue" aria-label="Sıraya Ekle" aria-expanded="false">
                <span aria-hidden="true" class="icon-wrapper">
                  <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG">
                    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
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
                  <div class="progress-bar-line" ref="volumeBar"  :style="{'--progress-bar-transform':volume +'%'}">
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
          <button class="que-btn" @click="fullScreen">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG">
              <path d="M6.53 9.47a.75.75 0 010 1.06l-2.72 2.72h1.018a.75.75 0 010 1.5H1.25v-3.579a.75.75 0 011.5 0v1.018l2.72-2.72a.75.75 0 011.06 0zm2.94-2.94a.75.75 0 010-1.06l2.72-2.72h-1.018a.75.75 0 110-1.5h3.578v3.579a.75.75 0 01-1.5 0V3.81l-2.72 2.72a.75.75 0 01-1.06 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div ref="fullscreen">
    <FullScreen  @changed="checkFullScreen" @volumeChanged="checkVolume" @startedChanged="checkPauseCondition" :volume="volume" :progress="progress" :songDuration="songDuration" :position="getPosition" :track="track" :fullscreen="fullscreen" :liked="liked" v-if="show === true"/>
  </div>
</template>
<script>
import PlayerService from "@/services/PlayerService";
import FullScreen from "@/components/Player/FullScreen";
import SpotifyService from "@/services/SpotifyService";



export default {
  props:[
      'playing',
  ],
  inheritAttrs: false,
  components: {
      FullScreen,
  },
  data(){
    return{
      openQueue:false,
      liked:false,
      getPosition:null,
      shuffled:false,
      fullscreen: false,
      show:false,
      progress:'',
      currentPosition:'',
      volume:100,
      expanded:{
        value:'',
        img:''
      },
      token:'',
      started:false,
      addedToPlaylist:{
        added:''
      },
      removeDfromList: {
        removed:''
      },
      que:false,
    }
  },
  computed: {
    track() { return this.$store.state.track },
    songDuration() {return this.$store.state.songDuration},
    position() {return this.$store.state.position},
    paused() {return this.$store.state.paused}
  },
  mounted() {
    this.getPosition = this.position;
  },
  methods:{
    navigateTo(route){
      this.$router.push(route)
    },
    expand(){
      this.expanded.value = true;
      this.expanded.img = this.track.images[0].url;
    },
    fullScreen() {
      this.show = true;
      this.$refs.fullscreen.requestFullscreen();
    },
    // checking fullscreen and play pause from fullscreen.vue
    checkFullScreen(newValue){
      this.show = newValue;
    },
    checkPauseCondition(value){
      this.started = value
    },
    checkVolume(value){
      this.volume = value
    },
    //Counts the track position its way to much better than spaming spotify api
    countDownTimer(position,duration){
      if (this.paused === false) {
        if (duration > position) {
          setTimeout(() => {
            this.getPosition += 1000
            this.progressBar(this.getPosition, duration)
            this.countDownTimer(this.getPosition, duration)
          },1000)
        }
      }
    },
    progressBar(position,duration){
      var percentage = (position * 100) / duration;
      this.progress = parseInt(percentage.toString().slice(0,2))+ '%';
    },
    async progressClick(e){
      var progress = this.$refs.progress;
      const duraition = this.$store.state.songDuration;

      const maxWidth = progress.clientWidth;
      const pos = e.pageX - progress.getBoundingClientRect().left;    //Get the divs width and  the extract from clicked values percentage
      var dual = Math.round(pos/maxWidth * 100);      //Get the percentage of clicked and width of the space
      var position = (dual / 100) * duraition;       //convert value to ms for spotify api
      this.getPosition = position

      let positionMs = parseInt(position)
      await PlayerService.setPosition(positionMs)
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
    volumeProgress(){
      var volumeBar = this.$refs.volumeBar;
      var max = volumeBar.clientWidth;
      const that = this

      volumeBar.addEventListener('click',async function (e){
        var position = e.pageX - volumeBar.getBoundingClientRect().left;
        var percent = parseInt(position)
        console.log(percent)
        if (percent >= 90 ){
          percent = 100
        }
        that.volume = percent;
      })
    },
    //Player Controls
    async play(){
      await PlayerService.Play();
    },
    async stop(){
      await PlayerService.Pause();
    },
    async mute(){
      this.volume = 0
      await PlayerService.Volume(0)
    },
    async like(track){
      this.liked = true;
      const response = await PlayerService.Like({track})
      this.addedToPlaylist = response.data;
      setTimeout(() => this.addedToPlaylist = '', 5000)
    },
    async removeLike(track){
      this.liked = false;
      const response = await PlayerService.RemoveLike({track})
      this.removeDfromList = response.data;
      setTimeout(() => this.removeDfromList = '',5000)
    },
    async nextSong(){
      await PlayerService.SkipToNext();
    },
    async prevSong(){
      await PlayerService.SkipToPrevious();
    },
    async Repeat(){
      await PlayerService.Repeat();
    },
    async shuffle(){
      await PlayerService.Shuffle()
    },
  },
  watch:{
    expanded:{
      handler  (newValue){
        this.$emit('expanded',newValue)
      },
      deep:true
    },
    track:{
      handler(newValue){
        this.track = newValue
      }
    },
    position:{
      handler(newValue){
        this.getPosition = newValue;
      }
    },
    volume:{
       handler(newValue){
        console.log('new value is'+newValue)
         PlayerService.Volume(newValue)
      }
    },
    // Watching users current play or pause situation for progressBar
    paused:{
      handler(newValue){
        if (newValue === false){
          this.countDownTimer(this.position,this.songDuration)
        }else {
          this.getPosition = this.position;
        }
      }
    },
    getPosition:{
      handler(newValue){
        this.progressBar(newValue,this.songDuration)
      }
    }
  },
}
</script>
<style>
.ms_player_wrapper {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  background-color: #000000;
  border-top: 1px solid #282828;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: auto;
  min-width: 620px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: fixed;
  z-index: 9999;
  width: 100%;
  bottom: 0;
}
.player-details {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 90px;
  justify-content: space-between;
  padding: 0 16px;
}
.player-left{
  min-width: 180px;
  width: 30%;
  display: flex;
  align-items: center;
}
.player-center{
  max-width: 722px;
  width: 40%;
}
.player-right{
  -webkit-box-orient: horizontal;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  -ms-flex-direction: row;
  flex-direction: row;
  justify-content: flex-end;
  min-width: 180px;
  width: 30%;
}
.now-playing{
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transition: -webkit-transform .25s cubic-bezier(.3,0,0,1);
  transition: -webkit-transform .25s cubic-bezier(.3,0,0,1);
  transition: transform .25s cubic-bezier(.3,0,0,1);
  transition: transform .25s cubic-bezier(.3,0,0,1),-webkit-transform .25s cubic-bezier(.3,0,0,1);
}
.playing-img{
  -webkit-transform: translateX(-8px);
  transform: translateX(-8px);
  isolation: isolate;
  position: relative;
}
.player-img-arranger{
  background-color: #282828;
  border: 0;
  display: block;
  margin: 0;
  position: relative;
  z-index: 0;
  width: 56px;
  height: 56px;
  cursor: pointer;
}
.now-playing-img img {
  width: 100%;
}
.expand{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: rgba(0,0,0,.7);
  border-radius: 500px;
  border-width: 0;
  color: #b3b3b3;
  display: flex;
  height: 24px;
  justify-content: center;
  line-height: 24px;
  padding: 0;
  position: absolute;
  top: 2px;
  width: 24px;
  z-index: 1;
  right: 2px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}
.playing-img:hover .expand{
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;
}
.reverse svg{
  transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -webkit-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -moz-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -o-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -ms-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
}
.track-name {
  color: #ffffff;
}
.track-detail {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-detail .goto-artist {
  cursor: pointer;
  color: #b3b3b3;
  text-decoration: none;
}

.goto-artist span {
  margin-left: 5px;
}
.goto-artist span:hover {
  text-decoration: underline;
}
.goto-artist span:not(:last-child)::after {
  content: ',';
}
.icons{
  margin-left: 2rem;
  cursor: pointer;
  transition: 0.3s;
  fill: #b3b3b3;
}

.icons:hover{
  fill: #ffffff;
  transition: 0.3s;
}
.player-items{
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-content: center;
}
.player-controls{
  webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  width: 100%;
  gap: 16px;
  margin-bottom: 8px;
}
.player-controls-left{
  -webkit-box-flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  gap: 8px;
  justify-content: flex-end;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
}
.player-controls-right{
  -webkit-box-flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  gap: 8px;
}
.player-controls-right button{
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
  height: 32px;
  justify-content: center;
  min-width: 32px;
  position: relative;
  width: 32px;
}
.player-controls-left button{
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
  height: 32px;
  justify-content: center;
  min-width: 32px;
  position: relative;
  width: 32px;
}
.player-controls-left button svg{
  fill: #b3b3b3;
}
.player-controls-right button svg{
  fill: #b3b3b3;
}
.play{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 32px;
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 32px;
  justify-content: center;
  min-width: 32px;
  position: relative;
  -webkit-transition: none 33ms cubic-bezier(.3,0,.7,1);
  transition: none 33ms cubic-bezier(.3,0,.7,1);
  -webkit-transition-property: all;
  transition-property: all;
  width: 32px;
}
.play svg{
  fill: #121212;
}
.start{
  color: #a7a7a7;
  margin-right: 5px;
}
.duration{
  color: #a7a7a7;
  margin-left: 5px;
}
.spoti-progress-bar{
  height: 12px;
  position: relative;
  width: 100%;
}
.hidden-visually{
  clip: rect(0 0 0 0);
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.progress-bar-line{
  --bg-color: hsla(0,0%,100%,.3);
  --fg-color: #fff;
  --is-active-fg-color: #1db954;
  --progress-bar-transform: 0%;
  --progress-bar-height: 4px;
  --progress-bar-radius: calc(var(--progress-bar-height)/2);
  height: 100%;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  width: 100%;
  cursor: pointer;
}
.progress-bar-line:hover .progress-button{
  display: block;
  transition: 0.3s;
}
.progress-bar-line:hover .progress-bg{
  background-color: #15c54b;
  transition: 0.3s;
}
.progress-bar-background{
  background-color: var(--bg-color);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-radius: calc(4px/2);
  height: 4px;
  width: 100%;
}
.progress-arranger{
  overflow: hidden;
  width: 100%;
  height: 4px;
  border-radius: 4px;
}
.progress-bg{
  background-color: #ffffff;
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  -webkit-transform: translateX(calc(-100% + var(--progress-bar-transform)));
  transform: translateX(calc(-100% + var(--progress-bar-transform)));
  width: 100%;
}
.progress-button{
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  display: none;
  height: 12px;
  left: var(--progress-bar-transform);
  margin-left: -6px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 12px;
  z-index: 100;
  transition: 0.3s;
}
.playback-bar{
  display: flex;
  width: 100%;
  align-items: baseline;
}
.right-icons{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
}
.que{
  position: relative;
}
.que-btn{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
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
  color: #a7a7a7;
  min-inline-size: 0px;
  padding-block: 8px;
  min-block-size: 32px;
  padding-inline: 8px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.que-btn svg{
  fill: #b3b3b3;
  transition: 0.3s;
}
.que-btn svg:hover {
 fill: #ffffff;
  transition: 0.3s;
}
.icon-wrapper{
  display: flex;
}
.icon-wrapper svg{
  fill: #b3b3b3;
}
.volume-bar{
  margin-right: 8px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-flex: 0;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 1 125px;
  flex: 0 1 125px;
}
.volume-bar-icon{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: hsla(0,0%,100%,.7);
  height: 32px;
  min-width: 32px;
  width: 32px;
}
.volume-progress{
  height: 12px;
  position: relative;
  width: 100%;
}
.volume-bar-arranger{
  --bg-color: hsla(0,0%,100%,.3);
  --fg-color: #fff;
  --is-active-fg-color: #1db954;
  --progress-bar-transform: 100%;
  --progress-bar-height: 4px;
  --progress-bar-radius: calc(var(--progress-bar-height)/2);
  height: 100%;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  width: 100%;
}
.volume-bar-detail{
  background-color: var(--bg-color);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  width: 100%;
}
.progress-active{
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  display: none;
  height: 12px;
  left: var(--progress-bar-transform);
  margin-left: -6px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 12px;
  z-index: 100;
}
.volume-hidden{
  overflow: hidden;
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
}
.get-width{
  background-color: var(--fg-color);
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  -webkit-transform: translateX(calc(-100% + var(--progress-bar-transform)));
  transform: translateX(calc(-100% + var(--progress-bar-transform)));
  width: 100%;
}
.added-playlist{
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  top: -40px;
  background: #2e77d0;
  padding: 6px 0px 6px 1px;
  display: flex;
  justify-content: center;
  color: #ffffff;
  border-radius: 10px;
}
.active-que .icon-wrapper svg{
  fill: #1ed760;
}
</style>