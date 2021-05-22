import { FC, memo, useState } from 'react';
import { Button, Form, Table, Input, DatePicker, Col, Row, Select } from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import moment from 'moment';
import styles from './index.less';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const dataSource = [
  {
    goods_id: '1973717471979',
    imgs: [
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    ],
    colors: '黄色',
    create_time: 1618839226336,
    price: 100,
  },
];

const orderTimeList = [
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

const FactoryList: FC<any> = () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '款号',
      dataIndex: 'goods_id',
    },
    {
      title: '图片',
      dataIndex: 'imgs',
      render: (text) => {
        return (
          <div style={{ display: 'flex' }}>
            {text.map((item, i) => (
              <img
                key={i}
                src={item}
                style={{ width: 60, height: 60, marginRight: 10 }}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: '颜色',
      dataIndex: 'colors',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
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
      title: '单价',
      dataIndex: 'price',
      render: (text: any) => <span>¥{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: (text: any) => {
        return (
          <span style={{ cursor: 'pointer', color: '#FF8149' }}>详情</span>
        );
      },
    },
  ];
  return (
    <div className={styles['goods-list']}>
      <Form form={form} className={styles.filter} initialValues={{ type: '0' }}>
        <Row justify="space-between">
          <Col span={12}>
            <Button type="primary" onClick={submit}>
              新增货品
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Form.Item name="type">
              <Select style={{ width: 120 }}>
                <Option value="0">按款号</Option>
              </Select>
            </Form.Item>
            <Form.Item name="search" style={{ width: 230, marginLeft: 10 }}>
              <Search placeholder="请输入" enterButton />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="createTime" label="创建时间">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="createTimeTag">
              <Tags list={orderTimeList} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <Table columns={columns} rowKey="goods_id" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(FactoryList);
