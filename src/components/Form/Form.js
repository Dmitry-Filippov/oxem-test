import { useEffect, useState } from "react";
import { sendData } from "../../api/api";
import "./Form.scss";

const Form = () => {
  const rate = 0.035;
  const [carPrice, setCarPrice] = useState(2600000);
  const [carPriceInput, setCarPriceInput] = useState(carPrice);
  const [initialFee, setInitialFee] = useState(15);
  const [initialFeeInput, setInitialFeeInput] = useState(initialFee);
  const [initialPrice, setInitiatPrice] = useState(
    Math.round(carPrice * (initialFee / 100))
  );
  const [monthsCount, setMonthsCount] = useState(60);
  const [monthsCountInput, setMonthsCountInput] = useState(monthsCount);
  const [monthPay, setMonthPay] = useState(
    (carPrice - initialPrice) *
      ((rate * Math.pow(1 + rate, monthsCount)) /
        (Math.pow(1 + rate, monthsCount) - 1))
  );
  const [totalPay, setTotalPay] = useState(
    monthsCount * monthPay + initialPrice
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitiatPrice(Math.round(carPrice * (initialFee / 100)));
  }, [carPrice, initialFee]);

  useEffect(() => {
    setCarPriceInput(carPrice);
  }, [carPrice]);

  useEffect(() => {
    setInitialFeeInput(initialFee);
  }, [initialFee]);

  useEffect(() => {
    setMonthsCountInput(monthsCount);
  }, [monthsCount]);

  useEffect(() => {
    setMonthPay(
      (carPrice - initialPrice) *
        ((rate * Math.pow(1 + rate, monthsCount)) /
          (Math.pow(1 + rate, monthsCount) - 1))
    );
  }, [carPrice, initialPrice, monthsCount]);

  useEffect(() => {
    setTotalPay(monthsCount * monthPay + initialPrice);
  }, [initialPrice, monthPay, monthsCount]);

  function beautifyPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        sendData({
          carPrice: carPrice,
          initialPaymentInPercent: initialFee,
          initialPayment: initialPrice,
          leasingDuration: monthsCount,
          totalPrice: totalPay,
          monthPay: monthPay,
        })
          .then((res) => {
            console.log(res);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(`Ошибка! ${err}`);
            setIsLoading(false);
          });
      }}
    >
      <ul className="form__inputs">
        <li className="form__input-item">
          <label className="form__label">Стоимость автомобиля</label>
          <div className="form__input">
            <div className="form__text-wrpr">
              <input
                disabled={isLoading}
                className="form__text"
                type="text"
                value={beautifyPrice(carPriceInput)}
                onChange={(e) => {
                  const inputValue = Number(e.target.value.split(" ").join(""));
                  if (isNaN(inputValue)) {
                    setCarPriceInput(carPriceInput);
                  } else {
                    setCarPriceInput(inputValue);
                  }
                }}
                onBlur={() => {
                  if (carPriceInput < 1000000) {
                    setCarPrice(1000000);
                    setCarPriceInput(1000000);
                  } else if (carPriceInput > 6000000) {
                    setCarPrice(6000000);
                    setCarPriceInput(6000000);
                  } else {
                    setCarPrice(carPriceInput);
                  }
                }}
              />
              <p className="form__text">&#8381;</p>
            </div>
            <input
              className="form__range"
              type="range"
              min={1000000}
              max={6000000}
              value={carPrice}
              disabled={isLoading}
              onChange={(e) => {
                setCarPrice(e.target.value);
              }}
            />
          </div>
        </li>
        <li className="form__input-item">
          <label className="form__label">Первоначальный взнос</label>
          <div className="form__input form__input_initial">
            <div className="form__text-wrpr">
              <p className="form__text">
                {beautifyPrice(initialPrice)} &#8381;
              </p>
              <div className="form__text form__text_initial">
                <input
                  disabled={isLoading}
                  className="form__text_initial-input"
                  type="text"
                  value={`${initialFeeInput}`}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    if (isNaN(inputValue)) {
                      setInitialFeeInput(initialFeeInput);
                    } else {
                      setInitialFeeInput(inputValue);
                    }
                  }}
                  onBlur={() => {
                    if (initialFeeInput < 10) {
                      setInitialFee(10);
                      setInitialFeeInput(10);
                    } else if (initialFeeInput > 60) {
                      setInitialFee(60);
                      setInitialFeeInput(60);
                    } else {
                      setInitialFee(initialFeeInput);
                    }
                  }}
                />
                <p>%</p>
              </div>
            </div>
            <input
              className="form__range"
              type="range"
              min={10}
              max={60}
              value={initialFee}
              disabled={isLoading}
              onChange={(e) => {
                setInitialFee(e.target.value);
              }}
            />
          </div>
        </li>
        <li className="form__input-item">
          <label className="form__label">Срок лизинга</label>
          <div className="form__input">
            <div className="form__text-wrpr">
              <input
                disabled={isLoading}
                type="text"
                className="form__text"
                value={monthsCountInput}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (isNaN(inputValue)) {
                    setMonthsCountInput(monthsCountInput);
                  } else {
                    setMonthsCountInput(inputValue);
                  }
                }}
                onBlur={() => {
                  if (monthsCountInput < 1) {
                    setMonthsCount(1);
                    setMonthsCountInput(1);
                  } else if (monthsCountInput > 60) {
                    setMonthsCount(60);
                    setMonthsCountInput(60);
                  } else {
                    setMonthsCount(monthsCountInput);
                  }
                }}
              />
              <p className="form__text">мес.</p>
            </div>
            <input
              className="form__range"
              type="range"
              min={1}
              max={60}
              value={monthsCount}
              disabled={isLoading}
              onChange={(e) => {
                setMonthsCount(e.target.value);
              }}
            />
          </div>
        </li>
      </ul>
      <div className="form__totals-wrpr">
        <ul className="form__totals">
          <li>
            <p className="form__label">Сумма договора лизинга</p>
            <p className="form__total">
              {beautifyPrice(Math.round(totalPay))} <span> &#8381;</span>
            </p>
          </li>
          <li>
            <p className="form__label">Ежемесячный платеж от</p>
            <p className="form__total">
              {beautifyPrice(Math.round(monthPay))} <span> &#8381;</span>
            </p>
          </li>
        </ul>
        <button className="form__submit" type="submit" disabled={isLoading}>
          Оставить заявку
        </button>
      </div>
    </form>
  );
};

export default Form;
