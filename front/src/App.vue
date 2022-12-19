<template>
  <Header :expand="expand" @send="receive"/>
  <router-view  :key="$route.path" :navWidth="navWidth" :column="column"/>
  <Player @expanded="getExpand"/>
</template>
<script>
import Header from "@/components/Header/SideHeader";
import Player from "@/components/Player/SpotifyPlayer";
import SpotifyService from "@/services/SpotifyService";
import PlayerService from "@/services/PlayerService";

export default {
  components:{
    Player,
    Header,
  },
  inheritAttrs: false, // This is what disables attribute inheritance
  data(){
    return{
      navWidth:280,
      column:6,
      expand:{
        value:'',
        img:'',
      },
      track:{
        name: "",
        uri:"",
        images: [
          { url:'' }
        ],
        group:{
          name:''
        },
        artists: [
          {
            name: "",
            url:'',
            id:'',
          }
        ]
      },
    }
  },
  mounted(){
    //      Adding websdk to your app for more details check out here  https://medium.com/@bilawalhameed/getting-started-with-async-await-with-the-spotify-web-playback-sdk-aac4b6bf7105

    window.onSpotifyWebPlaybackSDKReady = () => {};
    async function waitForSpotifyWebPlaybackSDKToLoad () {
      return new Promise(resolve => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }

      });
    }
    async function waitUntilUserHasSelectedPlayer (sdk) {

      return new Promise(resolve => {
        let interval = setInterval(async () => {
          let state = await sdk.getCurrentState();
          if (state !== null) { //User not playing music from our app
            resolve(state);
            clearInterval(interval);
          }else {
               PlayerService.Connect()
          }
        },2000); //Request per 2 seconds
      });
    }
    async function connectDevice (sdk){
      await sdk.addListener('ready',async ({ device_id }) => {
        console.log('Connected with Device ID', device_id);
        PlayerService.Connect({device_id})
      })
    }
    (async () => {
      this.token = (await SpotifyService.getToken()).data.token

      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();


      const sdk = new Player({
        name: "Kamals app",
        volume: 1.0,
        getOAuthToken: cb => { cb(this.token); },
      },)
      sdk.on("player_state_changed",async state => {
        this.$store.dispatch('isPaused',state.paused)
        this.$store.dispatch('currentTrack',state.context.metadata.current_item)
        this.$store.dispatch('getDuration',state.duration)
        this.$store.dispatch('getPosition',state.position)
      })


      // await PlayerService.Connect({device_id})
      let connected = await sdk.connect()
      if (connected) {
        let state = await waitUntilUserHasSelectedPlayer(sdk);
        await sdk.resume().then(() => {
          console.log('Resumed!');
        });
      }
    })()
  },
  methods:{
    receive(childData) {
      this.navWidth = childData;
    },
    getExpand(newValue){
      this.expand = newValue;
    },
  },
  watch: {
    navWidth(newValue) {
      if (newValue <= 175) {
        this.column = 8
      } else {
        this.column = 6
      }
    }
  }
}
</script>

<style>
body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  border-radius: 3px;
  background: transparent;
}


body::-webkit-scrollbar-thumb {
  background: hsla(0,0%,100%,.3);
  max-height: 20px;
}

.ms_content_wrapper {
  position: relative;
  margin-left: 300px;
  margin-right: 80px;
  padding-bottom: 5rem !important;
}
body {
  margin: 0;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #777777;
  background-color: #121212;
  user-select: none;
}

