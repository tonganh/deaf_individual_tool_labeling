import { Flex, FlexProps } from "@mantine/core"
import { RefObject } from "react"
import React from "react"
interface PreviewProps extends FlexProps {
  previewRefs: RefObject<HTMLCanvasElement>[]
}

export const Preview = ({ previewRefs, ...props }: PreviewProps) => {
  return (
    // <Flex {...props}>
    //   {previewRefs.map((ref, idx) => (
    //     <canvas
    //       height={40}
    //       width={40 * (16 / 9)}
    //       ref={ref}
    //       key={idx}
    //       style={{ flex: 1 }}
    //     />
    //   ))}
    // </Flex>
    <Flex style={{ position: "relative" }}>
      {previewRefs.map((ref, idx) => {
        return (
          <canvas
            height={20}
            width={20 * (16 / 9)}
            ref={ref}
            key={idx}
            style={{ flex: 1 }}
          />
        )
      })}
    </Flex>
  )
}

export default Preview
