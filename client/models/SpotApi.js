import fetch from 'isomorphic-fetch'

let artistId = '';
let albumId = '';
let artists = [];
let albums = [];
let tracks = [];

export function fetchArtists(url) {
  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
}

export function fetchAlbums(url) {
  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
}

export function fetchAlbumDetails(url) {
  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
}

export function getAlbumId() {
  return albums;
}
export function getArtistId() {
  return artistId;
}