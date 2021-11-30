import { useContext } from "react";
import { Button } from "react-bootstrap";
import Spinner from "./Spinner";
import UserContext from "../../context/UserContext";

const ImageCard = ({ photo, likePhoto, unlikePhoto, likeRequestPhotoId }) => {
    return (
        <div className="ImageCard__Wrapper">
            <img
                className="ImageCard__Image"
                src={photo.urls.regular}
                alt={photo.alt_description}
                title={photo.description}
            ></img>
            <ImageCardFooter
                photo={photo}
                likePhoto={likePhoto}
                unlikePhoto={unlikePhoto}
                likeRequestPhotoId={likeRequestPhotoId} />
        </div>
    );
} 

const ImageCardFooter = ({ photo, likePhoto, unlikePhoto, likeRequestPhotoId }) => {
    const { isAuthenticated } = useContext(UserContext);

    const likedByUser = photo.liked_by_user;
    const displaySpinner = photo.id === likeRequestPhotoId;

    const buttonContent = displaySpinner
        ? <Spinner style={{ padding: "12px 16px", marginTop: 0 }} />
        : likedByUser ? "Unlike" : "Like";

    const buttonClickHandler = id => likedByUser ? unlikePhoto(id) : likePhoto(id);

    const button = isAuthenticated()
        ? <Button variant="success" disabled={displaySpinner} onClick={() => buttonClickHandler(photo.id)}>
            {buttonContent}
        </Button>
        : null;

    return (
        <div className="ImageCard__Footer">
            <span>
                By&nbsp;
                <a className="ImageCard__UserLink" href={photo.user.links.html} target="_blank" rel="noreferrer">{photo.user.name}</a>
            </span>
            {button}   
        </div>
    );
}

export default ImageCard;