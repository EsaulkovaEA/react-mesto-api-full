import { useState, useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(name, link);
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="popup_add-place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading || "Создать"}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_place"
          value={name}
          onChange={handleChangeName}
          placeholder="Название"
          required
          type="text"
          name="placeInput"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_link"
          value={link}
          onChange={handleChangeLink}
          placeholder="Ссылка на картинку"
          required
          type="url"
          name="linkInput"
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
