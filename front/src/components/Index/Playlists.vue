<template>
  <section class="discography mb-3r">
    <div class="discography-grid">
      <div class="discography-flex">
        <div class="discography-header">
          <h2>Playlists</h2>
        </div>
      </div>
    </div>
    <CardLoader v-if="loader === true" :column="column" />
    <div v-if="loader === false" class="grid-container" :style="'--column-count:'+column+';'">
      <div class="card-container" v-for="myLists in myPlayLists.playlists.items.slice(0,column)">
        <div class="card-height" @click="navigateTo({name:'playlistDetail',params:{trackId:myLists.id}})">
          <div class="card-img">
            <div class="card-img-arranger">
              <img v-if="myLists.images.length !== 0" :src="myLists.images[0].url || myLists.images.url" :alt="myLists.name">
            </div>
            <div class="card-btn">
              <div class="shrink">
                <button class="play-song">
                <span class="encore-bright">
                  <span class="icon-arranger">
                    <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 eqtHWV"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                  </span>
                </span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-title">
            <div class="album-name">
              {{ myLists.name }}
            </div>
            <div class="release-date">
              <span class="type">
                Playlist
             </span>
            </div>
          </div>
          <div class="card-click-handler"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardLoader from "@/components/Loaders/CardLoader";

export default {
  components: {CardLoader},
  props:['myPlayLists','column','loader'],
  methods:{
    changeSong(uri,trackNumber) {
      this.$parent.changeSong(uri, trackNumber)
    },
    navigateTo(route){
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.no-img{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background-color: #282828;
  border: none;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  opacity: 1;
  padding: 0;
  text-align: center;
  height: 180px;
  width: 100%;
  border-radius: 10px;
}
</style>