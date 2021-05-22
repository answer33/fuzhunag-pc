import { FC, memo, useState } from 'react';
import { Form, Table, Select, Row, Col } from 'antd';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.less';
const { Option } = Select;

const dataSource = [
  {
    order_no: '961180319019',
    order_time: 1618839226336,
    complete_time: 1618839226336,
    expect_time: '2021-04-05',
    name: '张三',
    phone: '13600001234',
    factory_name: 'xxxxx公司',
    order_num: 1000,
    price: 2000,
    payment: '微信支付',
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

const OperatingData: FC<any> = (props) => {
  const [month, setMonth] = useState(1);
  const [tab, setTab] = useState(0);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;
  const columns: any[] = [
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

  const onChangeTabs = (val) => {
    setTab(val);
  };
  return (
    <div className={styles['operating-data']}>
      <Form
        form={form}
        className={styles.filter}
        initialValues={{ year: '2021' }}
      >
        <Row justify="space-between">
          <Col style={{ display: 'flex' }}>
            <Form.Item name="year" label="选择年份">
              <Select style={{ width: 140 }}>
                <Option value="2020">2020</Option>
                <Option value="2021">2021</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {Array.from(Array(12), (v, k) => k + 1).map((item) => (
            <div
              key={item}
              className={classnames([
                styles.month,
                { [styles.active]: month === item },
              ])}
              onClick={() => setMonth(item)}
            >
              <p>{item}月</p>
              <p>下单金额</p>
              <p>¥ 2,000.00</p>
            </div>
          ))}
        </Row>
      </Form>
      <div className={styles.table}>
        <div className={styles.tabs}>
          <div
            className={tab === 0 ? styles.active : ''}
            onClick={() => onChangeTabs(0)}
          >
            <p className={styles.name}>
              下单金额
              <span>(元)</span>
            </p>
            <p className={styles.val}>¥ 5,000.00</p>
          </div>
          <div
            className={tab === 1 ? styles.active : ''}
            onClick={() => onChangeTabs(1)}
          >
            <p className={styles.name}>
              收款金额
              <span>(元)</span>
            </p>
            <p className={styles.val}>¥ 5,000.00</p>
          </div>
        </div>
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(OperatingData);
