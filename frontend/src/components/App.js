import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Footer from "./Footer.js";
import { api, auth } from "../utils/Api";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../components/Register";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(null);
  // const [isDeletePopup, setIsDeletePopup] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isAuthSuccesfull, setIsAuthSuccesfull] = useState(false);

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  },[]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getAllCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  function handleUpdateUser(currentUser) {
    setLoading("Сохранение...");
    api
      .editProfile(currentUser)
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(null));
  }
  function handleUpdateAvatar(avatar) {
    setLoading("Сохранение...");
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(null));
  }
  function handleAddPlaceSubmit(name, link) {
    setLoading("Создание...");
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(null));
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const request = isLiked
      ? api.deleteLike(card._id, !isLiked)
      : api.addLike(card._id, !isLiked);
    request
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
      setEmail("");
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsAuthSuccesfull(true);
        history.push("/sign-in");
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthSuccesfull(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(email);
          handleTokenCheck();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthSuccesfull(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
    setCurrentUser({});
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header loggedIn={loggedIn} email={email} onSignOut={signOut} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loading={loading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loading={loading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loading={loading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isAuthSuccesfull={isAuthSuccesfull}
          />
          {/* <PopupWithForm title="Вы уверены?" name="popup_delete-card" buttonText="Да" isOpen={isDeletePopup} onClose={closeAllPopups} onSubmit={handleCardDelete}>
          </PopupWithForm> */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
