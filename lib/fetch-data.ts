import { useEffect, useState } from 'react';

// Rolling my own fetch and useFetch is probably a bad idea.
// In real world you should use a library that handles different errors,
// caching, chache invalidation, fetch aborting, etc.
// But I'm just gonna go with this :)
async function fetchData<T>(url: string) {
  const res = await fetch(url)

  if (res.status < 200 || res.status >= 300) {
    throw new Error('Failed to fetch')
  }

  // Should probalby handles 204 no content as JSON parse will fail
  try {
    const json = await res.json()
    return json as T
  } catch (e) {
    throw new Error('Failed to parse JSON')
  }
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true)
    setData(undefined)

    fetchData<T>(url)
      .then(data => {
        if (!cancelled) {
          setData(data)
          setHasError(false)
          setLoading(false)
        }
      }) 
      .catch(() => {
        if (!cancelled) {
          setData(undefined)
          setHasError(true)
          setLoading(false)
        }
      })

    return () => {
      // Prevent set state from being called after component is unmounted
      cancelled = true;
    }
  }, [url])
    
  return {
    data,
    loading,
    hasError,
  }
}
