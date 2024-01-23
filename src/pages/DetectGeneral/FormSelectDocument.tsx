import React, { useState } from "react"
import { Row, Col } from "antd"

import "./index.scss"

interface Props {}

import { Box, TextInput } from "@mantine/core"
import VideoTrimmer from "../../components/VideoDetect/VideoTrimmer"
import { IDataOfEachLabel } from "../../utils/helpers/interface_data"
import ResultAndVideo from "../ResultAndVideo"

const FormSelectDocument = (props: Props) => {
  const [streamUrl, setStreamUrl] = useState("")
  const [currentDataLabel, setCurrentDataLabel] = useState<IDataOfEachLabel>({
    start: 0,
    end: 0,
  })

  return (
    <>
      <Row justify={"center"}>
        <Col span={12}>
          <TextInput
            label="Stream URL"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            mb="md"
          />
        </Col>
      </Row>
      <ResultAndVideo streamUrl={streamUrl} />
    </>
  )
}

export default FormSelectDocument
