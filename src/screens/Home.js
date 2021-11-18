import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { map } from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import { getNewsMovieApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies';

export default function Home(props) {

    const { navigation } = props;

    const [newMovies, setNewMovies] = useState(null);
    const [genreList, setGenreList] = useState([]);
    const [genredSelected, setGenredSelected] = useState(28);
    const [genreMovies, setGenreMovies] = useState(null);

    useEffect(() => {

        getNewsMovieApi().then((response) => {
            setNewMovies(response.results);
        });

    }, []);

    useEffect(() => {

        getAllGenresApi().then((response) => {
            setGenreList(response.genres);
        });

    }, []);

    useEffect(() => {

        getGenreMoviesApi(genredSelected).then((response) => {
            setGenreMovies(response.results);
        });

    }, [genredSelected]);

    const onChangeGenre = (newGenreId) => {
        setGenredSelected(newGenreId);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies &&
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas películas</Title>
                    <CarouselVertical
                        data={newMovies}
                        navigation={navigation}
                    />
                </View>
            }
            <View style={styles.genres}>
                <Title style={styles.genresTitle}>Películas por genero</Title>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.genresList}
                >
                    {map(genreList, (genre) => (
                        <Text
                            key={genre.id}
                            style={[styles.genre, { color: genre.id !== genredSelected ? "#8697a5" : "#FFF" }]}
                            onPress={() => onChangeGenre(genre.id)}
                        >
                            {genre.name}
                        </Text>

                    ))}
                </ScrollView>
                {genreMovies &&
                    <CarouselMulti
                        data={genreMovies}
                        navigation={navigation}
                    />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    genresList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10
    },
    genre: {
        marginRight: 20,
        fontSize: 16
    }
});