.padder_top100 {
  padding-top: 100px !important;
}
.padder_top80 {
  padding-top: 80px !important;
}
.padder_top90 {
  padding-top: 90px !important;
}
.padder_top5 {
  padding-top: 5px;
}
.padder_top10 {
  padding-top: 10px;
}
.padder_top20 {
  padding-top: 20px;
}
.padder_top110 {
  padding-top: 110px;
}
.padder_top50 {
  padding-top: 50px;
}
.padder_top55 {
  padding-top: 55px;
}
.padder_top60 {
  padding-top: 60px;
}
.padder_top70 {
  padding-top: 70px;
}
.padder_top15 {
  padding-top: 15px;
}
.padder_bottom70 {
  padding-bottom: 70px;
}
.padder_bottom20 {
  padding-bottom: 20px;
}
.padder_top30 {
  padding-top: 30px;
}
.marger_top20 {
  margin-top: 20px;
}
.marger_top15 {
  margin-top: 15px;
}
.marger_bottom30 {
  margin-bottom: 30px;
}
.marger_bottom100 {
  margin-bottom: 100px;
}
.marger_bottom25 {
  margin-bottom: 25px;
}
.marger_top100 {
  margin-top: 100px;
}
.marger_top60 {
  margin-top: 60px;
}
.ms_relative_inner {
  position: relative;
}
.marger_top20 {
  margin-top: 20px;
}
.padder_bottom60 {
  padding-bottom: 60px !important;
}
.padder_bottom30 {
  padding-bottom: 30px !important;
}
.marger_bottom60 {
  margin-bottom: 60px;
}
.padding_right40 {
  padding-right: 40px;
}
/*Rem Usage*/
.mt-1r{margin-top: 1rem;}.mt-3r{margin-top: 3rem;}.mt-5r{margin-top: 5rem;}.mt-10r{margin-top: 10rem;}.mr-1r{margin-right: 1rem;}
.mr-3r{margin-right: 3rem;}.mr-5r{margin-right: 5rem;}.mr-10r{margin-right: 10rem;}.mb-1r{margin-bottom: 1rem;}.mb-2r{margin-bottom: 2rem}.mb-3r{	margin-bottom: 3rem;}
.mb-5r{margin-bottom: 5rem;}.mb-10r{margin-bottom:10rem;}.ml-1r{margin-left: 1rem;}.ml-3r{margin-left: 3rem;}.ml-5r{margin-left: 5rem;}.ml-10r{margin-left: 10rem;}
/*Rem Usage End*/
/*Paadding-rem*/
.pt-1r{padding-top: 1rem;}.pt-3r{padding-top: 3rem;}.pt-5r{padding-top: 5rem;}.pt-10r{padding-top: 10rem;}.pr-1r{padding-right: 1rem;}
.pr-3r{padding-right: 3rem;}.pr-5r{padding-right: 5rem;}.pr-10r{padding-right: 10rem;}.pb-1r{padding-bottom: 1rem;}.pb-2r{padding-bottom: 2rem;}.pb-3r{padding-bottom: 3rem;}
.pb-5r{padding-bottom: 5rem;}.pb-10r{padding-bottom: 10rem;}
/*End padding Rem
/*Px margin*/
.mt-5p{margin-top: 5px;}.mt-10p{margin-top: 10px;}.mt-15p{margin-top: 15px;}.mt-20p{margin-top: 20px;}.mr-5p{margin-right: 5px;}
.mr-10p{margin-right: 10px;}.mr-15p{margin-right: 15px;}.mr-20p{margin-right: 20px;}.mb-5p{	margin-bottom: 5px;}.mb-10p{margin-bottom:10px;}
.mb-15p{margin-bottom: 15px;}.mb-20p{margin-bottom: 20px;}.ml-5p{	margin-left: 5px;}.ml-10p{margin-left: 10px;}.ml-15p{margin-left: 15px;}.ml-20p{margin-left: 20px;}
/*Px margin end*/
/*px Padding*/
.pt-5p{padding-top: 5px;}.pt-10p{padding-top: 10px;}.pt-15p{padding-top: 15px;}.pt-20p{padding-top: 20px;}.pr-5p{padding-right: 5px;}
.pr-10p{padding-right: 10px;}.pr-15p{padding-right: 15px;}.pr-20p{padding-right: 20px;}.pb-5p{padding-bottom: 5px;}.pb-10p{padding-bottom: 10px;}
.pb-15p{padding-bottom: 15px;}.pb-20p{padding-bottom: 20px;}.pl-5p{padding-left: 5px;}.pl-10p{padding-left: 10px;}.pl-15p{padding-left: 20px;}
.pl-20p{padding-left: 20px;}
/*px padding end*/

</style>
