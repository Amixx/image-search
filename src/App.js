import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchInput from "./components/ui/SearchInput";
import UnsplashApi from "./UnsplashApi";
import Layout from './Layout';

function App() {
	const APP_NAME = "image-search-app";
	const unsplashRefLink = `https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`;
    const userAccessToken = localStorage.getItem("accessToken");
	const recentQueriesFromStorage = JSON.parse(localStorage.getItem("recentQueries"));

	const [ query, setQuery ] = useState("");
	const [ searchResults, setSearchResults ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ recentQueries, setRecentQueries ] = useState(recentQueriesFromStorage !== null ? recentQueriesFromStorage : []);

    const [ isAuthenticated, setIsAuthenticated ] = useState(!!userAccessToken);

	const submitSearch = () => {
		setRecentQueries(generateRecentQueries(query));

		setIsLoading(true);
		UnsplashApi.search.getPhotos({ query })
			.then(({ response }) => {
				setSearchResults(response.results);
				setIsLoading(false);
			});
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


	const fillerColumn = () => <Col lg={4} sm={2}></Col>


    return (
        <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
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
                    isLoading
                        ? <Col><div className="spinner"></div></Col>
                        : null
                }
                {
                    searchResults 
                        ? searchResults.map(img => (
                            <Col lg={3} sm={6} key={img.id}>
                                <div className="image-wrapper">
                                    <img
                                        className="image"
                                        src={img.urls.regular}
                                        alt={img.alt_description}
                                        title={img.description}
                                    ></img>
                                </div>
                            </Col>
                        )) 
                        : null
                }
            </Row>
        </Layout>
    );
}

export default App;
