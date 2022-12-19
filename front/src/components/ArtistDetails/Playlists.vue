<template>
  <div class="grid-container" :style="'--column-count:'+column+';'">
    <div class="card-container" v-for="playlist in searchPlaylist.playlists.items.slice(0,column)">
      <div class="card-height" @click="navigateTo({name:'playlistDetail',params:{trackId:playlist.id}})">
        <div class="card-img">
          <div class="card-img-arranger">
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
</template>

<script>
export default {
  props:['searchPlaylist','column'], //client/src/views/ArtistDetail.vue
  methods:{
    navigateTo(route){
      this.$router.push(route)
    }
  }
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
  background-color: var(--card-color,#333);
  border-radius: var(--card-image-border-radius);
  -webkit-box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  padding-bottom: 100%;
  position: relative;
  width: 100%;
}
.card-img-arranger img {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  --card-image-border-radius: clamp(4px,(var(--column-width,0px) - 32px) * 0.025,8px);
  border-radius: var(--card-image-border-radius);
  display: block;
  -webkit-animation: imageFadeInAnimation .25s ease;
  animation: imageFadeInAnimation .25s ease;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
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
  content: "â€¢";
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
</style>