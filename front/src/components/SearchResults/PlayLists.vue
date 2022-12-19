<template>
  <section class="discography mt-1r">
    <div class="discography-grid">
      <div class="discography-flex">
        <div class="discography-header">
          <h2>Playlists</h2>
        </div>
      </div>
    </div>
    <CardLoader v-if="loader === true" :column="column" />
    <div class="grid-container" v-if="loader === false" :style="'--column-count:'+column+';'">
      <div class="card-container" v-for="playlist in playlists.items.slice(0,column)">
        <div class="card-height" @click="navigateTo({name:'playlistDetail',params:{trackId:playlist.id}})">
          <div class="card-img">
            <div class="card-img-arranger" v-if="playlist.images.length > 0">
              <img :src="playlist.images[0].url || playlist.images.url" :alt="playlist.name">
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
              {{playlist.name}}
            </div>
            <div class="release-date">
              <span class="type">
                {{playlist.owner.display_name}}
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
  props:[
      'playlists','column','loader'
  ],
  components:{
    CardLoader
  },
  methods:{
    navigateTo(route){
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
/* client/src/views/SearchView.vue */
</style>