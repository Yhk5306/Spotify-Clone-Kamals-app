import Api from "@/services/Api";

export default {
    getNewAlbums(){
        return Api().get('getLatest')
    },
    UserTopTracks(offset){
        return Api().post('userTopTracks',offset)
    },
    getTopArtists(offset){
        return Api().post('getTopArtists',offset)
    },
    getMyPlayLists(offset){
        return Api().post('MyPlaylists',offset)
    }
}