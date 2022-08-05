import React from "react";
import ErrorIcon from "../images/Error.svg";
import SuccesIcon from "../images/Succes.svg";

function InfoTooltip({ isOpen, onClose, isAuthSuccesfull }) {
  return (
    <>
      <div className={`popup popup_info-tooltip ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          {isAuthSuccesfull ? (
            <div className="popup__form">
              <img src={`${SuccesIcon}`} alt="Успешно" className="popup__img-tooltip" />
              <h2 className="popup__title popup__title_tooltip">
                Вы успешно зарегистрировались!
              </h2>
            </div>
          ) : (
            <div className="popup__form">
              <img src={`${ErrorIcon}`} alt="Ошибка" className="popup__img-tooltip" />
              <h2 className="popup__title popup__title_tooltip">
                Что-то пошло не так. Попробуйте ещё раз!
              </h2>
            </div>
          )}
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
