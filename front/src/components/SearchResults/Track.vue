<template>
    <div class="container mt-1" >
      <div class="row">
        <div class="col-6">
          <h1>Best Result</h1>
          <div class="result-container mt-3" v-if="loader === true">
            <QueueLoader/>
          </div>
          <div class="result-container mt-3" @click="onClickButton(tracks)" v-if="loader === false">
            <div class="artist-img">
              <img :src="tracks.items[0].album.images[0].url" :alt="tracks.items[0].album.name" >
            </div>
            <div class="res-title">
              {{tracks.items[0].name}}
            </div>
            <div class="res-link">
              <div @click="navigateTo({name:'artist',params:{artist:tracks.items[0].album.artists[0].id}})">{{tracks.items[0].album.artists[0].name}}</div>
              <span class="type">
                {{tracks.items[0].type}}
              </span>
            </div>
            <div class="arranger" @click="changeSong(tracks.items[0].album.uri,tracks.items[0].track_number); arrangeQueue(tracks.items[0].artists[0].id);">
              <div class="play-btn">
                <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19V5l11 7Z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="songs">
            <h1>Songs</h1>
            <div class="song-list mt-3" >
              <QueueLoader v-if="loader === true"/>
              <ul v-if="loader === false" v-for="song in tracks.items.slice(0,5)" :key="tracks.items" @click="onClickButton(song); changeSong(song.album.uri,song.track_number); arrangeQueue(song.album.artists[0].id);">
                <li>
                  <img :src="song.album.images[0].url" :alt="song.name">
                  <div class="listen">
                    <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19V5l11 7Z"/></svg>
                  </div>
                  <span class="song-title ml-5p" >
                     {{song.name}}
                  </span>
                  <div @click="navigateTo({name:'artist',params:{artist:song.album.artists[0].id}})" class="artist">
                    {{song.album.artists[0].name}}
                  </div>
                  <span class="duration">
                    5:03
                  </span>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from "@/services/SpotifyService";
import PlayerService from "@/services/PlayerService";
import QueueLoader from "@/components/Loaders/QueueLoader";
export default {
  name:"Track",
  components: {QueueLoader},
  props:[
      'tracks','loader'
  ],
  data(){
    return{
      variable:'',
      que:[{
        name:'',
        uri:'',
        duration_ms:'',
        album:{
          name:'',
          images:[{
            url:''
          }],
          release_date:'',
        },
        artists:[{
          name:'',
          id:''
        }]
      }],
    }
  },
  methods:{
    navigateTo(route){
      this.$router.push(route)
    },
    onClickButton (event,value) {
      this.$emit('clicked', event)
    },
    async changeSong(uri,trackNumber){
      await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
    },
    async arrangeQueue(artist){
      const response =  await PlayerService.Queue({artist})
      this.$store.dispatch('GetQueue',response.data)
    }
  }
}
</script>

<style scoped>
h1{
  color: #eeeeee;
}
.result-container {
  background-color: #181818;
  width: 100%;
  padding: 2rem;
  cursor: pointer;
  max-width: 400px;
  transition: 0.5s;
  border-radius: 10px;
}
.result-container:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.5s;
}
.result-container:hover img{
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -khtml-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  transition: 0.3s;
}
.artist-img {
  width: 100px;
  height: 100px;
}
.artist-img img{
  border-radius: 10px;
  max-width: 100%;
  max-height: 100%;
  transition: 0.3s;
}
.res-title{
  margin-top: 1rem;
  color: #ffffff;
  font-size: larger;
  font-weight: 600;
  padding: 0;
}
.res-link a {
  color: #cdcdcd;
  text-decoration: none;
}
.res-link a:hover{
  text-decoration: underline;
}
.res-link .type {
  margin-left: 5px;
  background-color: #22a6b3;
  color: #ffffff;
  padding: 4px 6px 5px 6px;
  border-radius: 10px;
  cursor: pointer;
}
.arranger{
  width: 100%;
  position: relative;
}
.play-btn {
  visibility: hidden !important;
  opacity:0;
  transition:visibility 0.3s linear,opacity 0.3s linear;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: #1ed760;
  color: #000000;
  display: flex;
  border-radius: 500px;
  font-size: inherit;
  min-block-size: 48px;
  align-items: center;
  justify-content: center;
  inline-size: 48px;
  position: absolute;
  block-size: 48px;
  right: 0;
  bottom: 0px;
}
.result-container:hover .arranger .play-btn{
  visibility:visible !important;
  opacity:1;
}
.song-list ul {
  list-style: none;
  display: flex;
  transition: 0.3s;
  padding: 10px;
  margin: 0;
}
.song-list ul:hover {
  background-color:hsla(0,0%,100%,.1) ;
  transition: 0.3s;
}
.song-list ul li img {
  width: 40px;
  height: 40px;
}
.song-list ul li{
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.song-list ul li span{
  color: #eeeeee;
}
.song-list ul li a {
  color: #777777;
  text-decoration: none;
  transition: 0.3s;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.song-list ul li a:hover {
  color: #eeeeee;
  text-decoration: underline;
  transition: 0.3s;
}
.song-list ul:hover .listen{
  visibility:visible !important;
  opacity:1;
}
.listen{
  visibility: hidden !important;
  opacity:0;
  transition:visibility 0.3s linear,opacity 0.3s linear;
  cursor: pointer;
  background: rgba(0,0,0,.5);
  pointer-events: auto;
  position: absolute;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.song-title{
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 5px 0 5px;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>