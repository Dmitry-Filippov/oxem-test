import Form from "../Form/Form";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">
        Рассчитайте стоимость <br></br> автомобиля в лизинг
      </h1>
      <Form />
    </div>
  );
}

export default App;
