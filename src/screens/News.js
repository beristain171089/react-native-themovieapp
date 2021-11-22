import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { map } from 'lodash';
import { getNewsMovieApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const { width } = Dimensions.get('window');

export default function Popular(props) {

    const { navigation } = props;

    const { theme } = usePreferences();

    const [movies, setMovies] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {

        getNewsMovieApi(page).then((response) => {

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
            <View style={styles.container}>
                {map(movies, (movie, index) => (
                    <Movie
                        key={index}
                        movie={movie}
                        navigation={navigation}
                    />
                ))}
            </View>
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
        </ScrollView>
    );
};

function Movie(props) {

    const { movie, navigation } = props;
    const { id, poster_path, title } = movie;

    const onMovie = () => {
        navigation.navigate("movie", { id: id });
    };

    return (
        <TouchableWithoutFeedback onPress={onMovie}>
            <View style={styles.movie}>
                {poster_path ?
                    <Image
                        style={styles.image}
                        source={{ uri: `${BASE_PATH_IMG}/w500/${poster_path}` }}
                    />
                    :
                    <Text>{title}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    movie: {
        width: width / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 30
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
});

