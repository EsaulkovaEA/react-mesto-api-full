import React, { useRef, useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading || "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_avatar"
          placeholder="Аватар"
          required
          type="url"
          name="avatarInput"
          ref={inputRef}
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
