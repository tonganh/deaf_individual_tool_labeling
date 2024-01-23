import React, { useState, useEffect, useRef } from "react"
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  notification,
  Row,
  Col,
} from "antd"

import "./index.scss"

interface Props {}

import { Box, TextInput } from "@mantine/core"
import VideoTrimmer from "../../components/VideoDetect/VideoTrimmer"

const FormSelectDocument = (props: Props) => {
  const [streamUrl, setStreamUrl] = useState("")

  return (
    <>
      <Row>
        <Col span={24}>
          <TextInput
            label="Stream URL"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            mb="md"
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {streamUrl && <VideoTrimmer streamUrl={streamUrl} />}
        </Col>
        <Col span={12}>123123</Col>
      </Row>
    </>
  )
}

export default FormSelectDocument
