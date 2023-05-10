import React from "react";
import api from "../utils/Api";
import Card from "./Card"

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setNewAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUserInfo, dataCards]) => {
        setUserName(dataUserInfo.name);
        setUserDescription(dataUserInfo.about);
        setNewAvatar(dataUserInfo.avatar);
        setCards(dataCards.reverse())

      })
      .catch((err) => {
        console.log(err);
      });

  },[])

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Аватарка профиля"/>
          <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
        </div>
        <div className="profile__info">
          <div className="profile__author">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={props.onEditProfile} className="profile__modify" type="button"
                    aria-label="открыть"></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="добавить"></button>
      </section>
      <section className="places">
        {cards.map(card => (
          <Card {...card} key={card._id} onClick={props.onCardClick}/>
        ))}
      </section>
    </main>
  )
}

export default Main
