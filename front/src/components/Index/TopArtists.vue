<template>
  <section class="discography">
    <div class="discography-grid">
      <div class="discography-flex">
        <div class="discography-header">
          <h2>Top Artists</h2>
        </div>
      </div>
    </div>
    <CardLoader v-if="loader === true" :column="column" />
    <div class="grid-container" v-if="loader === false" :style="'--column-count:'+column+';'">
      <div class="card-container" v-for="topArtists in topArtists.categories.items.slice(0,column)">
        <div class="card-height" @click="navigateTo({name:'artist',params:{artist:topArtists.id}})">
          <div class="card-img">
            <div class="card-img-arranger">
              <img :src="topArtists.images[0].url || topArtists.images.url" :alt="topArtists.name">
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
              {{ topArtists.name }}
            </div>
            <div class="release-date">
              <span class="type">
                Artist
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
  props:['topArtists','column','loader'],
  methods:{
    navigateTo(route){
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>