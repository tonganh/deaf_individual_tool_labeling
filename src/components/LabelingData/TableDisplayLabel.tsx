import type { InputRef } from "antd"
import { Button, Form, Input, Popconfirm, Table } from "antd"
import type { FormInstance } from "antd/es/form"
import React, { useContext, useEffect, useRef, useState } from "react"
import { DataType, IDataOfEachLabel } from "../../utils/helpers/interface_data"
import "./index.scss"

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  start: number
  end: number
  label: string
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>
interface Props {
  setCurrentDataLabel: React.Dispatch<React.SetStateAction<IDataOfEachLabel>>
  dataSource: DataType[]
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>
  currentKeyLabel: number
  setCurrentKeyLabel: React.Dispatch<React.SetStateAction<number>>
  setRangeValue: React.Dispatch<React.SetStateAction<[number, number]>>
}
const TableDisplayLabel = (props: Props) => {
  const {
    setCurrentDataLabel,
    dataSource,
    setDataSource,
    currentKeyLabel,
    setCurrentKeyLabel,
    setRangeValue,
  } = props

  const [count, setCount] = useState(0)

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  const handleClickToARow = (record: DataType) => {
    setCurrentKeyLabel(record.key)
    setRangeValue([record.start, record.end])
    setCurrentDataLabel({
      start: record.start,
      end: record.end,
      // label: record.label,
    })
  }

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: "start",
      dataIndex: "start",
      width: "30%",
      editable: false,
      align: "center",
      render: (text: string, record: any) => {
        return <div onClick={() => handleClickToARow(record)}>{text}</div>
      },
    },
    {
      title: "end",
      dataIndex: "end",
      width: "30%",
      editable: false,
      align: "center",
      render: (text: string, record: any) => {
        return <div onClick={() => handleClickToARow(record)}>{text}</div>
      },
    },
    {
      title: "label",
      dataIndex: "label",
      width: "30%",
      editable: true,
      align: "center",
      // render: (text: string, record: any) => {
      //   return <div onClick={() => handleClickToARow(record)}>{text}</div>
      // },
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ]

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      start: 0,
      end: 0,
      label: "Label...",
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return (
    <>
      <div style={{ maxHeight: "70vh", overflow: "auto" }}>
        <Table
          components={components}
          // rowClassName={() => "editable-row"}
          rowClassName={(record: any) =>
            record.key === currentKeyLabel ? "red-row editable-row" : ""
          }
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
    </>
  )
}

export default TableDisplayLabel
