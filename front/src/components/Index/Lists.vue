<template>
  <div class="ms_heading">
    <h1>{{timer}}</h1>
  </div>
  <div class="container">
      <div class="row">
        <div class="col-md-4 col-12 mt-3" v-for="playlists in latest.albums.items.slice(0,column)">
          <div class="box">
            <div class="box-detail">
              <div class="box-img">
                  <img :src="playlists.images[0].url || playlists.images.url" :alt="playlists.name">
              </div>
              <div class="box_text">
                <p>{{playlists.name}}</p>
              </div>
              <div class="play-btn"  @click="changeSong(playlists.uri,1)">
                <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19V5l11 7Z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props:[
      'latest','column'
  ],
  data(){
    return{
      timer:''
    }
  },
  methods:{
    changeSong(uri,trackNumber) {
      this.$parent.changeSong(uri, trackNumber)
    },
  },
  async mounted(){
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      this.timer = 'Good Morning'
    } else if (curHr < 18) {
      this.timer = 'Good Afternoon'
    } else {
      this.timer = 'Good Evening'
    }
  }
}
</script>

<style scoped>

.ms_heading h1{
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  text-transform: capitalize;
  color: #eeeeee;
}
.ms_heading h1:after {
  width: 100px;
  height: 5px;
  content: "";
  position: absolute !important;
  bottom: 0;
  left: -15px;
  z-index: 0;
  background: -webkit-radial-gradient(50% 50%, ellipse closest-side, #3bc8e7, rgba(255, 42, 112, 0) 60%);
  background: -moz-radial-gradient(50% 50%, ellipse closest-side, #3bc8e7, rgba(255, 42, 112, 0) 60%);
  background: -ms-radial-gradient(50% 50%, ellipse closest-side, #3bc8e7, rgba(255, 42, 112, 0) 60%);
  background: -o-radial-gradient(50% 50%, ellipse closest-side, #3bc8e7, rgba(255, 42, 112, 0) 60%);
}
.box{
  background-color: hsla(0,0%,100%,.1);
  border-radius: 4px;
  height: var(80px);
  overflow: hidden;
  position: relative;
  -webkit-transition: background-color .3s ease;
  transition: background-color .3s ease;
  cursor: pointer;
  transition: 0.3s;
}
.box:hover{
  background-color: hsla(0,0%,100%,.2);
  transition: 0.3s;
}
.box-detail{
  display: flex;
  align-items: center;
}
.box-img{
  max-height: 80px;
  max-width: 80px;
}

.box-img img{
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.ms_rcnt_box .play_icon img{
  display: inline-block;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  width: 40px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  -webkit-transform: scale(5);
  -moz-transform: scale(5);
  -ms-transform: scale(5);
  -o-transform: scale(5);
  transform: scale(5);
  position: relative;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
  -moz-transition: -moz-transform 0.3s, opacity 0.3s;
  -o-transition: -o-transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.3s;
  color: rgba(50, 50, 50, 0.9);
}
.ms_rcnt_box:hover .box {
  opacity: 1;
}
.ms_rcnt_box:hover .box {
  top: 0;
}
.ms_rcnt_box:hover .play_icon img,
.ms_genres_box:hover .play_icon img {
  opacity: 1;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
.box_text{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-flex: 1;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: center;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  justify-content: space-between;
  padding: 0 16px;
}
.box_text p{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 700;
  color: #eeeeee !important;;
}
.listen-btn{
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.listen-btn button{
  padding: 5px 20px 5px 20px;
  background: #3bc8e7;
  color: #fff;
  border-style: none;
  border-radius: 5px;
}

</style>