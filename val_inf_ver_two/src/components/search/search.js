import React, {Component} from "react"
import {connect} from "react-redux"
import withNBUService from "../hoc/with-NBUService"
import {searchCc, searchDay, searchMonth, searchYear,getSearchInfo} from "../../redux/actions";
import {createOptions} from "../../reused-func";
import "../../scss-stylec/main.scss"
const getNum = (start, end) => {
    const arr = []
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr.map((el) => {
        if(el<10){
            el=`0${el}`
        }
        return (
            <option key={el}>
                {el}
            </option>
        )
    })
}



class Search extends Component {
    getSearchDate =(event)=>{
        const { getSearchInfo,searchCc,searchYear,searchMonth,searchDay}=this.props
        event.preventDefault()
        getSearchInfo(searchCc,`${searchYear}${searchMonth}${searchDay}`)
    }

    render() {
        const {dayData, setYear, setMonth, setDay, setCc} = this.props
        let year = new Date()
        year = year.getFullYear()
        const yearList = getNum(year - 20, year)
        const monthList = getNum(1, 12)
        const dayList = getNum(1, 31)
        const code = createOptions(dayData)

        return(
            <form
                onSubmit={this.getSearchDate}
            className='search_form'>

                <span className='select_group'>

                <select className='first_sel'
                    onChange={(event) => setYear(event.target.value)}>
                    {yearList}
                </select>

                <select className='first_sel'
                    onChange={(event) => setMonth(event.target.value)}>
                    {monthList}
                </select>

                <select className='first_sel'
                    onChange={(event) => setDay(event.target.value)}>
                    {dayList}
                </select>

                <select className='first_sel'
                    onChange={(event) => setCc(event.target.value)}>
                    {code}
                </select>

                </span>

                <input type='submit' value='Search' className='btn'/>
            </form>
        )
    }


}

const MapDispatchToProps =(dispatch,ownProps)=>{
    const {NBUService}=ownProps
return{
    setYear:(year)=>dispatch(searchYear(year)),
    setMonth:(month)=>dispatch(searchMonth(month)),
    setDay:(day)=>dispatch(searchDay(day)),
    setCc:(cc)=>dispatch(searchCc(cc)),
    getSearchInfo:(val,data)=>getSearchInfo(NBUService,dispatch)(val,data)
}
}

const MapStateToProps = (state) => {
    return {
        dayData: state.dayData,
        searchYear:state.searchYear,
        searchMonth:state.searchMonth,
        searchDay:state.searchDay,
        searchCc:state.searchCc
    }
}

export default withNBUService()(connect(MapStateToProps, MapDispatchToProps)(Search))