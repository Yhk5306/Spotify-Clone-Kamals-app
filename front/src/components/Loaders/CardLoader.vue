<template>
  <div class="grid-container" :style="'--column-count:'+column+';'">
    <div class="card-container" v-for="arr in load.slice(0,column)">
      <div class="card-height" >
        <div class="card-img">
          <div class="card-img-arranger">
              <div class="img-loading"></div>
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
          </div>
          <div class="release-date">
              <span class="type">
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
  props:['column'],
  data(){
    return{
      load:Array.from(Array(8).keys())
    }
  }
}
</script>

<style scoped>
.card-container{
  animation: colors 3s infinite;
}
@keyframes colors {
  from {background-color: #181818;}
  to {background-color: radial-gradient(circle, rgba(24,24,24,1) 1%, rgba(40,40,40,1) 23%);;}
}
</style>