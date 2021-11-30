import React, { useState, useEffect, useCallback, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import SearchInput from "./components/ui/SearchInput";
import UnsplashApi from "./UnsplashApi";
import Layout from "./components/layout/Layout";
import ImageCard from "./components/ui/ImageCard";
import UserContext from "./UserContext";
import Spinner from "./components/ui/Spinner";

function App() {
	const APP_NAME = "image-search-app";
	const unsplashRefLink = `https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`;
	const recentQueriesFromStorage = JSON.parse(localStorage.getItem("recentQueries"));

	const [ query, setQuery ] = useState("");
	const [ searchResults, setSearchResults ] = useState(null);
	const [ photosLoading, setPhotosLoading ] = useState(false);
	const [ recentQueries, setRecentQueries ] = useState(recentQueriesFromStorage !== null ? recentQueriesFromStorage : []);
    const [ likeRequestPhotoId, setLikeRequestPhotoId ] = useState(null);

    const { accessToken, setAccessToken, userData, setUserData } = useContext(UserContext);

	const submitSearch = () => {
		setRecentQueries(generateRecentQueries(query));

		setPhotosLoading(true);
		UnsplashApi.search.getPhotos({ query })
			.then(({ response }) => {
				setSearchResults(response.results);
				setPhotosLoading(false);
			});
	}

	const generateRecentQueries = newQuery => {
		const newRecentQueries = [...recentQueries];
		if(newRecentQueries.length === 5) newRecentQueries.pop();
		if(newRecentQueries.includes(newQuery)) return recentQueries;
		newRecentQueries.unshift(newQuery);
		return newRecentQueries;
	}

    const getHeadersForAuthenticatedUser = useCallback(() => {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${accessToken}`);
        return headers;
    }, [accessToken]);

    const fetchUserData = useCallback(() => {
        fetch("https://api.unsplash.com/me", { headers: getHeadersForAuthenticatedUser() })
            .then(res => res.json())
            .then(setUserData);
    }, [getHeadersForAuthenticatedUser, setUserData]);

    const callLikeEndpoint = (method, photoId) => {
        setLikeRequestPhotoId(photoId);
        fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
            method: method,
            headers: getHeadersForAuthenticatedUser(),
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setLikeRequestPhotoId(null);
            });
    }

    const likePhoto = photoId => callLikeEndpoint("POST", photoId);

    const unlikePhoto = photoId => callLikeEndpoint("DELETE", photoId);

    const isAuthenticated = useCallback(() => !!accessToken, [accessToken]);

    const logOut = () => setAccessToken(null);


	useEffect(() => {
		if(recentQueries) localStorage.setItem("recentQueries", JSON.stringify(recentQueries));
	}, [recentQueries]);

    useEffect(() => {
        if(isAuthenticated()) fetchUserData();
        else setUserData(null);
    }, [isAuthenticated, fetchUserData, setUserData]);


	const fillerColumn = () => <Col lg={4} sm={2}></Col>

    const photoGrid = searchResults 
        ? searchResults.map(photo => (
            <Col lg={3} sm={6} key={photo.id}>
                <ImageCard
                    photo={photo}
                    likePhoto={likePhoto}
                    unlikePhoto={unlikePhoto}
                    likeRequestPhotoId={likeRequestPhotoId}
                    isAuthenticated={isAuthenticated()} />
            </Col>
        ))
        : null;


    return (
        <Layout isAuthenticated={isAuthenticated()} logOut={logOut}>
            <Row className="mt-5 mb-3">
                <Col>
                    <span>Photos by <a target="_blank" href={unsplashRefLink} rel="noreferrer">Unsplash</a>!</span>
                </Col>
            </Row>
            <Row>
                {fillerColumn()}
                <Col lg={4} sm={8}>
                    <SearchInput
                        suggestions={recentQueries}
                        query={query}
                        setQuery={setQuery}
                        submitSearch={submitSearch}
                    ></SearchInput>
                </Col>
                {fillerColumn()}
            </Row>
            <Row className="mt-3">
                {
                    photosLoading
                        ? <Col><Spinner /></Col>
                        : null
                }
                {photoGrid}
            </Row>
        </Layout>
    );
}

export default App;
