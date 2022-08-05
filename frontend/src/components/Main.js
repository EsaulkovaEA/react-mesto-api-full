import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  cards,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar-img"
          />
          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser ? currentUser.name : ""}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
            <p className="profile__subtitle">
              {currentUser ? currentUser.about : ""}
            </p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              link={item.link}
              name={item.name}
              likes={item.likes}
              onCardClick={onCardClick}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
