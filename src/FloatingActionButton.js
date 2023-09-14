import React, { useState, useEffect } from "react";
import axios from "axios";

const FloatingActionButton = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [nowRate, setNowRate] = useState(null);
    const [todayDate, setTodayDate] = useState("");

    useEffect(() => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        setTodayDate(formattedDate);
    }, []);

    useEffect(() => {
        const endpoint = process.env.REACT_APP_GAS_ENDPOINT_RATES;
        axios
            .get(endpoint)
            .then((response) => {
                if (response.data.status === 200) {
                    const roundedRate = parseFloat(response.data.data.jpyusd.toFixed(2));
                    setNowRate(roundedRate);
                } else {
                    console.error(
                        "Failed to fetch the exchange rate:",
                        response.data.message,
                    );
                }
            })
    }, []);

    const toggleModal = () => {
        setModalOpen((prevState) => !prevState);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary rounded-circle shadow-sm position-fixed border-0"
                style={{
                    height: "60px",
                    width: "60px",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#1C9BF1",
                }}
                onClick={toggleModal}
            >
                <i className="fa-solid fa-plus fa-xl"></i>
            </button>

            {isModalOpen && (
                <ModalContent
                    onClose={toggleModal}
                    onSubmitData={props.onSubmitData}
                    nowRate={nowRate}
                    todayDate={todayDate}
                />
            )}
        </>
    );
};

const ModalContent = ({
    onClose,
    onSubmitData,
    nowRate,
    todayDate: initialTodayDate,
}) => {
    const [rate, setRate] = useState(null);
    const [price, setPrice] = useState(null);
    const [PriceChanged, setPriceChanged] = useState(true);
    const [isRateError, setIsRateError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [summary, setSummary] = useState("");
    const [date, setDate] = useState(initialTodayDate);

    useEffect(() => {
        setRate(nowRate);
    }, [nowRate]);

    const handleRateChange = (e) => {
        setRate(e.target.value);
        if (isNaN(e.target.value) || e.target.value.trim() === "") {
            setIsRateError(true);
        } else {
            setIsRateError(false);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleFormSubmit = () => {
        const data = {
            date: date, // ここもdateを使用するように変更
            rate: rate,
            price: price,
            summary: summary,
        };
        console.log(data);
        onSubmitData(data);
        onClose();
    };

    const handlePriceChange = (e) => {
        setPriceChanged(false);
        setPrice(e.target.value);
        if (isNaN(e.target.value) || e.target.value.trim() === "") {
            setIsPriceError(true);
        } else {
            setIsPriceError(false);
        }
    };

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    };

    return (
        <div
            className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-end"
            style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
        >
            <div
                className="w-100 p-2"
                style={{ height: "70%", backgroundColor: "white" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* <tr>
                    <td colSpan={2} className="py-2"> */}
                        <div className="d-flex justify-content-end w-100 mb-2">
                            <button
                                type="button"
                                className={`btn me-2 ${isPriceError || isRateError || PriceChanged
                                    ? "btn-muted"
                                    : "btn-primary"
                                    }`}
                                disabled={isPriceError || isRateError || PriceChanged}
                                onClick={handleFormSubmit}
                            >
                                登録する
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary border-0"
                                onClick={onClose}
                            >
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    {/* </td>
                </tr> */}
                <table className="table table-borderless">
                    <tr>
                        <th className="fw-normal py-2">日付</th>
                        <td>
                            <input
                                type="date"
                                className="form-control"
                                value={date} // ここもdateを使用するように変更
                                onChange={handleDateChange} // onChangeハンドラを設定
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="fw-normal py-2">レート</th>
                        <td className="input-group py-2 flex-grow-1">
                            <span
                                className="input-group-text fw-bold"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <span
                                    className={nowRate === rate ? "text-success" : "text-muted"}
                                >
                                    now
                                </span>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="rateInput"
                                aria-label="Amount (to the nearest dollar)"
                                value={rate}
                                onChange={(e) => {
                                    handleRateChange(e);
                                }}
                            />
                            <span
                                className="input-group-text"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                円<span className="mx-1">/</span>ドル
                            </span>
                        </td>
                    </tr>
                    {isRateError && (
                        <tr>
                            <th></th>
                            <td className="text-danger">
                                <i className="fa-solid fa-circle-exclamation text-danger"></i>
                                正しい値を入力してください
                            </td>
                        </tr>
                    )}
                    <tr>
                        <th className="fw-normal py-2">金額</th>
                        <td className="input-group py-2">
                            <span
                                className="input-group-text"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                $
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e) => {
                                    handlePriceChange(e);
                                }}
                            />
                        </td>
                    </tr>
                    {isPriceError && (
                        <tr>
                            <th></th>
                            <td className="text-danger">
                                <i className="fa-solid fa-circle-exclamation text-danger"></i>
                                正しい値を入力してください
                            </td>
                        </tr>
                    )}
                    <tr>
                        <th className="fw-normal py-2">概要</th>
                        <td>
                            <textarea
                                className="form-control py-2"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                style={{ resize: "none" }}
                                value={summary}
                                onChange={handleSummaryChange}
                            ></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default FloatingActionButton;
