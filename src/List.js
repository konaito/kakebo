import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { ButtonToolbar } from "react-bootstrap";

const List = ({ userData, onDeleteData, reloadFlag, onLogout, intToStr }) => {
  const [groupedReceipts, setGroupedReceipts] = useState({});
  const [useage, setUseage] = useState(0);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_GAS_ENDPOINT_FROMRECEIPTS;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${endpoint}?userId=${userData?.userId}`,
        );
        const totalUseage = response.data.reduce((sum, item) => {
          return sum + item.price * item.rate;
        }, 0);
        setUseage(totalUseage);

        const sortedData = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        const groupedData = sortedData.reduce((acc, item) => {
          const dateStr = new Date(item.date)
            .toLocaleDateString()
            .split("/")
            .join('<span className="mx-1">/</span>');
          if (!acc[dateStr]) {
            acc[dateStr] = {
              items: [],
              total: 0,
            };
          }
          acc[dateStr].items.push(item);
          acc[dateStr].total += item.price * item.rate;
          return acc;
        }, {});
        setGroupedReceipts({});
        setGroupedReceipts(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userData, reloadFlag]);

  return (
    <>
      <Header
        useage={useage.toFixed(0)}
        userData={userData}
        onLogout={onLogout}
        intToStr={intToStr}
      />
      <div className="container mt-4" style={{marginBottom:"80px"}}>
        {Object.keys(groupedReceipts).map((date) => (
          <div key={date} className="mb-2">
            <div className="d-flex justify-content-between px-2">
              <h4 dangerouslySetInnerHTML={{ __html: date }}></h4>
              <h4>{intToStr(groupedReceipts[date].total.toFixed(0))}円</h4>
            </div>
            <ol className="list-group list-group-flush">
              {groupedReceipts[date].items.map((item, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex justify-content-between fs-5">
                    <div className="w-100 d-flex justify-content-between me-3">
                      <span>${item.price}</span>
                      <span>
                        ¥{intToStr((item.price * item.rate).toFixed(0))}
                      </span>
                    </div>
                    <div>
                      <button
                        className="btn btn-outline-secondary px-2 py-1"
                        onClick={() => onDeleteData(item.id)}
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </div>
                  </div>
                  {item.summary && (
                    <div style={{ fontSize: "12px" }}>{item.summary}</div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
