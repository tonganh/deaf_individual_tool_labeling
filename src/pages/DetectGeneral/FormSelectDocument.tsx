import React, { useState } from "react"
import { Row, Col } from "antd"

import "./index.scss"

interface Props {}

import { TextInput } from "@mantine/core"
import ResultAndVideo from "../ResultAndVideo"

const FormSelectDocument = (props: Props) => {
  const [streamUrl, setStreamUrl] = useState("")
  const runAfterDelay = (url: string) => {
    setStreamUrl(url)
    setTimeout(() => {
      // Your code here
      setStreamUrl("")
    }, 4)
    setTimeout(() => {
      // Your code here
      setStreamUrl(url)
    }, 4)
  }
  return (
    <>
      <Row justify={"center"}>
        <Col span={12}>
          <TextInput
            label="Stream URL"
            value={streamUrl}
            onChange={(e) => runAfterDelay(e.currentTarget.value)}
            mb="md"
          />
        </Col>
      </Row>
      <ResultAndVideo streamUrl={streamUrl} />
    </>
  )
}

export default FormSelectDocument
