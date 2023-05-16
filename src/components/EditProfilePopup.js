import React from "react"
import PopupWithForm from "./PopupWithForm"
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name:name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      name={'profile'}
      title={'Редактировать профиль'}
      buttonName={'Coхранить'}
      onSubmit={handleSubmit}>
      <label className="popup__section">
        <input className="popup__input popup__input_type_name" id="name-input" type="text"
               name="name"
               placeholder="Ваше имя" maxLength="40" minLength="2" value={ name || '' } onChange={handleChangeName} required/>
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__section">
        <input className="popup__input popup__input_type_description" id="description-input"
               type="text"
               name="description"
               placeholder="О себе" maxLength="200" minLength="2" value={ description || '' } onChange={handleChangeDescription} required/>
        <span className="popup__input-error description-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup