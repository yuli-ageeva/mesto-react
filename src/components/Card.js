import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card(props) {
  const card = props.card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `places__like ${isLiked && 'places__like_active'}`
  );

  function handleCard() {
    props.onClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <article className="places__card">
      <img className="places__image" src={card.link} alt={card.name} onClick={handleCard}/>
      <div className="places__description">
        <h3 className="places__name">{card.name}</h3>
        <div className="places__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="places__like-number">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="places__button_delete" type="button" aria-label="удалить"
                        onClick={handleDeleteClick}></button>}
    </article>
  );
}

export default Card;
