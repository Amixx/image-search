import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchInput from "./components/ui/SearchInput";
import UnsplashApi from "./UnsplashApi";

function App() {
	const [ searchValue, setSearchValue ] = useState("dog");
	const [ searchResults, setSearchResults ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	const submitSearch = () => {
		setIsLoading(true);
		UnsplashApi.search.getPhotos({ query: searchValue })
			.then(({ response }) => {
				console.log(response.results)
				setSearchResults(response.results);
				setIsLoading(false);
			});
	}

	const APP_NAME = "image-search-app";
	const unsplashRefLink = `https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`;

    return (
        <div className="App">
            <Container>
				<Row className="mt-5 mb-3">
					<Col>
						<span>Photos by <a target="_blank" href={unsplashRefLink} rel="noreferrer">Unsplash</a>!</span>
					</Col>
				</Row>
                <Row>
                    <SearchInput setSearchValue={setSearchValue} submitSearch={submitSearch}></SearchInput>
                </Row>
				<Row className="mt-3">
					{
						isLoading
							? (
								<Col>
									<div className="spinner"></div>
								</Col>
							)
							: null
					}
					{
						searchResults 
							? searchResults.map(img => (
								<Col lg={3} sm={6} key={img.id} className="image-card">
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
            </Container>
        </div>
    );
}

export default App;
