import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import { map } from 'lodash';
import { Rating } from 'react-native-ratings';
import { getPopularMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import noImage from '../assets/jpg/default-image.png';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

export default function Popular(props) {

    const { navigation } = props;

    const { theme } = usePreferences();

    const [movies, setMovies] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {

        getPopularMoviesApi(page).then((response) => {

            const totalPages = response.total_pages;

            if (page < totalPages) {

                if (!movies) {
                    setMovies(response.results);
                } else {
                    setMovies([...movies, ...response.results]);
                };
                
            } else {
                setShowBtnMore(false);
            };

        });

    }, [page]);

    return (
        <ScrollView>
            {map(movies, (movie, index) => (
                <Movie
                    key={index}
                    movie={movie}
                    theme={theme}
                    navigation={navigation}
                />
            ))}
            {showBtnMore &&
                <Button
                    mode='contained'
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                    onPress={() => setPage(page + 1)}
                >
                    Cargar mas...
                </Button>
            }
        </ScrollView >
    );
};

function Movie(props) {

    const { movie, theme, navigation } = props;
    const { id, poster_path, title, release_date, vote_count, vote_average } = movie;

    const onMovie = () => {
        navigation.navigate("movie", { id: id });
    };

    return (
        <TouchableWithoutFeedback onPress={onMovie}>
            <View style={styles.movie}>
                <View style={styles.left}>
                    <Image
                        style={styles.image}
                        source={
                            poster_path ?
                                { uri: `${BASE_PATH_IMG}/w500/${poster_path}` }
                                :
                                noImage
                        }
                    />
                </View>
                <View style={styles.right}>
                    <Title>{title}</Title>
                    <Title>{release_date}</Title>
                    <MovieRating
                        voteCount={vote_count}
                        voteAverage={vote_average}
                        theme={theme}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

function MovieRating(props) {

    const { voteCount, voteAverage, theme } = props;

    const media = voteAverage / 2;

    return (
        <View style={styles.viewRating}>
            <Rating
                type='custom'
                ratingImage={theme === 'dark' ? starDark : starLight}
                ratingColor='#ffc205'
                ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
                startingValue={media}
                imageSize={20}
                style={{ marginRight: 15 }}
                isDisabled={true}
            />
            <Text style={{ fontSize: 12, color: "#8697a5", marginTop: 5 }}>{voteCount} votos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    movie: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        marginRight: 20
    },
    image: {
        width: 100,
        height: 150
    },
    viewRating: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 30
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
});
