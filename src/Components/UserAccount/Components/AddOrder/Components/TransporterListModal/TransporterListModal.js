import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";

function SelectTransporter({ transportorsList, selectedTransporterData, handleNext }) {
  const [selectedTransporter, setselectedTransporter] = useState();

  useEffect(() => {
    if (transportorsList && transportorsList.length > 0) {
      setselectedTransporter(transportorsList[0].users._id);
      selectedTransporterData(transportorsList[0].users._id);
    }
  }, [transportorsList, selectedTransporterData]);

  const updateSelectedTranporter = (id) => {
    selectedTransporterData(id);
    setselectedTransporter(id);
  };

  return (
    <div>
      <ul className="list transporter-list">
        {transportorsList &&
          transportorsList.map((item) => {
            item = item.users;
            return (
              <li className="list-item">
                <div
                  onClick={() => updateSelectedTranporter(item._id)}
                  className={`${selectedTransporter === item._id ? "selected" : ""} list-card`}
                >
                  <span className="detail-item">{item.company_name}</span>
                  <span className="detail-item">Rs 5000</span>
                  <span className="detail-item">Expected delivery by 22-Jul-2020 12:30</span>
                  {selectedTransporter === item._id && (
                    <span className="detail-item selected">
                      Selected
                      <FaCheckCircle className="icon" />
                    </span>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
      <div className="btn-wrp multiple-btn">
        <Button onClick={handleNext} type="submit">
          Process Now
        </Button>
        <Button onClick={handleNext} type="submit">
          Add & Process Later
        </Button>
      </div>
    </div>
  );
}

export default SelectTransporter;
