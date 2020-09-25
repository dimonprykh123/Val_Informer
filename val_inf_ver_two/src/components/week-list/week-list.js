import React, {Component} from 'react'
import {connect} from 'react-redux'
import WeekIteam from "../week-item/week-item";
import Loading from "../loading/loading";
import ErrorIndicator from "../error-indicator/error-indicator";
import Empty from "../empty/empty";
import "../../scss-stylec/main.scss"
const WeekComponent = ({weekData}) =>{
    return(
        <ul className='week_container'>
            <div>
            {
                weekData.map((data)=>{
                    return(
                        <li key={data.data}>
                            <WeekIteam {...data}/>
                        </li>
                    )
                })
            }
            </div>
        </ul>
    )
}
class WeekList extends Component{
    render() {
    const {weekData,loading,error}=this.props
        console.log(weekData.length)
        if(!loading && weekData.length===0) {
            return (
                <Empty/>
            )
        }
        if(loading){
            return (
                <Loading/>
            )
        }
        if(!loading && weekData.length===7)
            return(
                <WeekComponent weekData={weekData}/>
            )
    if(error){
        return (
            <ErrorIndicator/>
        )
    }
}
}
const MapStateToProps = (state) => {
    return {
        weekData: state.weekendData,
        loading:state.weekendDataLoading,
        error:state.weekendDataError
    }
}
export default connect(MapStateToProps,null)(WeekList)