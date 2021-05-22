import { FC, memo, useState } from 'react';
import {
  Button,
  Form,
  Table,
  Input,
  Select,
  DatePicker,
  Tabs,
  Col,
  Row,
} from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const dataSource = [
  {
    order_no: '961180319019',
    order_date: '2021-03-25',
    order_time: '14:00:21',
    expect_time: '2021-04-05',
    name: '张三',
    phone: '13600001234',
    address: '广东省珠海市香洲区港乐路8号B区110室',
    order_num: 1000,
    price: 2000,
    status: 0,
  },
];

const timeList = [
  {
    id: 0,
    text: '今天',
  },
  {
    id: 3,
    text: '近3天',
  },
  {
    id: 7,
    text: '近7天',
  },
];

const orderTypeList = [
  {
    id: 0,
    text: '全部订单',
  },
  {
    id: 1,
    text: '打样订单',
  },
  {
    id: 2,
    text: '定制订单',
  },
];

interface Result {
  total: number;
  list: any[];
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  console.log(1111, formData);
  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const NewOrder: FC<any> = () => {
  const [timeLabelI, setTimeLabelI] = useState(0);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const onChangeTab = (key) => {
    console.log(key);
  };
  const columns: any[] = [
    {
      title: '订单详情',
      dataIndex: 'order_no',
      render: (text: any, record: any) => {
        return (
          <div className={styles['order-detail']}>
            <p>
              订单号：{text} <span>打样</span>
            </p>
            <p>
              下单时间：{record.order_date}
              <span>{record.order_time}</span>
            </p>
            <p>
              交货日期：<span>{record.expect_time}</span>
              <span className={styles.residue}>剩余 3天 20小时</span>
            </p>
          </div>
        );
      },
    },
    {
      title: '收货信息',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        return (
          <>
            <p>
              <span>{text}</span>
              <span style={{ marginLeft: 10 }}>{record.phone}</span>
            </p>
            <p>{record.address}</p>
          </>
        );
      },
    },
    {
      title: '订单数量 (件)',
      dataIndex: 'order_num',
    },
    {
      title: '金额 (元)',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => <span>新订单</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return (
          <>
            <p style={{ color: '#FF8149', cursor: 'pointer' }}>订单详情</p>
            <Button
              type="primary"
              className={styles['action-btn']}
              style={{ borderRadius: 60, marginTop: 10 }}
            >
              匹配工厂
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className={styles['new-order']}>
      <Form form={form} className={styles.filter} initialValues={{ type: '2' }}>
        <Row justify="space-between">
          <Col span={12}>
            <Button type="primary" onClick={submit}>
              新增打样订单
            </Button>
            <Button type="primary" style={{ marginLeft: 18 }} onClick={reset}>
              新增定制订单
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Form.Item name="type">
              <Select style={{ width: 140 }}>
                <Option value="1">订单编号</Option>
                <Option value="2">客户姓名</Option>
                <Option value="3">客户手机号</Option>
              </Select>
            </Form.Item>
            <Form.Item name="search" style={{ marginLeft: 10 }}>
              <Search placeholder="请输入" enterButton />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="time" label="下单时间">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="timeTag">
              <Tags list={timeList} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item name="orderType" label="订单类型">
            <Tags list={orderTypeList} />
          </Form.Item>
        </Row>
      </Form>
      <div className={styles.table}>
        <Tabs onChange={onChangeTab} type="card">
          <TabPane tab="全部" key="1"></TabPane>
          <TabPane tab="待匹配" key="2"></TabPane>
          <TabPane tab="待工厂接单" key="3"></TabPane>
        </Tabs>
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(NewOrder);
