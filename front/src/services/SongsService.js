import Api from "@/services/Api";

export default {
    getAllsongs (credentials){
        return Api().get('songs')
    },
    postSongs(song){
        return Api().post('songs',song)
    },
    ShowSong (songId){
        return Api().get('songs/'+songId)
    }
}