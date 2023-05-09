function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} aria-label="закрыть"></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit} novalidate>
          {props.children}
          <button className="popup__submit-button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
