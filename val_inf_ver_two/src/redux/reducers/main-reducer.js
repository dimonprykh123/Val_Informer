import {
    DATA_ERROR,
    DATA_LOADED,
    DATA_REQUESTED,
    DATE_CREATOR,
    SET_DATE_CREATOR,
    SET_MONTH_SEARCH,
    SET_YEAR_SEARCH,
    SET_DAY_SEARCH,
    SET_CC_SEARCH,
    SET_SEARCH_DATA_LOADING,
    SET_SEARCH_DATA_ERROR,
    SET_SEARCH_DATA_REQUEST,
    ERROR_FALSE,
    SET_FROM_VAL,
    SET_TO_VAL,
    SET_INPUT_VAL,
    SET_SUM_VAL,
    WEEK_DATA_LOADING,
    WEEK_DATA_ERROR,
    WEEK_DATA_REQUEST
} from "../types";

const initialState = {
    dayData: [{cc: "UAH", rate: "1", id: 1, name: "Гривня"}],
    loading: true,
    error: null,
    from: 1,
    to: 1,
    inputVal: 0,
    convertVal: 0,
    searchData: [],
    searchLoading: false,
    searchError: null,
    searchYear: "2000",
    searchMonth: "1",
    searchDay: "1",
    searchCc: "UA",
    weekendData: [],
    weekendDataLoading: false,
    weekendDataError: null,
    dates: [],
    newData: "",

}
const getDayDate = (state, newDate) => {
    const data = initialState.dayData
    const addedData = [...data, ...newDate]
    return {...state, dayData: addedData, loading: false, error: null}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA_LOADED:
            return getDayDate(state, action.payload)
        case DATA_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                dayData: []
            }
        case DATA_REQUESTED:
            return {
                ...state,
                dayData: [],
                loading: true,
                error: null
            }
        case DATE_CREATOR:
            return {
                ...state,
                dates: action.payload
            }
        case SET_DATE_CREATOR:
            const  item = action.payload
            const idx = state.dates.findIndex(({reqDate})=>reqDate===item)
            console.log(idx)
            const fixedIdx = state.dates[idx];
            for(let i = 0;i<state.dates.length;i++){
                state.dates[i].active=false;
            }
            fixedIdx.active=true
            const  newMass =[...state.dates.slice(0,idx),fixedIdx,...state.dates.slice(idx+1)]
            return {...state, newData: action.payload,dates: newMass}
        case SET_YEAR_SEARCH:
            return {...state, searchYear: action.payload}
        case SET_MONTH_SEARCH:
            return {...state, searchMonth: action.payload}
        case SET_DAY_SEARCH:
            return {...state, searchDay: action.payload}
        case SET_CC_SEARCH:
            return {...state, searchCc: action.payload}
        case SET_SEARCH_DATA_LOADING:
            return {...state, searchData: action.payload, searchLoading: false, searchError: null}
        case SET_SEARCH_DATA_REQUEST:
            return {...state, searchData: [], searchLoading: true, searchError: null}
        case SET_SEARCH_DATA_ERROR:
            return {...state, searchData: [], searchLoading: false, searchError: action.payload}
        case ERROR_FALSE:
            return {...state, searchError: null}
        case SET_FROM_VAL:
            return {...state, from: action.payload}
        case SET_TO_VAL:
            return {...state, to: action.payload}
        case SET_INPUT_VAL:
            return {...state, inputVal: action.payload}
        case SET_SUM_VAL:
            return {...state, convertVal: action.payload}
        case WEEK_DATA_LOADING:
            return {...state, weekendData: action.payload, weekendDataLoading: false, weekendDataError: null}
        case WEEK_DATA_ERROR:
            return {...state, weekendData: [], weekendDataLoading: false, weekendDataError: action.payload}
        case WEEK_DATA_REQUEST:
            return {...state, weekendData: [], weekendDataLoading: true, weekendDataError: null}
        default:
            return state
    }
}
export default rootReducer