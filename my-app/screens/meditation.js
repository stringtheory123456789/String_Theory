import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    useNavigation,
    useRoute,
} from '@react-navigation/native';
function MeditationPage() {
    const route = useRoute();
    const username = route.params.username;
    const result = route.params.result;
    const depression = route.params.depression;
    const meditations = [
        {
            id: 1,
            title: 'Morning Sunshine',
            description: 'Start your day with this refreshing guided meditation.',
            progress: 30,
        },
        {
            id: 2,
            title: 'Evening Calmness',
            description: 'Wind down with this calming guided meditation.',
            progress: 45,
        },
        {
            id: 3,
            title: 'Guided Breathing',
            description: 'Find peace through guided breathing techniques.',
            progress: 20,
        },

    ];
    const [showAdditionalCard, setShowAdditionalCard] = useState(false);
    function exploreCategory(category) {
        alert('HI');
    }
    function playMeditation(title) {
        alert('Meditate')
    }
    function handleSearch(text) {
        setSearchText(text);

        const filteredMeditations = initialMeditations.filter((meditation) =>
            meditation.title.toLowerCase().includes(text.toLowerCase())
        );

        setMeditations(filteredMeditations);
    }
    function loadMore() {
        setShowAdditionalCard(!showAdditionalCard);
    }
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Dashboard',{
                        username: username,
                        result: result,
                        depression:depression,
                    })
                    
                }>
                    <FontAwesome name="arrow-left" size={27} color="white" />
                </TouchableOpacity>
                <Text style={styles.logo}>SERENIOS</Text>
                <View style={styles.userInfo}>
                <TouchableOpacity>
              <Image

                source={require('../assets/logo.png')}
                
                style={styles.topLeftIconImage}
              />
            </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search meditations..."
                    style={styles.searchInput}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView

                style={styles.categoryContainer}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.meditationContainer}
                >
                    {meditations.map((meditation) => (
                        <TouchableOpacity
                            key={meditation.id}
                            style={styles.meditationCard}
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{meditation.title}</Text>
                                <Text style={styles.cardDescription}>
                                    {meditation.description}
                                </Text>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progress,
                                            { width: `${meditation.progress}%` },
                                        ]}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => playMeditation(meditation.title)}
                                >
                                    <Text style={styles.playButtonText}>Play</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => addToList(meditation.title)}
                                >
                                    <Text style={styles.actionButtonText}></Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {}

                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => exploreCategory('Stress Relief')}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Stress Relief</Text>
                        <Text style={styles.cardDescription}>
                            Calm your mind and relax your body with these soothing meditations.
                        </Text>
                        <Text style={styles.exploreText}>Explore &rarr;</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => exploreCategory('Stress Relief')}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Focus & Productivity</Text>
                        <Text style={styles.cardDescription}>
                            Enhance your focus and productivity with these guided sessions.
                        </Text>
                        <Text style={styles.exploreText}>Explore &rarr;</Text>
                    </View>
                </TouchableOpacity>


                {showAdditionalCard && (
                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() => exploreCategory('Stress Relief')}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Mindful Living</Text>
                            <Text style={styles.cardDescription}>
                                Incorporate mindfulness into your daily life with these sessions.
                            </Text>
                            <Text style={styles.exploreText}>Explore &rarr;</Text>
                        </View>
                    </TouchableOpacity>

                )}

                {}
                <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={loadMore}
                >
                    <Text style={styles.loadMoreButtonText}>
                        {showAdditionalCard ? 'Load Less' : 'Load More'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {
}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAC4FF',

    },
    header: {
        marginTop: 30,
        backgroundColor: '#8B4513',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black'
    },
    logo: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black'
    },
    topLeftIconImage:
    {
        width: 40,
    height: 40,
    borderRadius: 15,
    borderColor: 'black'
    },
    userName: {
        color: '#ecf0f1',
        fontSize: 20,
    },
    searchContainer: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 3,
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    searchButton: {
        flex: 1,
        backgroundColor: '#4dc0b5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginRight: 2,
    },
    searchButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    meditationContainer: {
        paddingVertical: 8,
    },
    meditationCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginRight: 16,
        width: 300,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },
    cardDescription: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
    },
    progressBar: {
        backgroundColor: '#e0e0e0',
        height: 10,
        marginBottom: 8,
        borderRadius: 5,
    },
    progress: {
        backgroundColor: '#4dc0b5',
        height: '100%',
    },
    playButton: {
        marginTop: 10,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4dc0b5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
        fontSize: 18,
        color: '#4dc0b5',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    playButtonText: {
        color: '#4dc0b5',
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionButton: {
        fontSize: 16,
        color: '#555555',
        marginRight: 8,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#555555',
    },
    loadMoreButton: {
        marginTop: 15,
        backgroundColor: '#4dc0b5',
        borderWidth: 2,
        borderColor: '#4dc0b5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 16,
    },
    loadMoreButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,

    },
    categoryCard: {
        marginTop: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginRight: 16,
        width: '100%',
        justifyContent: 'center'
    },
    exploreText: {
        backgroundColor: '#4dc0b5',
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    footer: {
        backgroundColor: '#34495e',
        color: '#ecf0f1',
        textAlign: 'center',
        padding: 16,
    },
    footerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerLink: {
        marginHorizontal: 8,
    },
    footerLinkText: {
        fontSize: 18,
        color: '#ecf0f1',
    },
});

export default MeditationPage;
