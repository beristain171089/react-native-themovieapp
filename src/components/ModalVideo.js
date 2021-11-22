import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";
import { getVideoMovieApi } from '../api/movies';

export default function ModalVideo(props) {

    const { show, setShow, idMovie } = props;

    const [video, setVideo] = useState(null);

    useEffect(() => {

        getVideoMovieApi(idMovie).then((response) => {

            let idVideo = null;

            response.results.forEach((video) => {

                if (video.site === 'YouTube' && !idVideo) {
                    idVideo = video.key;
                };

            });

            setVideo(idVideo);
        });

    }, []);

    return (
        <Modal
            visible={show}
            contentContainerStyle={styles.modal}
        >
            <YoutubePlayer
                contentScale={0.9}
                width={Dimensions.get("screen").width}
                height={(Dimensions.get("screen").width / 480) * 270}
                play={true}
                videoId={video}
                onChangeState={e => e === "ended" ? setShow(false) : null}
                webViewProps={{
                    startInLoadingState: true,
                    renderLoading: () =>
                        <ActivityIndicator
                            color="#FFF"
                            size="large"
                            style={{
                                backgroundColor: "#000",
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                }}
            />
            <IconButton
                icon='close'
                onPress={() => setShow(false)}
                style={styles.close}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center'
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100
    },
    video: {
        alignSelf: 'stretch',
        height: 300
    }
});
