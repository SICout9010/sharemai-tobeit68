import { writable } from 'svelte/store';

type RouteStore = {
  start?: google.maps.LatLngLiteral;
  end?: google.maps.LatLngLiteral;
};

export const selectedRoute = writable<RouteStore>({});