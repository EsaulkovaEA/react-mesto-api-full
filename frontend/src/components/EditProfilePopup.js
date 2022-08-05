import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "../components/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading || "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_name"
          id="input-name"
          placeholder="Введите имя"
          required
          type="text"
          name="nameInput"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="input-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_job"
          id="input-job"
          placeholder="Введите занятие"
          required
          type="text"
          name="jobInput"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="input-job-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
