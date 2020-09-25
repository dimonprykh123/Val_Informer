import React from "react"
import ValList from "../val-list/val-list";
import AppHeader from "../app-header/app-header";
import Search from "../search/search";
import SearchResult from "../search-res/search-res";
import Calc from "../cacl/calc";
import WeekList from "../week-list/week-list";
import "../../scss-stylec/main.scss"

const App = () => {
    return (
        <div className='main_container'>
            <AppHeader/>
            <div className='plus_cont'>
            <div className='search_container'>
                <Search/>
                <SearchResult/>
            </div>
            <Calc/>
            </div>
            <div className='convergen_container'>
                <ValList/>
                <WeekList/>
            </div>
        </div>
    )
}
export default App