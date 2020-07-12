import {getData} from "@/api/mokeApi.js"

export default {
  namespace:'center',
  state:{
    data:[]
  },
  effects:{
    *getData( {payload}, {call,put} ) {
      const data = yield call(getData)
      console.log(data,"models中的data")
      if(Array.isArray(data.data.list)&&data.data.list.length > 0){
        yield put({
          type:'getDataSuccess',
          payload:data.data.list
        })
      }else{
        yield put({
          type:'getDataSuccess',
          payload:[]
        })
      }
    }
  },
  reducers:{
    getDataSuccess(state,action){
      return {...state,data:action.payload}
    }
  }
}