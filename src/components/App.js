import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
    <div className="root">
      <div className="root__content">
        <Header/>
        <Main onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}/>
        <Footer/>
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name={'profile'}
          title={'Редактировать профиль'}
          buttonName={'Coхранить'}>
          <label className="popup__section">
            <input className="popup__input popup__input_type_name" id="name-input" type="text"
                   name="name"
                   placeholder="Ваше имя" maxLength="40" minLength="2" required/>
            <span className="popup__input-error name-input-error"></span>
          </label>
          <label className="popup__section">
            <input className="popup__input popup__input_type_description" id="description-input"
                   type="text"
                   name="description"
                   placeholder="О себе" maxLength="200" minLength="2" required/>
            <span className="popup__input-error description-input-error"></span>
          </label>
        </PopupWithForm>

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
        <PopupWithForm isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       name={'avatar'}
                       title={'Обновить аватар'}
                       buttonName={'Coхранить'}>
          <label className="popup__section">
            <input className="popup__input popup__input_type_link" id="avatar-input" type="url"
                   name="avatar"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error avatar-input-error"></span>
          </label>
        </PopupWithForm>
      </div>
    </div>
  );
}

export default App;
