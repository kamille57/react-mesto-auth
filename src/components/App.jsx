import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const api = new Api();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch(console.error);
    }, []);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({ name: "", link: "" });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch(console.error);
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(console.error);
    }

    const handleUpdateUser = (data) => {
        api.setUserInfo(data)
            .then((updatedUserData) => {
                setCurrentUser(updatedUserData);
                closeAllPopups(); // Закрываем попап после успешного обновления данных пользователя
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleUpdateAvatar = (avatar) => {
        api.updateAvatar(avatar)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                closeAllPopups(); // Закрываем попап после успешного обновления аватара пользователя
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)
            .then((createdCard) => {
                setCards((prevCards) => [createdCard, ...prevCards]);
                closeAllPopups(); // Закрываем попап после успешного добавления карточки
            })
            .catch((error) => {
                console.error(error);
            });
    };

    

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <Header />
                
                <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}>
                </ImagePopup>
            </CurrentUserContext.Provider>

        </div>

    );
}

export default App;