import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import { getNewsMovieApi } from '../api/movies';

export default function Home() {

    const [newMovies, setNewMovies] = useState(null);

    useEffect(() => {

        getNewsMovieApi().then((response) => {
            setNewMovies(response.results);
        });

    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies &&
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas películas</Title>
                    <CarouselVertical data={newMovies} />
                </View>
            }
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
    }
});