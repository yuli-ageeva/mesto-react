import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUserInfo, dataCards]) => {
        setCurrentUser(dataUserInfo);
        setCards(dataCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(userInfo) {
    api.setNewInfo(userInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    api
      .setNewAvatar(avatarInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__content">
          <Header/>
          <Main onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}/>
          <Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}>
          </EditProfilePopup>

          <PopupWithForm isOpen={isAddPlacePopupOpen}
                         onClose={closeAllPopups}
                         name={'add'}
                         title={'Новое место'}
                         buttonName={'Создать'}>
            <label className="popup__section">
              <input className="popup__input popup__input_type_title" id="title-input" type="text"
                     name="name"
                     placeholder="Название" maxLength="30" minLength="2" required/>
              <span className="popup__input-error title-input-error"></span>
            </label>
            <label className="popup__section">
              <input className="popup__input popup__input_type_link" id="link-input" type="url"
                     name="link"
                     placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error link-input-error"></span>
            </label>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <div className="popup popup_confirm">
            <div className="popup__container popup__container-confirm">
              <button className="popup__close-button" type="button" aria-label="закрыть"></button>
              <h2 className="popup__heading-confirm">Вы уверены?</h2>
              <button className="popup__confirm-button" type="submit">Да</button>
            </div>
          </div>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
