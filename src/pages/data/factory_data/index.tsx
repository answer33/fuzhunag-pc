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
    enter_time: 1618839226336,
    prev_order_time: 1618839226336,
    factory_name: 'xxxxx公司',
    name: '张三',
    phone: '13600001234',
    address: '收货地址xxxxx',
    order_num: 1000,
    price: 2000,
    status: '启用',
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
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '工厂名称',
      dataIndex: 'factory_name',
      render: (text: any, record: any) => {
        return <div>{text}</div>;
      },
    },
    {
      title: '入驻时间',
      dataIndex: 'enter_time',
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
      title: '工厂地址',
      dataIndex: 'address',
    },
    {
      title: '主体负责人',
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
      title: '下单情况',
      dataIndex: 'price',
      render: (text: any, record: any) => {
        return (
          <div>
            <p>本月累计下单金额：¥{text}</p>
            <p>本月累计下单次数：{record.order_num}</p>
            <p>
              本月上次下单时间：
              {moment(record.prev_order_time).format('YYYY-MM-DD')}
            </p>
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return (
          <div className={styles.action}>
            <p>详情</p>
            <span></span>
            <p>禁用</p>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles['factory-data']}>
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
          <Col className={styles['factory-total']}>总工厂数：12360</Col>
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
        <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(OperatingData);
