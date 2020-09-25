import React from "react";

export const createOptions = (data) => {
    return data.map(({cc, id}) => {
        return (
            <option key={id}>
                {cc}
            </option>
        )
    })
}