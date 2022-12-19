<template>
  <section class="discography mt-1r">
    <div class="discography-grid">
      <div class="discography-flex">
        <div class="discography-header">
          <h2>Artists</h2>
        </div>
      </div>
    </div>
    <CardLoader v-if="loader === true" :column="column" />
    <div class="grid-container" v-if="loader === false" :style="'--column-count:'+column+';'">
      <div class="card-container" v-for="singer in artists.items.slice(0,column)">
        <div class="card-height"  @click="navigateTo({name:'artist',params:{artist:singer.id}})">
          <div class="card-img">
            <div class="card-img-arranger" v-if="singer.images.length > 0">
              <img :src="singer.images[0].url || singer.images.url" :alt="singer.name">
            </div>
            <div class="no-img" v-if="singer.images.length === 0">
              <div class="no-img-arranger">
                <svg fill="#b3b3b3" role="img" height="64" width="64" aria-hidden="true" data-testid="card-image-fallback" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 uPxdw"><path d="M13.363 10.474l-.521.625a2.499 2.499 0 00.67 3.766l.285.164a5.998 5.998 0 011.288-1.565l-.573-.33a.5.5 0 01-.134-.754l.52-.624a7.372 7.372 0 001.837-4.355 7.221 7.221 0 00-.29-2.489 5.644 5.644 0 00-3.116-3.424A5.771 5.771 0 006.753 2.87a5.7 5.7 0 00-1.19 2.047 7.22 7.22 0 00-.29 2.49 7.373 7.373 0 001.838 4.355l.518.622a.5.5 0 01-.134.753L3.5 15.444a5 5 0 00-2.5 4.33v2.231h13.54a5.981 5.981 0 01-1.19-2H3v-.23a3 3 0 011.5-2.6l3.995-2.308a2.5 2.5 0 00.67-3.766l-.521-.625a5.146 5.146 0 01-1.188-4.918 3.71 3.71 0 01.769-1.334 3.769 3.769 0 015.556 0c.346.386.608.84.768 1.334.157.562.22 1.146.187 1.728a5.379 5.379 0 01-1.373 3.188zm7.641-1.173a1 1 0 00-1 1v4.666h-1a3 3 0 103 3v-7.666a.999.999 0 00-1.003-1h.003zm-1 8.666a1 1 0 11-1-1h1v1z"></path></svg>
              </div>
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
              {{singer.name}}
            </div>
            <div class="release-date">
              <span class="type">
               {{singer.type}}
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
      'artists','column','loader'
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