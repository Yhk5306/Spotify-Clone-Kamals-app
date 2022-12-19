<template>
  <div class="ms_content_wrapper padder_top80" :style="{'margin-left':navWidth+'px'}">
    <div class="root">
      <div class="top-container">
        <div class="root-main-view">
          <div class="main-view-container">
            <div class="under-main-view">
              <div style="--scroll:0;" v-if="artist.images.length > 0">
                <div class="artist-bg-img" :style="{'background-image': 'url('+artist.images[0].url+')'}"></div>
                <div class="artist-bg"></div>
              </div>
            </div>
            <div class="horizontal-hidden">
              <div class="resize-observer">
                <div class="observed"></div>
              </div>
              <div class="os-padding">
                <div class="viewport">
                  <div class="os-content">
                    <div class="child-spacer"></div>
                    <div class="main-view-container__scroll-node-child">
                      <main tabindex="-1" aria-label="Name">
                        <section class="artist-page">
                          <div class="artist-page-start">
                            <div class="content-spacing">
                              <div></div>
                              <div class="artist-info">
                            <span class="verified">
                              <div class="verified-bg"></div>
                              <svg role="img" height="24" width="24" class="Svg-ytk21e-0 hFEdcY b0NcxAbHvRbqgs2S8QDg" viewBox="0 0 24 24"><path d="M10.814.5a1.658 1.658 0 012.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 011.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 01-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 01-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 01-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 010-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 011.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"></path></svg>
                              <span class="verified-artist">Verified Artist</span>
                            </span>
                                <span class="artist-name">
                              <h1>{{ artist.name }}</h1>
                            </span>
                                <span class="monthly"> {{ artist.followers.total.toLocaleString() }} Followers </span>
                              </div>
                            </div>
                            <div class="content-start">
                              <div class="bg-color-arg"></div>
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
                                      <div class="content-spacing action-bar" style="height: 280px !important;">
                                        <div class="action-bar-row">
                                          <div class="action-arranger">
                                            <button class="play-artist">
                                          <span class="encore-theme btn-inner" @click="changeSong(songs.tracks.items[0].album.uri,1)">
                                            <span class="icon-wrapper">
                                              <svg  role="img" height="28" width="28" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path  fill="#121212" d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                            </span>
                                          </span>
                                            </button>
                                          </div>
                                          <button class="follow" v-if="followed === false" @click="followArtist(artist.id)">Follow</button>
                                          <button class="follow" v-if="followed === true" @click="unFollowArtist(artist.id)">Unfollow</button>
                                          <button class="others">
                                            <svg role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                                          </button>
                                        </div>
                                        <PopularTracks/>
                                        <section class="discography">
                                          <div class="discography-grid">
                                            <div class="discography-flex">
                                              <div class="discography-header">
                                                <h2>Discography</h2>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="discography-grid">
                                            <div class="section-buttons">
                                              <button @click="open = true">
                                                <span class="selected " v-bind:class="{active:open === true}">Albums</span>
                                              </button>
                                              <button @click="open = false">
                                                <span class="selected" v-bind:class="{active:open === false}" >Related Playlists</span>
                                              </button>
                                            </div>
                                          </div>
                                          <Albums v-if="open === true" :albums="albums" :column="column"/>
                                          <Playlists v-if="open === false" :searchPlaylist="searchPlaylist" :column="column" />
                                        </section>
                                        <RelatedArtist :related="related" :column="column" />
                                        <div class="artist-arranger"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopularTracks from '@/components/ArtistDetails/PopularTracks'
import SpotifyService from "@/services/SpotifyService";
import ArtistService from "@/services/ArtistService";
import Discography from "@/components/ArtistDetails/Albums";
import RelatedArtist from "@/components/ArtistDetails/RelatedArtist";
import Albums from "@/components/ArtistDetails/Albums";
import Playlists from "@/components/ArtistDetails/Playlists";


