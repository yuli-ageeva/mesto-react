import React from "react";
import Card from "./Card"
import CurrentUserContext from "../context/CurrentUserContext";

function Main(props) {
  const cards = props.cards;
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка профиля"/>
          <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
        </div>
        <div className="profile__info">
          <div className="profile__author">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__modify" type="button"
                    aria-label="открыть"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="добавить"></button>
      </section>
      <section className="places">
        {cards.map(card => (
          <Card card={card} key={card._id} onClick={props.onCardClick} onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </main>
  )
}

export default Main
