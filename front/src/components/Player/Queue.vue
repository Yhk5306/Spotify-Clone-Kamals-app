<template>
  <div :style="{'margin-left':navWidth+20+'px'}" class="ms_content_wrapper" >
    <div class="os-content">
      <div class="child-spacer"></div>
      <div class="main-que">
        <main>
          <section class="content-spacing">
            <div class="que-detail">
              <h1>Now Playing</h1>
              <div class="grid-arranger">
                <div class="list-num">
                  <div class="list-num-style">
                    <span class="number active-track">
                     <img  width="14" height="14" alt="" src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif">
                    </span>
                  </div>
                </div>
                <div class="list-img">
                  <img aria-hidden="false" draggable="false" loading="eager" :src="track.images[0].url" :alt="track.name" width="40" height="40">
                  <div class="list-name">
                    <div class="track-link active-track" >{{ track.name }}</div>
                    <span class="list-artist" v-for="artists in track.artists.slice(0, 2)">
                      <span @click="navigateTo({name:'artist',params:{artist:getId(artists.uri)}})" >{{artists.name}} </span>
                    </span>
                  </div>
                </div>
                <div class="album-arranger">
                  <div class="title">
                    <span class="titled navigate" >{{track.group.name}}</span>
                  </div>
                </div>
                <div class="time-arranger">
                  <div class="title">
                    {{millisToMinutesAndSeconds(track.estimated_duration)}}
                  </div>
                </div>
              </div>
              <div class="mt-2"></div>
              <h1>On Que</h1>
              <QueueLoader v-if="loading === true"/>
              <div v-if="loading === false" class="grid-arranger on-queue" style="height: calc(100% - 1008);" v-for="(queue,i) in currentQue.queue">
                <div class="list-num">
                  <div class="list-num-style">
                    <span class="number">
                      {{parseInt(i+2)}}
                    </span>
                    <button class="play-track">
                      <svg role="img" height="32" width="32" class="Svg-ytk21e-0 jAKAlG UIBT7E6ZYMcSDl1KL62g" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                </div>
                <div class="list-img">
                  <img aria-hidden="false" draggable="false" loading="eager" :src="queue.album.images[0].url" :alt="queue.name" width="40" height="40">
                  <div class="list-name">
                    <div class="track-link" >{{ queue.name }}</div>
                    <span class="list-artist" v-for="artists in queue.artists.slice(0, 2)">
                      <span @click="navigateTo({name:'artist',params:{artist:artists.id}})" >{{artists.name}} </span>
                    </span>
                  </div>
                </div>
                <div class="album-arranger">
                  <div class="title">
                    <span class="titled navigate" @click="navigateTo({name:'album',params:{albumId:queue.album.id}})">{{queue.album.name}}</span>
                  </div>
                </div>
                <div class="date-arranger">
                  <div class="title">
                    <span class="titled">{{queue.album.release_date}}</span>
                  </div>
                </div>
                <div class="time-arranger">
                  <div class="title">
                    {{millisToMinutesAndSeconds(queue.duration_ms)}}
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
import PlayerService from "@/services/PlayerService";
import QueueLoader from "@/components/Loaders/QueueLoader";

export default {
  components: {QueueLoader},
  props:['navWidth'],

  data(){
    return{
      loading:false,
      currentQue:{
        queue:[{
          album:{
            name:'',
            release_date:'',
            uri:'',
            id:'',
            images:[{
              url:'',
            }]
          },
          artists:[{
            name:'',
            id:'',
          }],
          name:'',
          track_number:'',
        }]
      }
    }
  },
  computed: {
    track() { return this.$store.state.track },
    que() { return this.$store.state.que}
  },
  async mounted() {
    this.loading = true;
    this.currentQue =  (await PlayerService.getQueue()).data;
    this.loading = false;
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
    getId(str){
      return str.split('spotify:artist:').pop();
    },
    navigateTo(route){
      this.$router.push(route)
    },
    modifyQueue(){
      var currentSong = this.track;
      var queue = this.currentQue.queue;
      //if this.track has the same value with queue remove from queue
      var result = queue.filter(function (entry) {return entry.name != currentSong.name})
      this.currentQue.queue = result;
    }
  },
  watch:{
    track:{
      handler(newValue){
        this.modifyQueue()
      }
    }
  }
}
</script>

<style scoped>
.os-content{
  direction: inherit;
  display: block;
  height: 100%;
  position: relative;
  visibility: visible;
  width: 100%;
  padding: 0;
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
  height: 64px;
  position: sticky;
  top: 0;
}
.main-que{
  min-height: calc(((100vh - 64px) - 90px) - 519px);
}
.content-spacing{
  padding: 0 32px;
  margin: 0;
  max-width: 1955px;
}
.que-detail{
  margin-top: 40px;
  padding-bottom: 1rem;
}
.que-detail h1 {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color:#ffffff;
  margin-bottom: 16px;
}
.que-detail h2 {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a);
}
.number{
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

.que-img img {
  margin-right: 16px;
  background-color: #282828;
  flex-shrink: 0;
}

.que-artist a {
  color: #b3b3b3;
  text-decoration: none;
}
.grid-arranger{
  grid-gap: 16px;
  display: grid;
  padding: 4px 16px;
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
.list-artist{
  cursor: pointer;
  pointer-events: auto;
}
.list-artist:hover{
  text-decoration: underline;
}
.list-artist:not(:last-child)::after{
  content: '  ,';
}
.active-track{
  color: #15c54b;
}
.on-queue:hover .play-track{
  opacity: 1;
  pointer-events: auto;
  color: #ffffff;
  transition: 0.3s;
}
.on-queue:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.3s;
}
.on-queue:hover .number{
  visibility: hidden;
}
.navigate:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>