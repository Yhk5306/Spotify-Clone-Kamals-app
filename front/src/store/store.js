import { createStore } from "vuex";

export default createStore({
    strict:true,
    search:'',
    songDuration: '',
    position:'',
    state:{
        paused:'',
        track:{
            name: "",
            uri:"",
            images: [
                { url:'' }
            ],
            group:{
                name:''
            },
            artists: [
                {
                    name: "",
                    url:'',
                }
            ],
            estimated_duration:'',
        },
        que:[{
            name:'',
            uri:'',
            duration_ms:'',
            album:{
                name:'',
                images:[{
                    url:''
                }],
                release_date:'',
            },
            artists:[{
                name:'',
                id:''
            }]
        }],
    },
    mutations:{
        //Current track,duration,position comes from app.vue
        currentTrack(state,track){
            state.track = track
        },
        getDuration(state,songDuration){
            state.songDuration = songDuration;
        },
        getPosition(state,position){
            state.position = position;
        },
        isPaused(state,paused){
          state.paused = paused;
        },
        //search param comes from client/src/components/Header/TopHeader.vue
        searchParam(state,search){
            state.search = search;
        },
        //Queue comes from client/src/components/SearchResults/Track.vue
        GetQueue(state,que){
            state.que = que;
        },
        updateQue(state,newValue){
            state.que = newValue
        }
    },
    actions:{
        currentTrack({commit},track){
            commit('currentTrack',track)
        },
        getDuration({commit},songDuration){
          commit('getDuration',songDuration)
        },
        getPosition({commit},position){
            commit('getPosition',position);
        },
        searchParam({commit},search){
          commit('searchParam',search)
        },
        isPaused({commit},paused){
          commit('isPaused',paused)
        },
        GetQueue({commit},que){
            commit('GetQueue',que)
        },
        updateQue({commit},que){
            commit('updateQue',que)
        }
    }
});