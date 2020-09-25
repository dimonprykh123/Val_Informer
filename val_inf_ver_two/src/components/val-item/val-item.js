import React from "react"

const ValItem = ({name,cc,rate})=> {
    return(
        <div>
            {cc}-{name}:{rate}
        </div>
    )
}
export default ValItem