import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Linking, Platform } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { mapStandardStyle } from './mapData'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Variables
import C from '@/res/colors'
// Images
import IMAGES from '@/res/images'
const { MapAdBlackLocationIcon } = IMAGES
// Styles
import { style } from './style'

const {
  MediaContainer,
  MediaContainerTitle,
  MediaContainerBlock,
  MediaAddress,
  MediaAddressText,
  CardBorder,
} = style

const CardLocationBlock = ({ cardAddress, cardCoords }) => {
  const _map = useRef(null)

  const defaultMapState = {
    region: {
      latitude: cardCoords.latitude ? parseFloat(cardCoords.latitude) : 0,
      longitude: cardCoords.longitude ? parseFloat(cardCoords.longitude) : 0,
      latitudeDelta: parseFloat(cardCoords.latitudeDelta),
      longitudeDelta: parseFloat(cardCoords.longitudeDelta),
    },
  }
  const markerState = {
    region: {
      latitude: cardCoords.latitude ? parseFloat(cardCoords.latitude) : 0,
      longitude: cardCoords.longitude ? parseFloat(cardCoords.longitude) : 0,
      latitudeDelta: parseFloat(cardCoords.latitudeDelta),
      longitudeDelta: parseFloat(cardCoords.longitudeDelta),
    },
  }

  const [state, setState] = useState(defaultMapState)
  // Set list
  useEffect(() => {
    const { region } = defaultMapState
    const newCamera = {
      center: {
        latitude: cardCoords.latitude ? parseFloat(cardCoords.latitude) : 0,
        longitude: cardCoords.longitude ? parseFloat(cardCoords.longitude) : 0,
        latitudeDelta: parseFloat(cardCoords.latitudeDelta),
        longitudeDelta: parseFloat(cardCoords.longitudeDelta),
      },
      pitch: 0,
      heading: 0,
      zoom: 14,
    }

    if (region !== undefined) {
      _map.current.animateCamera(newCamera, { duration: 400 })
    }
  }, [cardCoords])

  return (
    <MediaContainer>
      <MediaContainerTitle>Our location</MediaContainerTitle>

      <MediaContainerBlock
        onPress={() => {
          const lat = cardCoords.latitude
          const lng = cardCoords.longitude
          const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
          const url = scheme + `${lat},${lng}?q=${cardAddress}`
          Linking.openURL(url)
        }}
      >
        <View style={styles.container}>
          <MapView
            ref={_map}
            initialRegion={state.region}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStandardStyle}
            isAccessibilityElement={false}
            showsUserLocation={true}
            toolbarEnabled={false}
            showsCompass={false}
            showsMyLocationButton={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            scrollEnabled={false}
          >
            <Marker coordinate={markerState.region}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  width: 16,
                }}
              >
                <MapAdBlackLocationIcon width={16} height={20} />
              </View>
            </Marker>
          </MapView>
        </View>
        {/* Address */}
        <MediaAddress>
          <MediaAddressText>{cardAddress}</MediaAddressText>
        </MediaAddress>
      </MediaContainerBlock>
    </MediaContainer>
  )
}

export default CardLocationBlock

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 205,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    width: '100%',
    height: 235,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
