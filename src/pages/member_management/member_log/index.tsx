import { FC, memo, useState } from 'react';
import { Form, Table, Input, DatePicker, Col, Row } from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';

const { RangePicker } = DatePicker;
const { Search } = Input;

const dataSource = [
  {
    time: '2021-03-20 12:09:33',
    name: '张三',
    phone: '13600001234',
    ip: '173.20.33.12',
    status: '登录',
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

const MemberLog: FC<any> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '会员信息',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        return (
          <div className={styles['member-info']}>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <p>{text}</p>
              <p>{record.phone}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '活动',
      dataIndex: 'status',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
  ];
  return (
    <div className={styles['member-log']}>
      <Form form={form} className={styles.filter}>
        <Row justify="space-between">
          <Col style={{ display: 'flex' }}>
            <Form.Item name="registeredTime" label="活跃时间">
              <RangePicker />
            </Form.Item>
            <Form.Item name="registeredTimeTag">
              <Tags list={orderTimeList} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="search" style={{ width: 230 }}>
              <Search placeholder="名字、手机号或客户编号" enterButton />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <Table columns={columns} rowKey="name" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(MemberLog);
