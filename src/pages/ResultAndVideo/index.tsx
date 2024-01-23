import { Row, Col } from "antd"
import React, { useEffect, useRef, useState } from "react"
import VideoTrimmer from "../../components/VideoDetect/VideoTrimmer"
import { DataType, IDataOfEachLabel } from "../../utils/helpers/interface_data"
import { useResizeObserver } from "@mantine/hooks"
import { useTimeline } from "../../hooks/useTimeline"
import TableDisplayLabel from "../../components/LabelingData/TableDisplayLabel"
interface Props {
  streamUrl: string
}
const ResultAndVideo = (props: Props) => {
  const { streamUrl } = props
  const [currentDataLabel, setCurrentDataLabel] = useState<IDataOfEachLabel>({
    start: 0,
    end: 0,
    // label: "",
  })
  const [currentKeyLabel, setCurrentKeyLabel] = useState<number>(-1)
  const [dataSource, setDataSource] = useState<DataType[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 0])
  const [trimmerRef, trimmerRect] = useResizeObserver()
  const handleEdit = (key: React.Key, newRecord: DataType) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          ...newRecord,
        }
      }
      return item
    })
    console.log("🚀 ~ handleEdit ~ newData:", newData)
    setDataSource(newData)
  }

  // useEffect(() => {
  //   if (dataSource.length > 0 && dataSource[currentKeyLabel] !== undefined) {
  //     setCurrentDataLabel({
  //       start: dataSource[currentKeyLabel].start,
  //       end: dataSource[currentKeyLabel].end,
  //     })
  //   }
  // }, [dataSource])

  useEffect(() => {
    if (currentKeyLabel !== -1) {
      const newRecord = {
        key: currentKeyLabel,
        start: currentDataLabel.start,
        end: currentDataLabel.end,
        // label: currentDataLabel.label,
      }
      handleEdit(currentKeyLabel, newRecord)
    }
  }, [currentDataLabel])

  return (
    <Row>
      <Col span={15} style={{ position: "relative" }}>
        {streamUrl && (
          <VideoTrimmer
            streamUrl={streamUrl}
            setCurrentDataLabel={setCurrentDataLabel}
            videoRef={videoRef}
            rangeValue={rangeValue}
            trimmerRef={trimmerRef}
            trimmerRect={trimmerRect}
            setRangeValue={setRangeValue}
            dataSource={dataSource}
          />
        )}
      </Col>
      <Col span={9}>
        <TableDisplayLabel
          setCurrentDataLabel={setCurrentDataLabel}
          dataSource={dataSource}
          setDataSource={setDataSource}
          currentKeyLabel={currentKeyLabel}
          setCurrentKeyLabel={setCurrentKeyLabel}
          setRangeValue={setRangeValue}
        />
      </Col>
    </Row>
  )
}

export default ResultAndVideo
