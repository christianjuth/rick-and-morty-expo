import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCharacters } from '@/lib/rick-and-morty-api';
import { Character } from '@/components/CharacterCard';
import ThemedButton from '@/components/ThemedButton';
import { useFavorites } from '@/lib/favorite-characters';
import { useSafeArea } from 'react-native-safe-area-context'
import { TextInput } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const insets = useSafeArea();

  const [filter, setFilter] = useState('');

  const characters = useCharacters(filter);

  const { isFavorite } = useFavorites();

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.headerImg}
          />
        }>

        <TextInput
          value={filter}
          onChangeText={setFilter}
          placeholder="Filter"
          style={styles.input}
        />

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Characters</ThemedText>
          <HelloWave />
        </ThemedView>

        {characters.loading && <ThemedText>Loading...</ThemedText>}

        {characters.data && 
          <>
            <ThemedView style={styles.stepContainer}>
              {characters.data?.results.map(character => (
                <Character key={character.id} character={character} isFavorite={isFavorite(character.id)} />
              ))}
            </ThemedView>
          </>
        }

      </ParallaxScrollView>
      {/* This should really use safe area inset form what I remember */}
      <ThemedView style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
        <ThemedButton title="Prev page" onPress={characters.prevPage} disabled={!characters.hasPrevPage} />
        <ThemedText>Page {characters.page} / {characters.totalPageCount}</ThemedText>
        <ThemedButton title="Next page" onPress={characters.nextPage} disabled={!characters.hasNextPage} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 25,
    marginBottom: 8,
  },
  headerImg: {
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    position: 'absolute',
    width: undefined,
    height: undefined,
  },
  button: {
    // TODO: make this support dark mode
    backgroundColor: "#000",
    color: "#fff"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    borderRadius: 4,
  }
});
