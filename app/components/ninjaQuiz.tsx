import { View, StyleSheet, useWindowDimensions } from "react-native"
import shredderNY from "../../assets/images/pixelNewYork.jpg"
import {
  PinchGestureHandler,
  PanGestureHandler,
  GestureHandlerRootView,
  type PinchGestureHandlerGestureEvent,
  type PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler"

import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from "react-native-reanimated"

const NinjaQuiz = () => {
  const { width, height } = useWindowDimensions()

  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)

  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onStart: (event, ctx: any) => {
      ctx.startScale = savedScale.value
      // Save the focal point of the pinch
      focalX.value = event.focalX
      focalY.value = event.focalY

      // Save the current translation as starting point
      ctx.startX = translateX.value
      ctx.startY = translateY.value
    },
    onActive: (event, ctx: any) => {
      // Calculate new scale
      const newScale = ctx.startScale * event.scale
      scale.value = newScale

      // Calculate the focal point relative to the center of the screen
      const focusX = focalX.value - width / 2
      const focusY = focalY.value - height / 2

      // Adjust translation to keep the focal point stable during zoom
      // This makes zooming feel more natural as it zooms toward where you're pinching
      if (event.scale !== 1) {
        translateX.value = ctx.startX - focusX * (newScale / ctx.startScale - 1)
        translateY.value = ctx.startY - focusY * (newScale / ctx.startScale - 1)
      }
    },
    onEnd: () => {
      // Clamp scale to min/max values
      if (scale.value < 1) scale.value = 1
      if (scale.value > 5) scale.value = 5 // Increased max zoom to 5x

      savedScale.value = scale.value

      // Ensure image stays within bounds after pinch
      const scaledWidth = width * scale.value
      const scaledHeight = height * scale.value

      const maxX = Math.max(0, (scaledWidth - width) / 2)
      const maxY = Math.max(0, (scaledHeight - height) / 2)

      // Clamp translation values
      translateX.value = Math.max(-maxX, Math.min(translateX.value, maxX))
      translateY.value = Math.max(-maxY, Math.min(translateY.value, maxY))
    },
  })

  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value
      ctx.startY = translateY.value
    },
    onActive: (event, ctx: any) => {
      // Calculate boundaries based on current scale
      const scaledWidth = width * scale.value
      const scaledHeight = height * scale.value

      // Only allow panning if we're zoomed in
      if (scale.value > 1) {
        const maxX = (scaledWidth - width) / 2
        const maxY = (scaledHeight - height) / 2

        // Calculate new translation values
        const nextX = ctx.startX + event.translationX
        const nextY = ctx.startY + event.translationY

        // Apply clamping to keep within bounds
        translateX.value = Math.max(-maxX, Math.min(nextX, maxX))
        translateY.value = Math.max(-maxY, Math.min(nextY, maxY))
      }
    },
    onEnd: () => {
      // No decay - we want to keep the image clamped within bounds
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    // Calculate boundaries based on current scale
    const scaledWidth = width * scale.value
    const scaledHeight = height * scale.value

    const maxX = (scaledWidth - width) / 2
    const maxY = (scaledHeight - height) / 2

    // Apply clamping to ensure we stay within bounds
    const clampedX = Math.max(-maxX, Math.min(translateX.value, maxX))
    const clampedY = Math.max(-maxY, Math.min(translateY.value, maxY))

    return {
      transform: [{ scale: scale.value }, { translateX: clampedX }, { translateY: clampedY }],
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={{ flex: 1 }}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.Image source={shredderNY} style={[styles.image, animatedStyle]} resizeMode="contain" />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default NinjaQuiz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    overflow: "hidden", // Ensure nothing renders outside the container
  },
  image: {
    width: "100%",
    height: "100%",
  },
})

