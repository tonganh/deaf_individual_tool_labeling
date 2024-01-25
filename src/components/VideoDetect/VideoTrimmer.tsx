import { useEffect } from "react"
import Trimmer from "./Trimmer"
import { useTimeline } from "../../hooks/useTimeline"
import React from "react"
import { DataType, IDataOfEachLabel } from "../../utils/helpers/interface_data"

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">
interface VideoTrimmerProps {
  streamUrl: string
  setCurrentDataLabel: React.Dispatch<React.SetStateAction<IDataOfEachLabel>>
  videoRef: React.RefObject<HTMLVideoElement>
  rangeValue: [number, number]
  trimmerRef: React.MutableRefObject<any>
  trimmerRect: ObserverRect
  setRangeValue: React.Dispatch<React.SetStateAction<[number, number]>>
  dataSource: DataType[]
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  endtimeOfPreviousLabel: number
}

const VideoTrimmer = ({
  streamUrl,
  setCurrentDataLabel,
  videoRef,
  rangeValue,
  trimmerRef,
  trimmerRect,
  setRangeValue,
  dataSource,
  duration,
  setDuration,
  endtimeOfPreviousLabel,
}: VideoTrimmerProps) => {
  const { thumbnailRef, previewRefs } = useTimeline({
    sliderWidth: trimmerRect.width,
  })

  const [start, end] = rangeValue
  const videoTest = document.querySelector("video")
  useEffect(() => {
    const video = thumbnailRef.current

    if (!video) {
      return
    }
    video.currentTime = start
  }, [start, end])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!videoRef.current) return
      const { currentTime } = videoRef.current
      if (currentTime >= end) {
        videoRef.current.pause()
      }
      console.log("End", end)
    }, 500)
    // // Cleanup function to clear the interval
    return () => clearInterval(intervalId)
  }, [end]) // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    videoRef.current &&
      (videoRef.current.currentTime = start) &&
      setCurrentDataLabel({ start, end })
  }, [start])

  useEffect(() => {
    videoRef.current &&
      (videoRef.current.currentTime = end) &&
      setCurrentDataLabel({ start, end })
  }, [end])

  useEffect(() => {
    console.log("REload")

    if (!videoRef.current) return
    videoRef.current.onloadedmetadata = () => {
      setDuration(videoRef.current?.duration || 0)
      setRangeValue([0, videoRef.current?.duration || 0])
    }
  }, [videoRef, setDuration])

  return (
    <div>
      <video
        src={streamUrl}
        onPlay={() => {
          console.log("line 89")
        }}
        className="video_play_first"
        autoPlay={false}
        controls={false}
        width="100%"
        style={{
          maxHeight: "70vh",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -10,
        }}
        ref={thumbnailRef}
      />
      <video
        onPlay={() => {
          console.log("line 107")
          const { current } = videoRef
          if (!current) return
          current.currentTime = start
        }}
        src={streamUrl}
        autoPlay={false}
        controls
        width="100%"
        style={{
          maxHeight: "70vh",
        }}
        ref={videoRef}
      />
      <Trimmer
        duration={duration}
        value={rangeValue}
        onChange={setRangeValue}
        previewRefs={previewRefs}
        ref={trimmerRef}
        endtimeOfPreviousLabel={endtimeOfPreviousLabel}
      />
    </div>
  )
}

export default VideoTrimmer
