import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Pokemon, getPokemonDetails } from '../../api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [details, setDetails] = useState<Pokemon>();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);


    useEffect(() => {
        const load = async () => {
            const details = await getPokemonDetails(id!);
            setDetails(details);
            navigation.setOptions({
                title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
            })

            const isFavorite = await AsyncStorage.getItem(`favorite-${id}`);
            setIsFavorite(isFavorite == 'true');
        }
        load();
    }, [id])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text onPress={toggleFavorite}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={25} color={'#FCF5ED'} />
                </Text>
            )
        })
    }, [isFavorite])

    const toggleFavorite = async () => {
        await AsyncStorage.setItem(`favorite-${id}`, !isFavorite ? 'true' : 'false')

        // if (!isFavorite) {
        //     await AsyncStorage.setItem(`favorite-${id}`, 'false')
        // } else {
        //     await AsyncStorage.setItem(`favorite-${id}`, 'true')
        // }

        setIsFavorite(!isFavorite);

    }
    return (
        <View style={{ padding: 10 }}>
            {
                details && (
                    <>
                        <View style={[styles.card, { alignItems: 'center' }]}>
                            <Image source={{ uri: details.sprites.other.home.front_default }} style={styles.imageStyle} />

                            <Text style={styles.TextName}>
                                #{details.id} {details.name}
                            </Text>
                        </View>
                        <View style={styles.card}>

                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Stats:
                            </Text>
                            {details.stats.map((item: any) => (
                                <Text key={item.stat.name}>
                                    {item.stat.name}: {item.base_stat}
                                </Text>
                            ))}

                        </View>
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 10,
        elevation: 1,
        gap: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    imageStyle: {
        width: 200,
        height: 200,
    },
    TextName: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    }
})

export default Page
