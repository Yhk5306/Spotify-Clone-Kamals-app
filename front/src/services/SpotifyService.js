import Api from "@/services/Api";

export default {
    SpotiPlayLiST (credentials){
        return Api().get('play-list',{withCredentials: true})
    },
    GetTracks (trackId){
        return Api().get('play-list/'+trackId,{withCredentials: true})
    },
    getAlbumDetail (trackId,offset){
        return Api().post('album-details/'+trackId,offset,{withCredentials: true})
    },
    getToken(){
        return Api().get('token')
    },
    getSong(credentials){
        return Api().post('changeSong',credentials)
    },
    getTopAlbums(){
        return Api().get('getPopular')
    },
    getFavorite(credentials){
        return Api().post('liked',credentials)
    }
}