import React from "react"
import {connect} from 'react-redux'
import {createOptions} from "../../reused-func";
import {setToVal, setFromVal, setInputVal, setConvertVal} from "../../redux/actions";
import "../../scss-stylec/main.scss"
const getNum = (data,cc) =>{
    for(let i=0;i<data.length;i++){
        if(data[i].cc===cc){
            return parseFloat(data[i].rate)
        }
    }
}
const Calc = ({data,setFromVal,setToVal,setInputVal,setConvertVal,from,to,inputVal,convertVal}) => {
    const list = createOptions(data)
    const getRes = (event)=>{
        event.preventDefault()
        setConvertVal(from,to,inputVal)
    }
    return (
        <form onSubmit={getRes} className='calc_form'>
            <select
                onChange={(event)=>setFromVal(getNum(data,event.target.value))
                }>
                {list}
            </select>
            <input type="text" placeholder="00,00" onChange={(event)=>setInputVal(parseFloat(event.target.value))}
            />
            <code>=</code>
            <select
                onChange={(event)=>setToVal(getNum(data,event.target.value))}>
                {list}
            </select>
            <input type="text" value={convertVal.toFixed(2)} disabled={true}/>
            <input type="submit" value="Convert" className='btn'/>
        </form>
    )
}
const MapDispatchToProps = (dispatch) => {
    return {
        setToVal:(to)=>dispatch(setToVal(to)),
        setFromVal:(from)=>dispatch(setFromVal(from)),
        setInputVal:(put)=>dispatch(setInputVal(put)),
        setConvertVal:(from,to,put)=>dispatch(setConvertVal(from,to,put))
    }
}
const MapStateToProps = (state) => {
    return {
        data: state.dayData,
        from:state.from,
        to:state.to,
        inputVal:state.inputVal,
        convertVal:state.convertVal

    }
}
export default connect(MapStateToProps, MapDispatchToProps)(Calc)