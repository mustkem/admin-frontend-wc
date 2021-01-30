import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux'


import CityNameChip from './CityNameChip/CityNameChip'

const colourOptions = [
    {
        label: "Yamuna Vihar",
        value: '1'
    },
    {
        label: "Krishna  Vihar",
        value: '2'
    },
    {
        label: "Loni",
        value: '3'
    }
]

function ManageStateChip() {
    const dispatch = useDispatch();
    const [selectedOption, handleChangeSelectedOption] = useState(null)
    const [addMoreCityModal, addMoreCityModalHandler] = useState(false)


    const [name, editNameHandler] = useState("Mustkeem");

    const orders = useSelector(state => state.orders.posts)

    const handleChange = selectedOption => {
        handleChangeSelectedOption(selectedOption);
    };
    return (
        <div className="coverage-area-wrp">
            <div className="head">
                <strong>Delhi</strong>
                <button onClick={() => { addMoreCityModalHandler(!addMoreCityModal) }} className="btn btn-idle btn-medium">Add</button>
            </div>
            <div className="coverage-list-wrp">
                <ul className="coverage-list">
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(item => {
                            return (
                                <CityNameChip />
                            )
                        })
                    }
                </ul>
                {
                    addMoreCityModal &&
                    <div className="add-more-items">
                        <Select
                            defaultValue={selectedOption}
                            isMulti
                            name="colors"
                            options={colourOptions}
                            className="select"
                            classNamePrefix="select"
                            onChange={handleChange}
                        />
                        <div className="btn-wrp">
                            <button className="btn btn-idle btn-medium">save</button>
                        </div>
                    </div>
                }

            </div>
        </div>

    )
}

export default ManageStateChip
