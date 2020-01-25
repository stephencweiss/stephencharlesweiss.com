import { useAsync } from 'react-use'
import { boundedHash } from '../utils/hashFn'
import { proxiedGet } from '../utils/proxiedrequest'
import { TODAY } from '../constants'
/**
 * Details re: XKCD's JSON: https://xkcd.com/json.html
 *  */
export function useXkcd({ comicQty }) {
  async function latestComicNumber() {
    return await proxiedGet('http://xkcd.com/info.0.json')
      .then(res => res.json())
      .then(res => res.num)
  }

  async function fetchRequestedImages(comicQty) {
    const comicIdUpperBound = await latestComicNumber()
    const images = []
    images.push(fetchComic()) // get the current comic
    for (let i = 0; i < comicQty; i += 1) {
      // A hash of 0 would error. Avoid it. Without nuance.
      const hash =
        boundedHash(i + TODAY, comicIdUpperBound) === 0
          ? Math.max(boundedHash(i + comicQty + TODAY, comicIdUpperBound),1)
          : boundedHash(i + TODAY, comicIdUpperBound)
      const img = fetchComic(hash)
      images.push(img)
    }
    return images
  }

  async function fetchComic(comicId) {
    return proxiedGet(
      `http://xkcd.com/${comicId ? `${comicId}/` : ``}info.0.json`
    )
      .then(res => res.json())
      .then(res => {
        res.link = `http://xkcd.com/${comicId}` // Want to be sure to provide a way back to xkcd
        return res
      })
      .catch(error => console.error(`fetchComics --> `, error))
  }

  const { loading, error, value } = useAsync(() => {
    return fetchRequestedImages(comicQty).then(res => Promise.all(res))
  }, [])

  return { isLoading: loading, isError: error, xkcdComics: value }
}
