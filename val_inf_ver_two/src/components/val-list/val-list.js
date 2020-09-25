import React, {Component} from "react"
import {connect} from "react-redux"
import withNBUService from "../hoc/with-NBUService";
import {getInitialData, getNewData, getWeekDate} from "../../redux/actions";
import Loading from "../loading/loading";
import ErrorIndicator from "../error-indicator/error-indicator";
import ValItem from "../val-item/val-item";
import "../../scss-stylec/main.scss"
const ValLIstComponent = ({dayData,dates,getWeekDate}) => {
    return (
        <ul className='val_container'>
            {
                dayData.map((prop) => {
                    return (
                        <li key={prop.id}
                         onClick={()=>getWeekDate(prop.cc,dates)}
                        >
                            <ValItem {...prop}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}

class ValList extends Component {
    componentDidMount() {
        this.props.getInitialData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newData !== this.props.newData) {
            this.props.getNewData(this.props.newData)
        }
    }

    render() {
        const {loading, err, dayData,dates,getWeekDate} = this.props
        if (loading) {
            return (
                <div className='loading_comp'>
                <Loading/>
                </div>
            )
        }
        if (err) {
            return (
                <ErrorIndicator/>
            )
        }
        if (!loading) {
            return (
                <ValLIstComponent getWeekDate={getWeekDate} dates={dates} dayData={dayData}/>
            )
        }
    }
}

const MapStateToProps = (state) => {
    return {
        loading: state.loading,
        err: state.err,
        dayData: state.dayData,
        newData: state.newData,
        dates:state.dates
    }
}
const MapDispatchToProps = (dispatch, ownProps) => {
    const {NBUService} = ownProps
    return {
        getInitialData: getInitialData(NBUService, dispatch),
        getNewData: (newData) => getNewData(NBUService, dispatch)(newData),
        getWeekDate: (code,dates)=>getWeekDate(NBUService,dispatch)(code,dates)
    }
}
export default withNBUService()(connect(MapStateToProps, MapDispatchToProps)(ValList))