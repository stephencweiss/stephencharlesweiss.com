import { boundedHash } from '../utils/hashFn'
import { proxiedGet } from '../utils/proxiedrequest'
import { TODAY } from '../constants'

/**
 * Using a proxy for XKCD:  https://github.com/mrmartineau/xkcd-api
 * Details re: XKCD's JSON: https://xkcd.com/json.html
 *  */
export function useXkcd({ comicQty }) {
  async function latestComicNumber() {
    return await proxiedGet('http://xkcd.com/info.0.json')
      .then(res => res.json())
      .then(res => res.num)
  }

  async function fetchRequestedImages(comicQty) {
    const maxComic = await latestComicNumber()
    const images = []

    for (let i = 0; i < qty; i += 1) {
      hashes.push(boundedHash(i + TODAY, maxComic))
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

  return fetchRequestedImages(comicQty)
}
