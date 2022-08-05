import React from "react";

function PopupWithForm({name,title,children,isOpen,onClose,buttonText,onSubmit}) {
  return (
    <>
      <div
        className={`popup popup_${name} ${
          isOpen && "popup_opened"
        }`}
      >
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <form className="popup__form" name={name}  onSubmit={onSubmit} noValidate>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__button" type="submit">
            {buttonText}
          </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
