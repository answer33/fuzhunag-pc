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
    withdraw_no: '961180319019',
    withdraw_time: 1618839226336,
    company_name: 'xxxxxx公司',
    withdraw_acount: '13600001234',
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
      title: '申请时间',
      dataIndex: 'withdraw_time',
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
      title: '工厂名称',
      dataIndex: 'company_name',
    },
    {
      title: '提现账号',
      dataIndex: 'withdraw_acount',
    },
    {
      title: '提现金额（元）',
      dataIndex: 'price',
      render: (text: any) => <span>¥{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return <p style={{ color: '#FF8149', cursor: 'pointer' }}>查看详情</p>;
      },
    },
  ];

  const callback = (key) => {
    console.log(key);
  };

  return (
    <div className={styles['withdraw-approval']}>
      <div className={styles.info}>
        <div className={styles.item}>
          <img
            src={require('@/assets/img/finance/icon6.png')}
            alt=""
            style={{ width: 27, marginLeft: 57 }}
          />
          <div>
            <p>待审批</p>
            <p>4</p>
          </div>
        </div>
        <div className={styles.item}>
          <img
            src={require('@/assets/img/finance/icon7.png')}
            alt=""
            style={{ width: 33, marginLeft: 28 }}
          />
          <div>
            <p>
              待提现金额<span>（元）</span>
            </p>
            <p>
              <span style={{ fontSize: 14 }}>¥</span> 4,000
            </p>
          </div>
        </div>
      </div>
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
      <div className={styles.table}>
        <Tabs onChange={callback} type="card">
          <TabPane tab="待审批" key="1"></TabPane>
          <TabPane tab="驳回" key="2"></TabPane>
          <TabPane tab="提现历史" key="3"></TabPane>
        </Tabs>
        <Table columns={columns} rowKey="withdraw_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(ReconciliationCenter);
