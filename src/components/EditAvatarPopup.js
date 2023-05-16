import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  React.useEffect(() => {
    avatarRef.current.value = ""
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


return (
  <PopupWithForm isOpen={props.isOpen}
                 onClose={props.onClose}
                 name={'avatar'}
                 title={'Обновить аватар'}
                 buttonName={'Coхранить'}
                 onSubmit={handleSubmit}>
    <label className="popup__section">
      <input className="popup__input popup__input_type_link" id="avatar-input" type="url"
             name="avatar"
             placeholder="Ссылка на картинку"
             ref={avatarRef}
             required/>
      <span className="popup__input-error avatar-input-error"></span>
    </label>
  </PopupWithForm>

)
  }

  export default EditAvatarPopup