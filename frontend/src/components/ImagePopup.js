import React from "react";
function ImagePopup({card,onClose}) {
  return (
    <div className={`popup popup_view-image ${card && 'popup_opened'}`} >
      <figure className="popup__figure">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image"
          alt={card?.name}
          src={card?.link}
        />
        <figcaption className="popup__caption">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
