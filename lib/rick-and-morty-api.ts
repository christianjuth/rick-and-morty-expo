import { useEffect, useState } from 'react';
import { useFetch } from './fetch-data'

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string
  gender: string;
  origin: {
    name: string;
    url: string;
  }
  image?: string;
}


export function useCharacters(search?: string) {
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(1)

  // TODO: debounce this
  const fetched = useFetch<{ results: Character[]; info: { pages: number } }>(`https://rickandmortyapi.com/api/character?page=${page}&name=${search}`)

  useEffect(() => {
    setPage(1)
    setTotalPageCount(1)
  }, [search])

  // TODO: maybe abstract pagination logic into it's own hook
  
  // Cache the page count to keep it stable
  if (fetched.data && totalPageCount !== fetched.data.info.pages) {
    setTotalPageCount(fetched.data.info.pages)
  }

  const hasNextPage = page < totalPageCount
  const hasPrevPage = page > 1

  return {
    ...fetched,
    page,
    totalPageCount,
    setPage,
    hasNextPage,
    hasPrevPage,
    nextPage: () => {
      if (hasNextPage) {
        setPage(page + 1)
      }
    },
    prevPage: () => {
      if (hasPrevPage) {
        setPage(page - 1)
      }
    }
  }
}

export function useCharacter(id: number) {
  return useFetch<Character>(`https://rickandmortyapi.com/api/character/${id}`)
}
