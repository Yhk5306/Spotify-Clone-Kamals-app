import Api from "@/services/Api";

export default {
    getArtist (artist){
        return Api().get('artist/'+artist,{withCredentials:true})
    },
    followArtist(artist){
        return Api().post('followArtist',artist)
    },
    unFollowArtistArtist(artist) {
        return Api().post('unFollowArtist',artist)
    },
    getArtistTop(artist){
        return Api().get('top/'+artist,{withCredentials:true})
    },
    getArtistAlbums(artist){
        return Api().get('albums/'+artist,{withCredentials:true})
    },
    artistPlaylists(artist){
      return Api().post('artistPlaylists',{artist:artist})
    },
    getRelatedArtists(artist){
        return Api().get('related/'+artist,{withCredentials:true})
    },
    albumDetail(albumId,offset){
        return Api().post('/album/'+albumId,offset,{withCredentials:true})
    }
}