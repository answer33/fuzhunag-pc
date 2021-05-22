import { FC, memo, useState } from 'react';
import { Form, Table, Input, Row, Col, DatePicker, Tabs } from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import moment from 'moment';
import styles from './index.less';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const dataSource = [
  {
    order_no: '961180319019',
    complete_time: 1618839226336,
    name: '张三',
    phone: '13600001234',
    factory_name: 'xxxxx公司',
    price: 2000,
    payment: '微信支付',
  },
];

const orderTimeList = [
  {
    id: 0,
    text: '按周',
  },
  {
    id: 3,
    text: '按月',
  },
  {
    id: 7,
    text: '年',
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

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const FundsManagement: FC<any> = (props) => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '完成时间',
      dataIndex: 'order_time',
      render: (text: any) => {
        return (
          <div>
            {moment(text).format('YYYY-MM-DD')}
            <span style={{ color: '#333', marginLeft: 5 }}>
              {moment(text).format('HH:mm:ss')}
            </span>
          </div>
        );
      },
    },
    {
      title: '订单号',
      dataIndex: 'order_no',
    },
    {
      title: '下单人',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        return (
          <div>
            <p>{text}</p>
            <p>{record.phone}</p>
          </div>
        );
      },
    },
    {
      title: '接单工厂',
      dataIndex: 'factory_name',
    },
    {
      title: '支付方式',
      dataIndex: 'payment',
    },
    {
      title: '金额（元）',
      dataIndex: 'price',
      render: (text: any) => <span>¥{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return <p style={{ color: '#FF8149', cursor: 'pointer' }}>详情</p>;
      },
    },
  ];

  const callback = (key) => {
    console.log(key);
  };

  return (
    <div className={styles['funds-management']}>
      <Form form={form} className={styles.filter}>
        <Row justify="space-between">
          <Col style={{ display: 'flex' }}>
            <Form.Item name="unit">
              <Tags list={orderTimeList} />
            </Form.Item>
            <Form.Item name="time" label="时间筛选" style={{ marginLeft: 30 }}>
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="search" style={{ width: 230 }}>
              <Search placeholder="工厂名称或工厂编号" enterButton />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.info}>
        <div className={styles.item}>
          <div className={styles.top}>
            <img
              src={require('@/assets/img/finance/icon1.png')}
              alt=""
              style={{ width: 22 }}
            />
            <p>
              收款金额<span>（元）</span>
            </p>
          </div>
          <p className={styles.price}>9,800.00</p>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            <img
              src={require('@/assets/img/finance/icon2.png')}
              alt=""
              style={{ width: 21 }}
            />
            <p>
              工厂提现金额<span>（元）</span>
            </p>
          </div>
          <p className={styles.price}>9,800.00</p>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            <img
              src={require('@/assets/img/finance/icon3.png')}
              alt=""
              style={{ width: 15 }}
            />
            <p>
              客户下单金额<span>（元）</span>
            </p>
          </div>
          <p className={styles.price}>9,800.00</p>
        </div>
      </div>
      <div className={styles.table}>
        <Tabs onChange={callback} type="card">
          <TabPane tab="订单" key="1"></TabPane>
          <TabPane tab="提现" key="2"></TabPane>
          <TabPane tab="退款" key="3"></TabPane>
        </Tabs>
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(FundsManagement);
