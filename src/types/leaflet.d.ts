declare module 'leaflet' {
  export type LatLngTuple = [number, number]

  export class Icon {
    constructor(options: {
      iconUrl: string
      iconRetinaUrl?: string
      shadowUrl?: string
      iconSize?: [number, number]
      iconAnchor?: [number, number]
      popupAnchor?: [number, number]
      shadowSize?: [number, number]
    })
  }

  export interface MapOptions {
    center: LatLngTuple
    zoom: number
    className?: string
    style?: React.CSSProperties
  }

  export interface MarkerOptions {
    position: LatLngTuple
    icon?: Icon
  }
}

declare module 'react-leaflet' {
  import type { LatLngTuple, Icon } from 'leaflet'
  import type { ReactNode } from 'react'

  export interface MapContainerProps {
    center: LatLngTuple
    zoom: number
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
  }

  export interface MarkerProps {
    position: LatLngTuple
    icon?: Icon
    children?: ReactNode
  }

  export interface TileLayerProps {
    url: string
    attribution?: string
  }

  export interface PopupProps {
    children?: ReactNode
  }

  export const MapContainer: React.FC<MapContainerProps>
  export const TileLayer: React.FC<TileLayerProps>
  export const Marker: React.FC<MarkerProps>
  export const Popup: React.FC<PopupProps>
}
