import React, { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const currentUser = useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState("");
    const avatarRef = useRef();

    useEffect(() => {
        if (currentUser) {
            setAvatar(currentUser.avatar || "");
        }
    }, [currentUser]);

    const handleInputChange = (event) => {
        setAvatar(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar(avatar);
    };

    return (
        <PopupWithForm
            title="Редактировать аватар"
            name="avatar"
            button="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__input"
                ref={avatarRef}
                placeholder="Ссылка на новый аватар"
                id="avatarLink"
                minLength="2"
                required
                value={avatar}
                onChange={handleInputChange}
            />
            <span id="avatarLink-error" className="error error_invalid"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;