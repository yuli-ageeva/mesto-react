import React from "react";

function Card({
                _id,
                name,
                link,
                likes,
                owner,
                onClick,
              }) {

  function handleCard() {
    onClick({name, link})
  }

  return (
    <article className="places__card">
      <img className="places__image" src={link} alt={name} onClick={handleCard}/>
      <div className="places__description">
        <h3 className="places__name">{name}
        </h3>
        <div className="places__likes">
          <button className="places__like" type="button"></button>
          <p className="places__like-number">{likes.length}</p>
        </div>
      </div>
      <button className="places__button_delete" type="button" aria-label="удалить"></button>
    </article>
  )
}

export default Card
