import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = ({ userData }) => {
  const [groupedReceipts, setGroupedReceipts] = useState({});

  useEffect(() => {
    const endpoint = process.env.REACT_APP_GAS_ENDPOINT_FROMRECEIPTS;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${endpoint}?userId=${userData.userId}`);

        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        const groupedData = sortedData.reduce((acc, item) => {
          const dateStr = new Date(item.date).toLocaleDateString().split('/').join('<span className="mx-1">/</span>');
          if (!acc[dateStr]) {
            acc[dateStr] = {
              items: [],
              total: 0
            };
          }
          acc[dateStr].items.push(item);
          acc[dateStr].total += item.price * item.rate;
          return acc;
        }, {});

        setGroupedReceipts(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <div className="container mt-4">
      {Object.keys(groupedReceipts).map(date => (
        <div key={date} className="mb-4">
          <div className="d-flex justify-content-between">
            <h4 dangerouslySetInnerHTML={{ __html: date }}></h4>
            <h4>{groupedReceipts[date].total.toFixed(0)}円</h4>
          </div>
          <ol className="list-group list-group-flush">
            {groupedReceipts[date].items.map((item, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between fs-5">
                  <span>${item.price}</span>
                  <span>¥{(item.price * item.rate).toFixed(0)}</span>
                </div>
                {item.summary && <div style={{fontSize:"6px"}}>{item.summary}</div>}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default List;

