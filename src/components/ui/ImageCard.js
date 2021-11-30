import { useContext } from "react";
import { Button } from "react-bootstrap";
import Spinner from "./Spinner";
import UserContext from "../../UserContext";

const ImageCard = ({ photo, likePhoto, unlikePhoto, likeRequestPhotoId }) => {
    const { accessToken, userData } = useContext(UserContext);

    const isAuthenticated = !!accessToken;
    const photoLikedByUser = isAuthenticated && userData.likedPhotos.includes(photo.id);
    const displaySpinner = photo.id === likeRequestPhotoId;

    const buttonContent = displaySpinner
        ? <Spinner />
        : photoLikedByUser ? "Unlike" : "Like";

    const buttonClickHandler = (id) => photoLikedByUser ? unlikePhoto(id) : likePhoto(id)

    const button = isAuthenticated
        ? <Button variant="success" disabled={displaySpinner} onClick={() => buttonClickHandler(photo.id)}>
            {buttonContent}
        </Button>
        : null;


    return (
        <div className="ImageCard__Wrapper">
            <img
                className="ImageCard__Image"
                src={photo.urls.regular}
                alt={photo.alt_description}
                title={photo.description}
            ></img>
            <div className="ImageCard__Footer">
                <span>
                    By&nbsp;
                    <a className="ImageCard__UserLink" href={photo.user.links.html} target="_blank" rel="noreferrer">{photo.user.name}</a>
                </span>
                {button}   
            </div>
        </div>
    );
} 

export default ImageCard;