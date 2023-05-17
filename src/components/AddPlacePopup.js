import React from "react"
import PopupWithForm from "./PopupWithForm"


function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  return (<PopupWithForm isOpen={props.isOpen}
                         onClose={props.onClose}
                         name={'add'}
                         title={'Новое место'}
                         buttonName={'Создать'}
                         onSubmit={handleSubmit}>
      <label className="popup__section">
        <input className="popup__input popup__input_type_title" id="title-input" type="text"
               name="name"
               placeholder="Название" maxLength="30" minLength="2" required value={name}
               onChange={handleNameChange}/>
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__section">
        <input className="popup__input popup__input_type_link" id="link-input" type="url"
               name="link"
               placeholder="Ссылка на картинку" required value={link}
               onChange={handleLinkChange}/>
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup