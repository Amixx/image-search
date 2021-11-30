import { useState, useContext } from "react";
import UnsplashApi from "./UnsplashApi";
import UserContext from "../context/UserContext";

const useUnsplashApi = () => {
    const [ photos, setPhotos ] = useState(null);
	const [ photosLoading, setPhotosLoading ] = useState(false);
    const [ likeRequestPhotoId, setLikeRequestPhotoId ] = useState(null);
    const { accessToken } = useContext(UserContext);

    const loadPhotos = query => {
        setPhotos(null);
        setPhotosLoading(true);
        UnsplashApi.search.getPhotos({ query })
            .then(({ response }) => {
                setPhotos(response.results);
                setPhotosLoading(false);
            });
    };

    const likePhoto = photoId => callLikeEndpoint("POST", photoId);

    const unlikePhoto = photoId => callLikeEndpoint("DELETE", photoId);

    const callLikeEndpoint = (method, photoId) => {
        setLikeRequestPhotoId(photoId);
        fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
            method: method,
            headers: tokenToHeaders(accessToken),
        })
            .then(res => res.json())
            .then(({ photo }) => {
                updatePhotos(photo);
                setLikeRequestPhotoId(null);
            });
    }

    const updatePhotos = photo => {
        const photoIndex = photos.findIndex(p => p.id === photo.id);
        const newPhotos = photos;
        newPhotos[photoIndex] = photo;
        setPhotos(newPhotos);
    }


    return { photos, photosLoading, likeRequestPhotoId, loadPhotos, likePhoto, unlikePhoto };
}


const tokenToHeaders = (accessToken) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    return headers;
};


export default useUnsplashApi;