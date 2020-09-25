import {
    DATA_CLEAR,
    DATA_ERROR,
    DATA_LOADED,
    DATA_REQUESTED,
    DATE_CREATOR, ERROR_FALSE,
    SET_CC_SEARCH,
    SET_DATE_CREATOR,
    SET_DAY_SEARCH, SET_FROM_VAL, SET_INPUT_VAL,
    SET_MONTH_SEARCH,
    SET_SEARCH_DATA_ERROR,
    SET_SEARCH_DATA_LOADING,
    SET_SEARCH_DATA_REQUEST, SET_SUM_VAL, SET_TO_VAL,
    SET_YEAR_SEARCH, WEEK_DATA_ERROR, WEEK_DATA_LOADING, WEEK_DATA_REQUEST
} from "../types";

const errorFalse = () => {
    return {
        type: ERROR_FALSE
    }
}
const dataLoaded = (data) => {
    return {
        type: DATA_LOADED,
        payload: data
    }
}

const dataError = (err) => {
    return {
        type: DATA_ERROR,
        payload: err
    }
}

const dataRequested = () => {
    return {
        type: DATA_REQUESTED
    }
}
const weekDataLoaded = (data) => {
    return {
        type: WEEK_DATA_LOADING,
        payload:data
    }
}

const weekDataErr = (err) => {
    return {
        type: WEEK_DATA_ERROR,
        payload: err
    }
}

const weekDataRequest= () => {
    return {
        type: WEEK_DATA_REQUEST
    }
}
const serchLoading = (data) => {
    return {
        type: SET_SEARCH_DATA_LOADING,
        payload: data
    }
}
const searchRequest = () => {
    return {
        type: SET_SEARCH_DATA_REQUEST
    }
}
const searchError =(err) =>{
    return {
        type: SET_SEARCH_DATA_ERROR,
        payload: err
    }
}
const dateCreated = (dates) => {
    return {
        type: DATE_CREATOR,
        payload: dates
    }
}


export const getInitialData = (NBUService, dispatch) => () => {
    dispatch(dataRequested())
    NBUService.getTodayInfo()
        .then((body) => {
            dispatch(dataLoaded(body))
        })
        .catch((err) => {
            dispatch(dataError(err))
        })

}
export const getNewData = (NBUService, dispatch) => (newData) => {
    dispatch(dataRequested())
    NBUService.getNewDate(newData)
        .then((body) => dispatch(dataLoaded(body)))
        .catch((err) => dispatch(dataError(err)))
}
export const getWeekDate =(NBUService,dispatch)=>async (code,dates)=>{
    dispatch(weekDataRequest())
    const arr= []
    async function func(dates) {
         for (let date of dates) {
                await NBUService.getSearchInfo(code, date.reqDate)
                     .then((body) => arr.push(body[0]))
                     .catch((err) => dispatch(weekDataErr(err)))
         }
     }
    await func(dates)
    dispatch(weekDataLoaded(arr))

}

export const getSearchInfo = (NBUService, dispatch) => (val, date) => {
    dispatch(searchRequest())
    NBUService.getSearchInfo(val, date)
        .then((body) =>dispatch(serchLoading(body)))
        .catch((err) => dispatch(searchError(err)))
}

export const getWekendDate = (dispatch) => () => {
    const nowDate = new Date();
    const oneDay = 86400 * 1000;
    const todayInSec = nowDate.getTime()
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(todayInSec - oneDay * i)
        let year = newDate.getFullYear()
        let month = (newDate.getUTCMonth() + 1).toString().padStart(2, "0")
        let day = newDate.getDate().toString().padStart(2, "0")
        let reqDate = `${year}${month}${day}`
        dates.push({date: newDate.toLocaleDateString(), id: i, reqDate: reqDate, active:false})
    }
    dispatch(dateCreated(dates))
}

export const goToAnotherDay =(reqDate) => {
     return  {
        type: SET_DATE_CREATOR,
        payload: reqDate
    }

}
export const searchDay = (day) => {
    return {
        type: SET_DAY_SEARCH,
        payload: day
    }
}

export const searchMonth = (month) => {
    return {
        type: SET_MONTH_SEARCH,
        payload: month
    }
}

export const searchYear = (year) => {
    return {
        type: SET_YEAR_SEARCH,
        payload: year
    }
}
export const searchCc = (cc) => {
    return {
        type: SET_CC_SEARCH,
        payload: cc
    }
}
export const setFromVal = (from) =>{
    return{
        type:SET_FROM_VAL,
        payload:from
    }
}
export const setToVal = (to) =>{
    return{
        type:SET_TO_VAL,
        payload:to
    }
}
export const setInputVal = (put) =>{
    return{
        type:SET_INPUT_VAL,
        payload:put
    }
}
export const setConvertVal = (from,to,put) =>{
    const result = (from*put)/to
    return{
        type:SET_SUM_VAL,
        payload:result
    }
}