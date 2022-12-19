<template>
  <section class="discography" v-if="related.artists.length > 0">
    <div class="discography-grid">
      <div class="discography-flex">
        <div class="discography-header">
          <h2>Fans Might Like</h2>
        </div>
      </div>
    </div>
    <div class="grid-container" :style="'--column-count:'+column+';'">
      <div class="card-container" v-for="relatedArtist in related.artists.slice(0,column)">
        <div class="card-height" @click="navigateTo({name:'artist',params:{artist:relatedArtist.id}})">
          <div class="card-img" >
            <div class="card-img-arranger" v-if="relatedArtist.images.length > 0">
              <img :src="relatedArtist.images[0].url" :alt="relatedArtist.name">
            </div>
            <div class="no-img" v-if="relatedArtist.images.length === 0">
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
              {{ relatedArtist.name }}
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
  <div class="discography-grid mb-2r mt-1r" v-if="related.artists.length < 0">
    <div class="discography-flex">
      <div class="discography-header">
        <h2>
          Couldn't find any related artists
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['related','column'], // client/src/views/ArtistDetail.vue
  methods:{
    navigateTo(route){
      this.$router.push(route)
    }
  },
}
</script>

<style scoped>
.discography{
  --shelf-min-height: 300px;
  content-visibility: auto;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  position: relative;
  margin-bottom: 40px;
  padding-bottom: 2rem;
}
.discography-grid{
  grid-column: 1/-1;
}
.discography-flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
}
.grid-container{
  --column-width: 194px;
  --grid-gap: 24px;
  grid-gap: var(--grid-gap);
  display: grid;
  grid-template-columns: repeat(var(--column-count),minmax(0,1fr));
}
.discography-header{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  display: block;
  flex-grow: 1;
  line-height: normal;
  min-width: 0;
}
.section-buttons{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.section-buttons button{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  border: 0px;
  color: inherit;
  line-height: 1;
  letter-spacing: inherit;
  padding: 0px;
  border-radius: 32px;
  display: inline-flex;
  vertical-align: middle;
  max-inline-size: 100%;
  margin-block-end:8px;
  text-decoration: none;
  overflow-wrap: break-word;
  position: relative;
  flex-shrink: 0;
  z-index: 1;
}
.section-buttons button span{
  margin-inline-end: var(--spacer--2,8px);
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--border-radius-pill,32px);
  color: var(--text-base,#000000);
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
  display: inline-flex;
  min-inline-size: 0px;
  min-block-size: var(--control-size-sm,32px);
  -webkit-box-align: center;
  align-items: center;
  padding-block-start: var(--spacer--4,4px);
  padding-block-end: var(--spacer--4,4px);
  padding-inline-start: var(--spacer--1,12px);
  padding-inline-end: var(--spacer--1,12px);
  background-color: var(--background-elevated-highlight,#ffffff);
}
.active{
  background-color: var(--essential-base,#ffffff) !important;
  color: var(--background-base,#000000) !important;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
}
.card-container{
  --card-container-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  -webkit-box-flex: 1;
  background: #181818;
  border-radius: calc(var(--card-container-border-radius) + 2px);
  -ms-flex: 1;
  flex: 1;
  isolation: isolate;
  padding: 16px;
  position: relative;
  -webkit-transition: background-color .3s ease;
  transition: background-color .3s ease;
  width: 100%;
}
.card-container:hover{
  background: #282828;
}
.card-container:hover .card-btn{
  opacity: 1;
}

.card-height{
  height: 100%;
}
.card-img{
  margin-bottom: 16px;
  position: relative;
}
.card-img-arranger{
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  -webkit-box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  padding-bottom: 100%;
  position: relative;
  width: 100%;
  border-radius: 50%;
  background-color: transparent;
}
.card-img-arranger img {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  display: block;
  -webkit-animation: imageFadeInAnimation .25s ease;
  animation: imageFadeInAnimation .25s ease;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  border-radius: 50%;
}
.card-btn{
  border-radius: 500px;
  -webkit-box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
  box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  -webkit-transform: translateY(8px);
  transform: translateY(8px);
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  z-index: 2;
  right: 0;
  bottom: 0;
}
.shrink{
  flex-shrink: 0;
}
.play-song{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  touch-action: manipulation;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter, transform;
  user-select: none;
  vertical-align: middle;
  transform: translate3d(0px, 0px, 0px);
  padding: 0px;
  min-inline-size: 0px;
  align-self: center;
  position: relative;
  z-index: 1;
}
.encore-bright{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  background-color: var(--essential-positive,#000);
  color: var(--text-base,#000000);
  display: flex;
  border-radius: 500px;
  font-size: inherit;
  min-block-size: 48px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  inline-size: 48px;
  block-size: 48px;
}
.icon-arranger{
  display: flex;
  position: absolute;
  top: 12px;
  left: 12px;
}
.card-title{
  min-height: 62px;
}
.album-name{
  position: relative;
  z-index: 1;
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  padding-block-end: 4px;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.release-date{
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: normal;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-subdued,#6a6a6a)
}
.type::before{
  content: "";
  margin: 0 4px;
}
.card-click-handler{
  bottom: 0;
  content: "";
  cursor: pointer;
  left: 0;
  overflow: hidden;
  right: 0;
  text-indent: 100%;
  top: 0;
  white-space: nowrap;
  position: absolute;
  z-index: 0;
}
.no-img{
  border-radius: 50%;
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  background-color: var(--card-color,#333);
  -webkit-box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  padding-bottom: 100%;
  position: relative;
  width: 100%;
}
.no-img-arranger{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>