export default {
  components:{
    Playlists,
    Albums,
    PopularTracks,
    Discography,
    RelatedArtist
  },
  props:['navWidth','column'],//column comes from app.vue
  data(){
    return{
      open:true,
      followed:false,
      artist:{
        followers:{
          total:''
        },
        name:'',
        images:[{
          url:''
        }],
        id:'',
      },
      songs:{
        tracks:{
          items:[{
            album:{
              images:[{
                url:''
              }],
              uri:''
            },
            name:'',
            release_date:'',
            duration_ms:'',
          }]
        }
      },
      albums:{
        items: [{
          id:'',
          uri:'',
          name:'',
          release_date:'',
          images:[{
            url:''
          }]
        }]
      },
      searchPlaylist:{
        playlists:{
          items:[{
            id:'',
            name:'',
            release_date:'',
            owner:{
              display_name:''
            },
            images:[{
              url:''
            }],
          }]
        },
      },
      related:{
        artists:[{
          id:'',
          name:'',
          images:[{
            url:'',
          }]
        }]
      }
    }
  },
  methods:{
    async followArtist(artist){
      await ArtistService.followArtist({artist})
      this.followed = true
    },
    async unFollowArtist(artist){
      await ArtistService.unFollowArtistArtist({artist})
      this.followed = false
    },
    async changeSong(uri,trackNumber){
      await SpotifyService.getSong({
        uri:uri,
        trackNumber:trackNumber
      });
    },
    removeDuplicates(arr) {
      let s = new Set(arr);
      let it = s.values();
      return Array.from(it);
    },
    toggle(){
      this.open = !this.open
    }
  },
  async mounted(){
    window.scrollTo(0, 0);
    const artistId = this.$route.params.artist
    const response = (await ArtistService.getArtist(artistId)).data
    this.artist = response.artist;
    const Playlist = (await ArtistService.artistPlaylists(response.artist.name)).data  //Get playlist by artist name
    this.searchPlaylist = Playlist
    this.albums = (await ArtistService.getArtistAlbums(artistId)).data
    this.related = (await ArtistService.getRelatedArtists(artistId)).data
  },
}
</script>

