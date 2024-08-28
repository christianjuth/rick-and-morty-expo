import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image, StyleSheet } from 'react-native';


import { useCharacter} from '@/lib/rick-and-morty-api'
import Button from '@/components/ThemedButton';
import { useFavorites } from '@/lib/favorite-characters';

export default function () {
  const { id } = useLocalSearchParams();

  const { data: character } = useCharacter(id as any);

  const { isFavorite, toggleFavorite } = useFavorites();

  if (!character) return <ThemedText>Loading...</ThemedText>;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: character.image }}
          style={styles.headerImg}
        />
      }
    >
      <ThemedText type='title'>{character?.name} {isFavorite(character.id) ? '❤️' : ''}</ThemedText>
      <ThemedText><ThemedText type="defaultSemiBold">Status: </ThemedText>{character.status}</ThemedText>
      <ThemedText><ThemedText type="defaultSemiBold">Species: </ThemedText>{character.species}</ThemedText>
      <ThemedText><ThemedText type="defaultSemiBold">Gender: </ThemedText>{character.gender}</ThemedText>
      <ThemedText><ThemedText type="defaultSemiBold">Origin: </ThemedText>{character.origin.name}</ThemedText>

      <Button title={isFavorite(character.id) ? 'Remove from favorites' : 'Add to favorites'} onPress={() => toggleFavorite(character.id)} />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImg: {
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    position: 'absolute',
    width: undefined,
    height: undefined,
  },
});
