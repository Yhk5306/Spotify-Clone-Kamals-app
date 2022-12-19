<template>
  <div class="banner"></div>
  <div :style="{'margin-left':navWidth+20+'px'}" class="ms_content_wrapper padder_top80" >
    <Lists :latest="latest"/>
    <Top :column="column" :topTracks="topTracks" :loader="loader" />
    <Trends :column="column" :topArtists="topArtists" :loader="loader" />
    <PlayLists :column="column" :myPlayLists="myPlayLists" :loader="loader" />
  </div>
</template>

<script>

//Services
import IndexServices from "@/services/IndexServices";

//Components
import Lists from '@/components/Index/Lists';
import Top from '@/components/Index/TopTracks';
import Trends from "@/components/Index/TopArtists";
import PlayLists from "@/components/Index/Playlists";

//Utils
import SpotifyService from "@/services/SpotifyService";

export default {
  components: {PlayLists, Trends,Lists,Top},
  props:['navWidth','column'],  //column comes from app.vue
  data() {
    return {
      latest: {
        albums: {
          items: [{
            id: '',
            name: '',
            uri:'',
            release_date: '',
            artists: [{
              name: ''
            }],
            images: [{
              url: ''
            }],
          }]
        }
      },
      topTracks: {
        topTracks:{
          items: [{
            id: '',
            name: '',
            release_date: '',
            artists: [{
              name: '',
              id:''
            }],
            album:{
              images: [{
                url: '',
              }],
              uri:'',
            },
          }]
        },
      },
      topArtists:{
        categories:{
          items:[{
            name:'',
            uri:'',
            images:[{
              url:''
            }],
            genres:['']
          }],
        }
      },
      myPlayLists:{
        playlists: {
          items:[{
            description: '',
            name: '',
            id:'',
            images: [{
              url:''
            }],
            owner:{
              display_name:''
            },
            tracks: '',
            uri:'',
          }]
        }
      },
      loader: false,
      offset:'',
    }
  },
  methods:{
    navigateTo(route){
      this.$router.push(route)
    },
    async getTracks(offset){
      await IndexServices.UserTopTracks({offset:offset}).data
    },
    async changeSong(uri,trackNumber){
      await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
    },
  },
  async mounted() {
    this.loader = true
    this.latest = (await IndexServices.getNewAlbums()).data
    let getMostTracks = await IndexServices.UserTopTracks()
    this.topTracks = getMostTracks.data
    let getMostArtists = await IndexServices.getTopArtists()
    this.topArtists = getMostArtists.data;
    this.myPlayLists = (await IndexServices.getMyPlayLists()).data
    this.loader = false;
  },
}
</script>
<style>
.ms_content_wrapper{
  border-radius: 8px;
}
.banner{
  background-color: rgb(72, 32, 176);
  height: 332px;
  margin-top: -64px;
  position: absolute;
  -webkit-transition: background 1s ease;
  transition: background 1s ease;
  width: 100%;
  z-index: -1;
  background-image: linear-gradient(rgba(0,0,0,.6) 0,#121212 100%),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=);
}
.play-btn{
  border-radius: 50%;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s linear,opacity 0.3s linear;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: #1ed760;
  color: #000000;
  display: flex;
  font-size: inherit;
  min-block-size: 45px;
  width: 45px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.box:hover .play-btn{
  visibility: visible !important;
  opacity: 1;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  -khtml-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  transition: visibility 0.3s linear,opacity 0.3s linear;
}
</style>
