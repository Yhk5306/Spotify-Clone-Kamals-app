<template>
  <div class="ms-sidemenu-wrapper" ref="drawer" id="draw" :width="navigation.width" >
    <div class="ms_sidemenu_inner" >
      <div class="draggable" ref="border" ></div>
      <div class="ms_nav_wrapper mCustomScrollbar _mCS_1 mCS-autoHide">
        <div class="mCustomScrollBox mCS-minimal mCSB_vertical mCSB_outside">
          <div class="mCSB_container">
            <ul>
              <li>
                <router-link to="/play-list">
                  <div class="playlists-icon">
                    <svg v-if="this.$route.name !== 'playlist'" role="img"  height="24" width="24" class="Svg-ytk21e-0 jAKAlG collection-icon"  fill="#b3b3b3" aria-hidden="true" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
                    <svg v-if="this.$route.name === 'playlist'" role="img"  height="24" width="24" class="Svg-ytk21e-0 jAKAlG collection-active-icon" fill="#b3b3b3" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"></path></svg>
                  </div>
                   <div class="ellipsis">PlayLists</div>
                </router-link>
              </li>
              <li>
                <router-link to="/create">
                  <div class="create-playlist">
                    <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16"  fill="#000" class="Svg-ytk21e-0 jAKAlG"><path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>
                  </div>
                  <div class="ellipsis">Create Playlist</div>
                </router-link>
              </li>
              <li>
                <router-link to="/liked">
                    <div class="like-icon">
                      <font-awesome-icon icon="fas fa-heart" />
                    </div>
                  <div class="ellipsis">Favorite Songs</div>
                  </router-link>
              </li>
            </ul>
          </div>
          <div class="playlists mt-2 mb-2">
            <div class="playlist-list">
              <ul ref="playlists">
                <li v-for="list in playlists" >
                  <div class="ellipsis" @click="playListDetail({name:'playlistDetail',params: {trackId:list.id}})">
                    {{list.name}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <transition name="slide-fade" class="expanded" v-show="expanded.value === true">
            <div class="expanded-img">
              <button class="close-expand" @click="expanded.value = false">
                <svg role="img" fill="#ffffff" height="16" width="16" viewBox="0 0 16 16"><path d="M.47 11.03a.75.75 0 001.06 0L8 4.56l6.47 6.47a.75.75 0 101.06-1.06L8 2.44.47 9.97a.75.75 0 000 1.06z"></path></svg>
              </button>
              <div class="expand-img-detail">
                <img :src="track.images[0].url" alt="expanded">
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
  <TopHeader/>
</template>

<script>
import SearchView from "@/views/SearchView";
import SpotifyService from "@/services/SpotifyService";
import TopHeader from "@/components/Header/TopHeader";


export default {
  components:{
    TopHeader,
    SearchView,
  },
  inheritAttrs: false, // This is what disables attribute inheritance
  props:['expand'],
  data() {
    return {
      isLoginVisible: false,
      isRegisterVisible:false,
      search:'',
      searchTrack:'',
      timer:'',
      playlists:[{
        name:'',
        id:'',
      }],
      navigation:{
        width:224,
        borderSize:10
      },
      expanded:false,
      Swidth:'',   // This data declared for send to navigation.width to other components
    };
  },
  computed:{
    track() { return this.$store.state.track },
  },
  methods:{
    playListDetail(route){
       this.$router.push(route)
    },
    setBorderWidth() {
      let i = this.$refs.border
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "col-resize";
    },
    setEvents(){
      const el = this.$refs.drawer;
      const rightNav = this.$refs.rightNav;
      const drawerBorder = this.$refs.border
      const vm = this;    // this not working on resize function thats why we are declaring var
      const minSize = this.navigation.borderSize;
      const playlists = this.$refs.playlists;

      const direction = el
        ? "right"
        : "left";

      function resize(e){
        let f = direction ===  "right"
          ? e.clientX
          : e.clientY;
        if (e.clientX >= 350 || e.clientX <= 120){
          return false
        }else {
          el.style.width = f + "px";
          vm.Swidth = f;
          playlists.style.height =  f - 380 + 'px';
          playlists.style.width =f + 8 + 'px' ;
        }
      }
      drawerBorder.addEventListener(
          "mousedown",
          function(e) {
            if (e.offsetX < minSize) {
              // m_pos = e.x;
              el.style.transition ='initial';
              document.addEventListener("mousemove", resize, false);
            }
          },
          false
      );
      document.addEventListener("mouseup",function () {
        el.style.transition = '';
        vm.navigation.width = el.style.width;
        document.removeEventListener("mousemove",resize,false)
      },false);
    },
  },
  async mounted(){
    const response = (await SpotifyService.SpotiPlayLiST()).data
    this.playlists = response
    this.setBorderWidth();
    this.setEvents();
  },
  watch:{
    Swidth: function (newValue){
      this.$emit('send',newValue)   //getting the changed value from app.vue
    },
    expand:function (newValue){
      this.expanded = newValue;
    }
  }
}
</script>

<style scoped>
.ms_btn {
  cursor: pointer;
}
a{
  color: #3bc8e7;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
}
.ms-sidemenu-wrapper{
  position: fixed;
  width: 264px;
  height: 100%;
  z-index: 1000;
  top: 0;
  bottom: 0;
  box-shadow: 0px 0px 24px 6px rgb(4 4 4 / 20%);
  resize: horizontal;
}
.ms_sidemenu_wrapper::-webkit-resizer{
  height: 100% !important;
}
.ms_sidemenu_inner {
  background-color: #000000;
  height: 100%;
  z-index: 1;
}

.ms_logo_inner {
  align-items: center;
  justify-content: center;
  display: flex;
  min-height: 164px;
}
.draggable {
  position: absolute;
  right: 0;
  height: 100%;
  width: 10px;
  z-index: 1000;
  background-color: #000000;
}
.draggable:hover{
  border-right: 1px solid #b3b3b3;
}
.ms_nav_wrapper {
  padding: 0px 0px;
  position: absolute !important;
  left: 0;
  top: 65px;
  right: 0;
  bottom: 70px;
}
.mCustomScrollBox {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  background-color:#121212;
  border-radius: 10px;
}
.mCSB_outside+.mCS-minimal.mCSB_scrollTools_vertical {
  right: 0;
  margin: 12px 0;
}
.mCSB_container {
  width: auto;
  background-color: #121212;
  padding-bottom: 1rem;
}
.ms_nav_wrapper {
  padding: 0px 0px;
  position: absolute !important;
  left: 0;
  top: 65px;
  right: 0;
  bottom: 90px;
}
.ms_nav_wrapper ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
.ms_nav_wrapper ul li {
  width: 100%;
  display: block;
}
.ms_nav_wrapper ul li a {
  color: #b3b3b3;
  text-transform: capitalize;
  width: 100%;
  display: flex;
  position: relative;
  text-align: center;
  font-size: 1rem;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 16px;
  height: 40px;
  padding: 0 16px;
  transition: 0.3s;
}
.ms_nav_wrapper ul li a:hover{
  color: #ffffff;
  transition: 0.3s;
}
.ms_nav_wrapper ul li a svg:hover{
  fill: #ffffff;
  transition: 0.3s;
}
.ms_nav_wrapper ul li .active {
  color: #ffffff;
}
.ms_nav_wrapper ul li a span.nav_icon {
  margin-right: 0;
}
.ms_nav_wrapper ul li a span svg {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
}

.like-icon{
  background: linear-gradient(135deg,#450af5,#c4efd9);
  padding: 0px 5px 0px 5px;
  width: auto;
  border-radius: 3px;
}
.playlists{
  border-top: 1px solid #333333;
  margin-bottom: auto;
  overflow: hidden;
  overflow-y: overlay;
  height: 100%;
  border-radius: 5px;
}
.playlists::-webkit-scrollbar {
  width: 24px;
  background-color: #121212;
}

.playlists::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px hsla(0,0%,100%,.3);
  background-color: #5a5a5a;
}
.playlists ul li {
  cursor: pointer;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.playlist-list{
  gap: 16px;
  padding: 0 0 0 16px;
}
.playlist-list ul li {
  transition: 0.3s;
}
.playlist-list ul li:hover{
  color: #ffffff;
  transition: 0.3s;
}
.create-playlist {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: #b3b3b3;
  border-radius: 2px;
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  padding: 6px 6px 6px 6px;
  transition: 0.3s;
}
.create-playlist:hover{
  background-color: #eeeeee;
  transition: 0.3s;
}
.create-playlist svg:hover{
  fill: #000000 !important;
}
.ellipsis{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.arrange-border{
  height: 100%;
  width: 50px;
}
.expanded {
  margin-top: auto;
}
.expanded img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.expanded-img{
  position: relative;
}
.close-expand{
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
  width: 24px;
  z-index: 1;
  top: 5px;
  right: 13px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  cursor: pointer;
}
.close-expand svg {
  transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -webkit-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -moz-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -o-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
  -ms-transform: rotate(180deg) scale(1) skew(0deg) translate(0px);
}
.expanded:hover .close-expand{
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;
}

/* <transition> effects */
.slide-fade-enter-active {
  transition: all 0.3s ;
}

.slide-fade-leave-active {
  transition: all 0.3s ;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>