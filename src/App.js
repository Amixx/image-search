import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SearchInput from "./components/ui/SearchInput";
import Layout from "./components/layout/Layout";
import ImageCard from "./components/ui/ImageCard";
import Spinner from "./components/ui/Spinner";
import useUnsplashApi from "./useUnsplashApi";

const APP_NAME = "image-search-app";
const unsplashRefLink = `https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`;

function App() {
	const recentQueriesFromStorage = JSON.parse(localStorage.getItem("recentQueries"));

	const [ query, setQuery ] = useState("");
	const [ recentQueries, setRecentQueries ] = useState(recentQueriesFromStorage !== null ? recentQueriesFromStorage : []);

    const { photos, photosLoading, likeRequestPhotoId, loadPhotos, likePhoto, unlikePhoto } = useUnsplashApi();

	const submitSearch = () => {
		setRecentQueries(generateRecentQueries(query));
		loadPhotos(query);
	}

	const generateRecentQueries = newQuery => {
		const newRecentQueries = [...recentQueries];
		if(newRecentQueries.length === 5) newRecentQueries.pop();
		if(newRecentQueries.includes(newQuery)) return recentQueries;
		newRecentQueries.unshift(newQuery);
		return newRecentQueries;
	}

	useEffect(() => {
		if(recentQueries) localStorage.setItem("recentQueries", JSON.stringify(recentQueries));
	}, [recentQueries]);



    const photoGrid = photos 
        ? photos.map(photo => (
            <Col lg={3} sm={6} key={photo.id}>
                <ImageCard
                    photo={photo}
                    likePhoto={likePhoto}
                    unlikePhoto={unlikePhoto}
                    likeRequestPhotoId={likeRequestPhotoId} />
            </Col>
        ))
        : null;


    return (
        <Layout>
            <Row className="mt-5 mb-3">
                <Col>
                    <span>Photos by <a target="_blank" href={unsplashRefLink} rel="noreferrer">Unsplash</a>!</span>
                </Col>
            </Row>
            <Row>
                <FillerCol />
                <Col lg={4} sm={8}>
                    <SearchInput
                        suggestions={recentQueries}
                        query={query}
                        setQuery={setQuery}
                        submitSearch={submitSearch} />
                </Col>
                <FillerCol />
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

const FillerCol = () => <Col lg={4} sm={2}></Col>;

export default App;