import Api from "@/services/Api";

export default {
    Connect(device){
      return Api().post('connectDevice',device)
    },
    Play(){
        return Api().post('play')
    },
    Pause(){
        return Api().post('pause')
    },
    Like(track){
      return Api().post('likeTrack',track)
    },
    RemoveLike(track){
      return Api().post('removedLike',track)
    },
    Volume(volume){
        return Api().post('volume',{volume})
    },
    SkipToNext(){
        return Api().post('skipToNext')
    },
    SkipToPrevious(){
        return Api().post('SkipToPrevious')
    },
    Repeat(){
        return Api().post('Repeat')
    },
    Shuffle(){
        return Api().post('Shuffle')
    },
    setPosition(position){
        return Api().post('changePosition', {position});
    },
    Queue(artist){
        return Api().post('changeQue', artist);
    },
    getQueue(){
        return Api().get('getQueue');
    }
}
