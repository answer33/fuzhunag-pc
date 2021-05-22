import { FC, memo, useState } from 'react';
import { Form, Table, Input, Row, Col, DatePicker } from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import moment from 'moment';
import styles from './index.less';

const { Search } = Input;
const { RangePicker } = DatePicker;

const dataSource = [
  {
    order_no: '961180319019',
    order_time: 1618839226336,
    complete_time: 1618839226336,
    phone: '13600001234',
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

const ReconciliationCenter: FC<any> = (props) => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '订单编号',
      dataIndex: 'order_no',
    },
    {
      title: '下单时间',
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
      title: '完成时间',
      dataIndex: 'complete_time',
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

  return (
    <div className={styles['reconciliation-center']}>
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
          <img
            src={require('@/assets/img/finance/icon4.png')}
            alt=""
            style={{ width: 38, marginLeft: 45 }}
          />
          <div>
            <p>成交单数</p>
            <p>4</p>
          </div>
        </div>
        <div className={styles.item}>
          <img
            src={require('@/assets/img/finance/icon5.png')}
            alt=""
            style={{ width: 47, marginLeft: 25 }}
          />
          <div>
            <p>
              成交金额<span>（元）</span>
            </p>
            <p>
              <span style={{ fontSize: 14 }}>¥</span> 4,000
            </p>
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(ReconciliationCenter);
