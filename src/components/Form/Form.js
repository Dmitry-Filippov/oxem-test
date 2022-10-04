import { useEffect, useState } from "react";
import "./Form.scss";

const Form = () => {
  const rate = 0.035;
  const [carPrice, setCarPrice] = useState(2600000);
  const [initialFee, setInitialFee] = useState(15);
  const [initialPrice, setInitiatPrice] = useState(
    Math.round(carPrice * (initialFee / 100))
  );
  const [monthsCount, setMonthsCount] = useState(60);
  const [monthPay, setMonthPay] = useState(
    (carPrice - initialPrice) *
      ((rate * Math.pow(1 + rate, monthsCount)) /
        (Math.pow(1 + rate, monthsCount) - 1))
  );
  const [totalPay, setTotalPay] = useState(
    monthsCount * monthPay + initialPrice
  );

  useEffect(() => {
    setInitiatPrice(Math.round(carPrice * (initialFee / 100)));
  }, [carPrice, initialFee]);

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
      }}
    >
      <ul className="form__inputs">
        <li className="form__input-item">
          <label className="form__label">Стоимость автомобиля</label>
          <div className="form__input">
            <div className="form__text-wrpr">
              <p className="form__text">{beautifyPrice(carPrice)}</p>
              <p className="form__text">&#8381;</p>
            </div>
            {/* <div className="range-wrapper"> */}
            <input
              className="form__range"
              type="range"
              min={1000000}
              max={6000000}
              value={carPrice}
              onChange={(e) => {
                setCarPrice(e.target.value);
              }}
            />
            {/* </div> */}
          </div>
        </li>
        <li className="form__input-item">
          <label className="form__label">Первоначальный взнос</label>
          <div className="form__input form__input_initial">
            <div className="form__text-wrpr">
              <p className="form__text">{beautifyPrice(initialPrice)}</p>
              <p className="form__text form__text_initial">{`${initialFee}%`}</p>
            </div>
            {/* <div className="range-wrapper"> */}
            <input
              className="form__range"
              type="range"
              min={10}
              max={60}
              value={initialFee}
              onChange={(e) => {
                setInitialFee(e.target.value);
              }}
            />
            {/* </div> */}
          </div>
        </li>
        <li className="form__input-item">
          <label className="form__label">Срок лизинга</label>
          <div className="form__input">
            <div className="form__text-wrpr">
              <p className="form__text">{monthsCount}</p>
              <p className="form__text">мес.</p>
            </div>
            {/* <div className="range-wrapper"> */}
            <input
              className="form__range"
              type="range"
              min={1}
              max={60}
              value={monthsCount}
              onChange={(e) => {
                setMonthsCount(e.target.value);
              }}
            />
            {/* </div> */}
          </div>
        </li>
      </ul>
      <div className="form__totals-wrpr">
        <ul className="form__totals">
          <li>
            <p className="form__label">Сумма договора лизинга</p>
            <p className="form__total">
              {beautifyPrice(Math.round(totalPay))}&#8381;
            </p>
          </li>
          <li>
            <p className="form__label">Ежемесячный платеж от</p>
            <p className="form__total">
              {beautifyPrice(Math.round(monthPay))}&#8381;
            </p>
          </li>
        </ul>
        <button className="form__submit" type="submit">
          Оставить заявку
        </button>
      </div>
    </form>
  );
};

export default Form;
