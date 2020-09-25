import React from "react"
import {NBUConsumer} from "../NBU-service-context/NBUServiceContext";

const withNBUService = () => (Wrapped) =>{
return(props)=>{
    return(<NBUConsumer>
        {
            (NBUService)=>{
                return(<Wrapped {...props} NBUService={NBUService}/>)
            }
        }
    </NBUConsumer>)
}
}
export default withNBUService