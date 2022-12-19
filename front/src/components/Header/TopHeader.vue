<template>
  <div class="ms_header" ref="rightNav">
    <div class="ms_top_left">
      <router-link to="/">
        <svg fill="#fff" width="32" height="32" viewBox="0 0 167.5 167.5" class="spotify-logo"><title>Spotify</title><path d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z"></path></svg>      </router-link>
    </div>
    <div class="ms_middle">
      <div class="home">
        <router-link to="/">
                  <span class="nav_icon">
                    <svg v-if="this.$route.name !== 'home'" role="img" height="24" width="24" class="Svg-ytk21e-0 jAKAlG home-icon" fill="#b3b3b3" viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
                    <svg v-if="this.$route.name === 'home'" role="img" height="24" width="24" class="Svg-ytk21e-0 jAKAlG home-active-icon" fill="#fff" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path></svg>
                  </span>
        </router-link>
      </div>
      <div class="search-box">
        <button class="btn-search">
          <font-awesome-icon v-if="this.$route.name !== 'search'" icon="fa-solid fa-magnifying-glass" />
          <svg v-if="this.$route.name === 'search'" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 11a6 6 0 1 1 12 0a6 6 0 0 1-12 0zm6-8a8 8 0 1 0 4.906 14.32l3.387 3.387a1 1 0 0 0 1.414-1.414l-3.387-3.387A8 8 0 0 0 11 3zm0 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8z" clip-rule="evenodd"/></svg>
        </button>
        <input type="text" ref="search" class="input-search" placeholder="Type to Search..." v-on:keyup="navigateTo({name:'search',params:{search:$event.target.value}})">
      </div>
    </div>
    <div class="profile">
      <div class="profile-btn">
        <div class="user-icon">
          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG" fill="#eee"><path d="M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z"></path></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    navigateTo(route){
      this.$store.dispatch('searchParam',route.params.search)
      window.onload =
      setTimeout(() => {
        if(route.params.search !== ''){
          this.$router.push(route);
        }else {
          this.$router.push('/')
        }
      })
    },
  }
}
</script>

<style scoped>
.ms_header{
  position: fixed;
  background-color: #000000;
  padding: 7px !important;
  right: 0;
  left:0;
  width: 100%;
  top: 0;
  z-index: 1000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
}
@media (max-width: 1600px){
  .ms_header {
    padding: 20px 30px;
  }
}
.ms_top_right{
  line-height: 40px;
  display: flex;
  place-content: flex-end;
}
.ms_btn{
  background-color: rgb(13 110 253 / 25%);
  color: #fff;
  height: 30px;
  display: inline-block;
  text-transform: capitalize;
  width: 100px;
  text-align: center;
  line-height: 32px;
  border-radius: 20px;
  margin-left: 15px;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
}
.ms_top_left{
  float: left;
}
.search-box{
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search{
  background-color: #242424;
  color: #fff!important;
  height: 48px;
  width: 440px;
  border-radius: 50px;
  border-color: transparent;
}

.btn-search{
  width: 50px;
  height: 50px;
  border-style: none;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color:#ffffff ;
  background-color:transparent;
  pointer-events: painted;
}
.ms_middle{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.home {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -ms-flex-negative: 0;
  align-items: center;
  background-color: #242424;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  width: 48px;
  margin-right: 20px;
  cursor: pointer;
}
.home a{
  text-decoration: none;
  color: #ffffff;
}
.profile-btn{
  background-color: #242424;
  border-radius: 50%;
  padding: 5px 5px 5px 5px;
  cursor: pointer;
}
.user-icon{
  background-color: #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>