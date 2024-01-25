import { Row, Col } from "antd"
import React, { useEffect, useRef, useState } from "react"
import VideoTrimmer from "../../components/VideoDetect/VideoTrimmer"
import { DataType, IDataOfEachLabel } from "../../utils/helpers/interface_data"
import { useResizeObserver } from "@mantine/hooks"
import TableDisplayLabel from "../../components/LabelingData/TableDisplayLabel"
interface Props {
  streamUrl: string
}
const ResultAndVideo = (props: Props) => {
  const { streamUrl } = props
  const [currentDataLabel, setCurrentDataLabel] = useState<IDataOfEachLabel>({
    start: 0,
    end: 2,
  })

  const [duration, setDuration] = useState(0)
  const [currentKeyLabel, setCurrentKeyLabel] = useState<number>(-1)
  const [endtimeOfPreviousLabel, setEndtimeOfPreviousLabel] =
    useState<number>(0)
  const [valueGapBetween, setValueGapBetween] = useState<number>(0)
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
    setDataSource(newData)
  }

  useEffect(() => {
    setValueGapBetween(duration / 100)
  }, [duration])

  useEffect(() => {
    if (currentKeyLabel !== -1) {
      const newRecord = {
        key: currentKeyLabel,
        start: currentDataLabel.start,
        end: currentDataLabel.end,
      }
      handleEdit(currentKeyLabel, newRecord)
    }
  }, [currentDataLabel])

  useEffect(() => {
    if (currentKeyLabel !== -1 && currentKeyLabel !== -0) {
      setEndtimeOfPreviousLabel(dataSource[currentKeyLabel - 1].end)
    }
  }, [currentKeyLabel])

  return (
    <Row>
      <Col span={15} style={{ position: "relative", marginLeft: "20px" }}>
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
            duration={duration}
            setDuration={setDuration}
            endtimeOfPreviousLabel={endtimeOfPreviousLabel}
          />
        )}
      </Col>
      <Col span={8}>
        <TableDisplayLabel
          setCurrentDataLabel={setCurrentDataLabel}
          dataSource={dataSource}
          setDataSource={setDataSource}
          currentKeyLabel={currentKeyLabel}
          setCurrentKeyLabel={setCurrentKeyLabel}
          setRangeValue={setRangeValue}
          valueGapBetween={valueGapBetween}
        />
      </Col>
    </Row>
  )
}

export default ResultAndVideo
