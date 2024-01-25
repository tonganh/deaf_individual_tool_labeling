import {
  Box,
  BoxProps,
  Flex,
  Group,
  RangeSlider,
  Text,
  rem,
  Tooltip,
} from "@mantine/core"
import { IconHeart, IconHeartBroken } from "@tabler/icons-react"
import React, { RefObject, useState } from "react"
import Preview from "./Preview"
import { formatDuration } from "../../utils/helpers/formatDuration"
import "./index.scss"
interface TrimmerProps extends BoxProps {
  previewRefs: RefObject<HTMLCanvasElement>[]
  duration: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  endtimeOfPreviousLabel: number
}

const Trimmer = React.forwardRef<HTMLDivElement, TrimmerProps>(
  (
    {
      previewRefs,
      duration,
      value,
      onChange,
      endtimeOfPreviousLabel,
      ...props
    },
    ref,
  ) => {
    const handleChange = (newValue: [number, number]) => {
      if (newValue[0] < endtimeOfPreviousLabel) {
        newValue[0] = endtimeOfPreviousLabel
      }
      onChange(newValue)
    }

    const [showStartLabel, setShowStartLabel] = useState(false)
    const [showEndLabel, setShowEndLabel] = useState(false)

    const handleStartIconEvents = {
      onMouseEnter: () => setShowStartLabel(true),
      onMouseLeave: () => setShowStartLabel(false),
      onClick: () => setShowStartLabel(!showStartLabel),
    }

    const handleEndIconEvents = {
      onMouseEnter: () => setShowEndLabel(true),
      onMouseLeave: () => setShowEndLabel(false),
      onClick: () => setShowEndLabel(!showEndLabel),
    }

    return (
      <Box ref={ref} style={{ position: "relative" }}>
        <Preview
          previewRefs={previewRefs}
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          wrap="nowrap"
          sx={{ overflow: "hidden" }}
          align="stretch"
          h={40}
        />
        <RangeSlider
          step={0.01}
          max={duration}
          minRange={0.01}
          min={20}
          // showLabelOnHover={true}
          radius="xs"
          value={value}
          onChange={handleChange}
          // label={formatDuration}
          pos={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          thumbSize={1}
          mt="xl"
          styles={{
            thumb: { height: 40, width: 1 },
            bar: { backgroundColor: "GrayText" },
          }}
        />
      </Box>
    )
  },
)

export default Trimmer
