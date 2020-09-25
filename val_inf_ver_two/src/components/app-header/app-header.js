import React, {Component} from "react"
import {connect} from "react-redux"
import {getWekendDate, goToAnotherDay} from "../../redux/actions";
import "../../scss-stylec/main.scss"
const DateListItem= ({dates}) => {
   const {date,active}=dates
    let className = ''
    if(active)
        className = 'active'
    if(!active)
        className = ''

        return (
            <div className={className}>
                {date}
            </div>
        )

    }

const DateList = ({dates,goToAnotherDay}) => {
    return(
        dates.map((dates) => {
                        return (
                            <li key={dates.id}
                            onClick={()=>goToAnotherDay(dates.reqDate)}
                            >
                                <DateListItem dates={dates} />
                            </li>
                        )
                    }
                )
    )
}

class AppHeader extends Component {
    componentDidMount() {
        this.props.getWeekendDate()
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.newData!==prevProps.newData){
    //         this.props.getWeekendDate()
    //         console.log("update")
    //     }
    // }

    render() {
        const {dates,goToAnotherDay} = this.props
        return (
            <div className='main_cont'>
                <h1 className='header_h'>Currency informer</h1>
            <ul className='header_container'>
                <DateList dates={dates} goToAnotherDay={goToAnotherDay}/>
            </ul>
            </div>
        )
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        getWeekendDate: getWekendDate(dispatch),
        goToAnotherDay:(reqDate)=>dispatch(goToAnotherDay((reqDate)))
    }
}

const MapStateToProps = (state) => {
    return {
        dates: state.dates,
        newData:state.newData
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(AppHeader)