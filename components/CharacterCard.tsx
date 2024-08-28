import type { Character } from '@/lib/rick-and-morty-api'

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export function Character({
  character,
  isFavorite,
}: {
  character: Character;
  isFavorite: boolean
}) {
  return (
    <Link href={`/characters/${character.id}`}>
      <ThemedView>
        <ThemedText type="subtitle">{character.name} {isFavorite ? '❤️' : ""}</ThemedText>
        <ThemedText><ThemedText type="defaultSemiBold">Status: </ThemedText>{character.status}</ThemedText>
        <ThemedText><ThemedText type="defaultSemiBold">Species: </ThemedText>{character.species}</ThemedText>
        <ThemedText><ThemedText type="defaultSemiBold">Gender: </ThemedText>{character.gender}</ThemedText>
        <ThemedText><ThemedText type="defaultSemiBold">Origin: </ThemedText>{character.origin.name}</ThemedText>
      </ThemedView>
    </Link>
  )
}
