import { FC, memo } from 'react';
import { Col, Row, Form, Select, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';

const { Option } = Select;

const dataSource = [
  {
    order_no: '961180319019',
    order_date: '2021-03-25',
    order_time: '14:00:21',
    name: '张三',
    phone: '13600001234',
    factory: 'xxxxx工厂',
    order_num: 1000,
    price: 2000,
    status: 0,
    type: 1,
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

const User: FC<any> = () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '订单详情',
      dataIndex: 'order_no',
      render: (text: any, record: any) => {
        return (
          <div className={styles['order-detail']}>
            <p>订单号：{text}</p>
            <p>
              下单时间：{record.order_date}
              <span>{record.order_time}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: '订单工厂',
      dataIndex: 'factory',
      render: (text: any, record: any) => {
        return (
          <>
            <p>
              <span>{record.name}</span>
              <span style={{ marginLeft: 10 }}>{record.phone}</span>
            </p>
            <p>{text}</p>
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
      title: '订单类型',
      dataIndex: 'type',
      render: (text: any) => <span>打样订单</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => <span>进行中</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return (
          <span style={{ color: '#FF8149', cursor: 'pointer' }}>订单详情</span>
        );
      },
    },
  ];
  return (
    <div className={styles['member-detail']}>
      <div className={styles['user-info']}>
        <img src="" alt="" />
        <div>
          <p>张三</p>
          <p>13600001234</p>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.account}>
          <Row>
            <Col span={8}>
              <span>账号：</span>
              +86 13600001234
            </Col>
            <Col span={8}>
              <span>会员编号：</span>
              A00002
            </Col>
            <Col span={8}>
              <span>注册时间：</span>
              2021-03-20 16:41:59
            </Col>
          </Row>
          <Row style={{ marginTop: 18 }}>
            <Col span={2}>
              <span>收获地址:</span>
            </Col>
            <Col span={8}>
              <p>
                广东省珠海市香洲区港乐路8号B区110室{' '}
                <span className={styles.label}>默认</span>
              </p>
              <p>广东省珠海市香洲区唐家湾镇唐家市场162号</p>
            </Col>
            <Col
              span={8}
              offset={6}
              style={{ color: '#FF8149', cursor: 'pointer' }}
            >
              查看/编辑全部信息
            </Col>
          </Row>
        </div>
        <div className={styles.consume}>
          <p className={styles.title}>
            <span></span>
            消费信息
          </p>
          <Row style={{ color: '#9B9B9B' }}>
            <Col span={8}>累计下单金额(元)</Col>
            <Col span={8}>累计下单次数</Col>
            <Col span={8}>上次下单时间</Col>
          </Row>
          <Row style={{ color: '#686868' }}>
            <Col span={8} style={{ paddingLeft: 28 }}>
              ¥52,450.00
              <span
                style={{ color: '#FF9549', cursor: 'pointer', marginLeft: 7 }}
              >
                明细
              </span>
            </Col>
            <Col span={8}>65次</Col>
            <Col span={8}>2021-03-16</Col>
          </Row>
        </div>
      </div>
      <div className={styles.table}>
        <Form
          layout="inline"
          form={form}
          className={styles.filter}
          initialValues={{ type: '0', status: '0' }}
        >
          <Form.Item name="type" label="订单类型">
            <Select style={{ width: 140 }}>
              <Option value="0">所有订单</Option>
              <Option value="1">打样订单</Option>
              <Option value="2">定制订单</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="订单状态">
            <Select style={{ width: 140 }}>
              <Option value="0">全部</Option>
              <Option value="1">待发货</Option>
              <Option value="2">已发货</Option>
            </Select>
          </Form.Item>
        </Form>
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(User);
