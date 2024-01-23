import React from "react"
import { Statistic, Card, Row, Col } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import FormSelectDocument from "./FormSelectDocument"
import "./index.scss"

interface Props {}

const DetectGeneral = (props: Props) => {
  return (
    <div style={{ zIndex: 1 }}>
      <Row
        style={{
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Col span={24} xs={20}>
          <b style={{ fontSize: "28px", fontWeight: 600, lineHeight: "42px" }}>
            Trích xuất thông tin tài liệu tự động
          </b>
        </Col>
        <Col span={24} xs={20}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "8px",
              color: "#666666",
            }}
          >
            (Bóc tách và số hoá tốt nhất trên các văn bản hành chính, hóa đơn,
            giấy tờ nói chung)
          </p>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <FormSelectDocument />
        </Col>
      </Row>
    </div>
  )
}

export default DetectGeneral
