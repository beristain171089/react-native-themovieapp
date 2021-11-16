import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {

    const { navigation } = props;

    const { theme, toggleTheme } = usePreferences();

    const [active, setActive] = useState("home");

    const onChangeScreen = (screen) => {
        setActive(screen)
        navigation.navigate(screen);
    };

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label="Inicio"
                    active={active === "home"}
                    onPress={() => onChangeScreen("home")}
                />
                <Drawer.Item
                    label="Películas populares"
                    active={active === "popular"}
                    onPress={() => onChangeScreen("popular")}
                />
                <Drawer.Item
                    label="Nuevas películas"
                    active={active === "news"}
                    onPress={() => onChangeScreen("news")}
                />
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Tema Oscuro</Text>
                        <Switch
                            value={theme === "dark"}
                            onValueChange={toggleTheme}
                        />
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    preferences: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16
    }
});
