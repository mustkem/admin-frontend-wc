import React, { useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'


function CityNameChip() {
    const [menuModal, menuModalHandler] = useState(false)
    return (
        <li className="chip">
            New Delhi
            <FaEllipsisV onClick={() => { menuModalHandler(!menuModal) }} />
            {
                menuModal &&
                <div className="dropdown">
                    <buttn className="btn btn-medium">Delete</buttn>
                </div>
            }

        </li>
    )
}

export default CityNameChip
