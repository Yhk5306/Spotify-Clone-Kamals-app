<template>
  <div :style="{'margin-left':navWidth+'px'}" class="ms_content_wrapper padder_top80" >
    <div class="banner" ref="color" :style="{'background':color}">
      <div class="banner-color"></div>
      <div class="ms_content_wrapper padder_top80">
        <div class="mt-5">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="banner-detail" id="create" ref="create" >
                  <button class="edit-img-button">
                    <div class="icon">
                      <svg role="img" height="48" width="48" aria-hidden="true" viewBox="0 0 24 24" class="Svg-ytk21e-0 eqtHWV"><path d="M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z"></path></svg>
                      <span class="sub-tit">Choose Image</span>
                    </div>
                  </button>
                  <h1>New Playlist</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-start">
      <div class="bg-color-arg" :style="{'background-color':color}"></div>
      <div class="foreign-theme">
        <div class="host">
          <div class="resize-observer"></div>
        </div>
        <div class="size-observer">
          <div class="os-resize-observer"></div>
        </div>
        <div class="os-glue"></div>
        <div class="os-padding">
          <div class="os-viewport">
            <div class="os-content">
              <!--Content goes Here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['navWidth'],
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap');
.ms_content_wrapper{
  margin-right: 0;
}
.banner{
  width: 100%;
  height: 30vh;
  max-height: 500px;
  min-height: 340px;
  display: flex;
  max-width: none;
  overflow: hidden;
  position: relative;
  padding-bottom: 450px;
}
.banner-color{
  background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=);
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.banner-detail{
  display: flex;
  align-items: center;
}

.banner-detail h1 {
  color: #ffffff !important;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  visibility: visible;
  width: 100%;
  font-size: 5rem;
  margin-left: 1rem;
}
.ms_content_wrapper{
  padding-bottom: 1rem !important;
  margin-left: 50px;
}
.play-button-banner{
  margin-left: 150px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8) !important;
}
.table-start{
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.start-btn {
  background-color: #1ed760;
  max-width: 60px;
  height: 60px;
  color: #000000;
  display: flex;
  justify-content: center;
  border-radius: 50px;
}
.start-btn svg{
  display: block;
  margin: auto;
}
.like-song {
  color: #ffffff !important;
  border-bottom: 0 !important;
}
.like-song tbody{
  border-top: 1px solid #aea5a5ab !important;
  max-width: 100%;
  position: relative;
}
.like-song th {
  color: #aea5a5ab;
  border: 0 !important;
}
.like-song td {
  border: 0 !important;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.like-song td svg{
  color: #15c54b;
  margin-right: 25px;
}

.table-img {
  display: flex;
  align-items: center;
}
.like-song tbody tr:hover{
  background-color: hsla(0,0%,100%,.1);
  transition: 0.5;
}
.table-img img {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}
.like-song .number svg{
  display: none;
}
.like-song tbody tr:hover .number svg{
  display: block;
  position: absolute;
  left:0;
}
.like-song tbody tr:hover .number span{
  display: none;
}
.content-start{
  background-color: var(--background-base);
  isolation: isolate;
}
.bg-color-arg{
  --background-base: #121212;
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
  background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.6)),to(var(--background-base))),var(--background-noise);
  background-image: linear-gradient(rgba(0,0,0,.6) 0,var(--background-base) 100%),var(--background-noise);
  height: 232px;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.foreign-theme{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -ms-flex-line-pack: start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -ms-grid-row-align: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: visible!important;
  position: relative;
}
.host{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-content: flex-start;
  border-color: transparent;
  border-style: solid;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: inherit;
  height: 100%;
  left: 0;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
  width: 100%;
  z-index: -1;
}
.size-observer{
  height: calc(100% + 1px);
  float: left;
  -webkit-box-flex: inherit;
  -ms-flex-positive: inherit;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: 0;
  -webkit-box-sizing: inherit!important;
  box-sizing: inherit!important;
  flex-basis: 0;
  flex-grow: inherit;
  flex-shrink: 0;
  margin: 0;
  max-height: 1px;
  max-width: 1px;
  overflow: visible;
  padding: 0;
  pointer-events: none;
  position: relative;
  width: inherit;
  z-index: -1;
}
.os-resize-observer{
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
  left: 0;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: -1;
  height: 1000%;
  min-height: 1px;
  min-width: 1px;
  width: 1000%;
}
.os-glue{
  margin: 0px;
  height: 104px;
  width: 1142px;
  max-height: 100%;
  max-width: 100%;
  pointer-events: none;
}
.os-viewport{
  -webkit-overflow-scrolling: touch;
  bottom: 0;
  -webkit-box-sizing: inherit!important;
  box-sizing: inherit!important;
  direction: inherit!important;
  left: 0;
  margin: 0;
  outline: none!important;
  padding: 0;
  position: absolute;
  resize: none!important;
  right: 0;
  top: 0;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.edit-img-button{
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
  padding: 0;
  text-align: center;
  width: 100%;
  height: 100%;
}
.icon{
  margin-top: 16px;
  -webkit-transition: opacity .2s;
  transition: opacity .2s;
}
.sub-tit{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
}
</style>