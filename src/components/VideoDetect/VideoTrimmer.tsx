import { Box } from "@mantine/core"
import { useResizeObserver } from "@mantine/hooks"
import { useEffect, useRef, useState } from "react"
import ReactHlsPlayer from "react-hls-player"
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
}: VideoTrimmerProps) => {
  const [duration, setDuration] = useState(0)

  const { thumbnailRef, previewRefs } = useTimeline({
    sliderWidth: trimmerRect.width,
  })

  const [start, end] = rangeValue

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
      />
    </div>
  )
}

export default VideoTrimmer
