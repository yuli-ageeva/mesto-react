import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_zoom ${card ? 'popup_opened' : ''}`}>
      <div className="popup__card-container">
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={card?.name}/>
          <figcaption className="popup__caption">{card && card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
      </div>
    </div>)
}

export default ImagePopup