<style scoped>
:root{
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
}
.ms_content_wrapper{
  padding-top: 64px !important;
  margin-left: 264px;
  margin-right: 15px !important;
}
.root{
  height: 100%;
  position: relative;
  --background-base: #121212;
  --background-highlight: #1a1a1a;
  --background-press: #000;
  --background-elevated-base: #242424;
  --background-elevated-highlight: #2a2a2a;
  --background-elevated-press: #000;
  --background-tinted-base: hsla(0,0%,100%,.07);
  --background-tinted-highlight: hsla(0,0%,100%,.1);
  --background-tinted-press: hsla(0,0%,100%,.04);
  --background-unsafe-for-small-text-base: #121212;
  --background-unsafe-for-small-text-highlight: #121212;
  --background-unsafe-for-small-text-press: #121212;
  --text-base: #fff;
  --text-subdued: #a7a7a7;
  --text-bright-accent: #1ed760;
  --text-negative: #f15e6c;
  --text-warning: #ffa42b;
  --text-positive: #1ed760;
  --text-announcement: #3d91f4;
  --essential-base: #fff;
  --essential-subdued: #727272;
  --essential-bright-accent: #1ed760;
  --essential-negative: #e91429;
  --essential-warning: #ffa42b;
  --essential-positive: #1ed760;
  --essential-announcement: #0d72ea;
  --decorative-base: #fff;
  --decorative-subdued: #292929;
  --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
}
.top-container{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 100%;
  position: relative;
  width: 100%;
  grid-template-areas:
        "top-bar top-bar"
        "nav-bar main-view"
        "now-playing-bar now-playing-bar";
}
.root-main-view{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  grid-area: main-view;
  min-height: 0;
  position: relative;
  width: 100%;
}
.main-view-container{
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-height: 0;
  position: relative;
}
.horizontal-hidden{
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
  overflow: visible !important;
  position: relative;
  height: 100%;
}
.artist-arranger{
  position: relative;
  padding-bottom: 3rem;
  width: 100%;
}
.artist-bg-img{
  -webkit-animation: background-animation 1s linear;
  animation: background-animation 1s linear;
  -webkit-animation-delay: calc(var(--scroll)*-1s);
  animation-delay: calc(var(--scroll)*-1s);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  opacity: 1;
  background-attachment: scroll;
  background-position: 50% 35%;
  background-repeat: no-repeat;
  background-size: cover;
  contain: strict;
  content-visibility: auto;
  height: 40vh;
  min-height: 340px;
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.artist-bg{
  --bgColor: #535353;
  background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise);
  background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),var(--background-noise);
  contain: strict;
  content-visibility: auto;
  height: 40vh;
  min-height: 340px;
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.artist-bg:after{
  -webkit-animation: overlay-animation 1s linear;
  animation: overlay-animation 1s linear;
  -webkit-animation-delay: calc(var(--scroll)*-1s);
  animation-delay: calc(var(--scroll)*-1s);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.6)),to(rgba(0,0,0,.6))),-webkit-gradient(linear,left top,left bottom,from(var(--bgColor)),to(var(--bgColor)));
  background-image: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),linear-gradient(var(--bgColor),var(--bgColor));
  content: "";
  height: 40vh;
  left: 0;
  min-height: 340px;
  opacity: 0;
  position: absolute;
  right: 0;
}
.resize-observer{
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
  border: inherit;
  border-color: transparent;
  border-style: solid;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: inherit;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
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
.observed{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  left: 0px;
  right: auto;
  overflow: visible;
  pointer-events: none;
  top: 0;
  visibility: hidden;
  z-index: -1;
  height: 200%;
  margin: 0;
  padding: inherit;
  width: 200%;
}
.observed:before{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -ms-flex-negative: 0;
  -ms-flex-preferred-size: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  border: inherit;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: "";
  margin: 0;
  padding: inherit;
}
.os-padding{
  bottom: 0;
  direction: inherit;
  height: auto!important;
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto!important;
  z-index: 0;
  overflow: visible;
}
.viewport{
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
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
}
.os-content{
  position: relative;
  visibility: visible;
  padding: 0px;
  height: 100%;
  width: 100%;
  direction: inherit;
  display: block;
}
.os-content::before{
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  -ms-flex-negative: 0;
  content: "";
  display: table;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 0.01px;
  line-height: 0;
  visibility: hidden;
  width: 0.01px;
}
.child-spacer{
  height: 64px;
  position: sticky;
  top: 0;
}
.main-view-container__scroll-node-child{
  min-height: calc(((100vh - 64px) - 90px) - 519px);
  scroll-behavior: smooth;
  isolation: isolate;
  padding-bottom: 32px;
}
.artist-page{
  display: block;
}
.artist-page-start{
  margin-top: -64px;
}
.content-spacing{
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: none;
  overflow: visible;
  position: relative;
  padding: 0 32px;
  height: 40vh;
  max-height: none;
  min-height: 340px;
}
.artist-info{
  -webkit-box-flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-flow: column;
  flex-flow: column;
  justify-content: flex-end;
  z-index: 0;
  align-content: space-between;
}
.verified{
  -webkit-box-align: center;
  align-items: center;
  display: inline-grid;
  gap: 8px;
  grid-template-columns: auto 1fr;
}
.verified-bg{
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  height: 60%;
  justify-self: center;
  width: 60%;
  grid-area: 1/1/2/2;
}
.verified svg {
  grid-area: 1 / 1 / 2 / 2;
  fill: #3d91f4;
}
.verified-artist{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 400;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: inherit;
  font-size: 0.875rem;
}
.artist-name{
  line-height: normal;
  margin-top: 8px;
  overflow: visible;
  text-align: left;
  width: 100%;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.artist-name h1{
  --text-base: #fff;
  margin: 0.08em 0px 0.12em;
  visibility: visible;
  width: 100%;
  font-size: 6rem;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  margin-block: 0px;
  font-weight: 900;
  font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  color: var(--text-base,#000000);
}
.monthly{
  font-size: 1rem;
  line-height: 2;
  margin-top: 4px;
}
.content-start{
  background-color: var(--background-base);
  isolation: isolate;
}
.bg-color-arg{
  background-color: rgb(83, 83, 83);
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
.action-bar{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-bottom: var(--action-bar-padding-bottom,24px);
  padding-top: var(--action-bar-padding-top,24px);
  position: relative;
}
.action-bar:after{
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  -ms-flex-negative: 0;
  content: "";
  display: table;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 0.01px;
  line-height: 0;
  visibility: hidden;
  width: 0.01px;
}
.action-bar-row{
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
}
.action-arranger{
  margin-right: 32px;
}
.play-artist{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.125rem;
  font-weight: 700;
  font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
  display: inline-block;
  position: relative;
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
}
.encore-theme{
  --background-base: #1ed760;
  --background-highlight: #1fdf64;
  --background-press: #169c46;
  --background-elevated-base: #1ed760;
  --background-elevated-highlight: #1ed760;
  --background-elevated-press: #1ed760;
  --background-tinted-base: #1ed760;
  --background-tinted-highlight: #1ed760;
  --background-tinted-press: #1ed760;
  --background-unsafe-for-small-text-base: #1ed760;
  --background-unsafe-for-small-text-highlight: #1ed760;
  --background-unsafe-for-small-text-press: #1ed760;
  --text-base: #000;
  --text-subdued: #000;
  --text-bright-accent: #000;
  --text-negative: #000;
  --text-warning: #000;
  --text-positive: #000;
  --text-announcement: #000;
  --essential-base: #000;
  --essential-subdued: #000;
  --essential-bright-accent: #000;
  --essential-negative: #000;
  --essential-warning: #000;
  --essential-positive: #000;
  --essential-announcement: #000;
  --decorative-base: #000;
  --decorative-subdued: #1abc54;
}
.btn-inner{
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  background-color: var(--background-base,#1ed760);
  color: var(--text-base,#000000);
  display: flex;
  border-radius: 500px;
  font-size: inherit;
  min-block-size: 56px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  inline-size: 56px;
  block-size: 56px;
}
.icon-wrapper{
  display: flex;
  position: absolute;
  top: 14px;
  left: 14px;

}
.follow{
  margin-right: 24px;
  background-color: transparent;
  border: 1px solid hsla(0,0%,100%,.3);
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  line-height: 16px;
  padding: 7px 15px;
  text-align: center;
  text-transform: uppercase;
}
.others{
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background: transparent;
  border: 0;
  color: hsla(0,0%,100%,.6);
  fill: hsla(0,0%,100%,.6);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}
.selected{
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
}
.active{
  background-color: var(--essential-base,#ffffff) !important;
  color: var(--background-base,#000000) !important;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
}
</style>