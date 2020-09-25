import React, {Component} from "react"
import {connect} from "react-redux"
import Loading from "../loading/loading";
import ErrorIndicator from "../error-indicator/error-indicator";

import Empty from "../empty/empty";
const isEmpty = (obj) => {
    for (let key in obj) {
        if(key===undefined)
            return true
    }
    return false
}
 const SearchedComponent = ({data}) => {
    return data.map(({id, name, cc, rate}) => {
        return (
            <div className='search_res'
                 key={id}>
                {name}-{cc}:{rate}
            </div>
        )
    })
}
class SearchResult extends Component{
    render() {
        const {loading,data,error}=this.props
        if (!loading && data.length === 0) {
            return (
                <div className='not_found'>
                    Nothing to show!
                </div>
            )
        }
        if (loading && data.length===0) {
            return (
                <Loading/>
            )
        }

        if (!loading && data.length!==0 && isEmpty(data[0]) === false ){
            return (
                <SearchedComponent data={data}/>
            )
        }
         if (isEmpty(data[0]) === true && data.length !== 0) {
           return (
              <div>
                  Nothing to show!
              </div>
           )
         }

        if (error) {
            return (
                <ErrorIndicator/>
            )
        }

    }



}
const MapStateToProps = (state) => {
    return {
        loading: state.searchLoading,
        data: state.searchData,
        error: state.searchError
    }
}

const MapDispatchToProps = {
}
export default connect(MapStateToProps, MapDispatchToProps)(SearchResult)