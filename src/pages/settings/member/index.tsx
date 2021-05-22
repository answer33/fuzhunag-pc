import { FC, memo, useState } from 'react';
import { Button, Form, Table, Input, Col, Row, Tabs } from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';

const { Search } = Input;
const { TabPane } = Tabs;

const dataSource = [
  {
    username: '张三',
    phone: '1373635786',
    auth: '订单管理、会员管理、工厂管理',
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
  console.log(1111, formData);
  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const Member: FC<any> = () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '权限',
      dataIndex: 'auth',
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
  const callback = (key) => {
    console.log(key);
  };
  return (
    <div className={styles.member}>
      <Form form={form} className={styles.filter} initialValues={{ type: '0' }}>
        <Row justify="space-between">
          <Col span={12}>
            <Button type="primary" onClick={submit}>
              新增用户
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Form.Item name="search" style={{ width: 230, marginLeft: 10 }}>
              <Search placeholder="用户名称、手机号" enterButton />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <Tabs onChange={callback} type="card">
          <TabPane tab="全部" key="1"></TabPane>
          <TabPane tab="启用" key="2"></TabPane>
          <TabPane tab="禁用" key="3"></TabPane>
        </Tabs>
        <Table columns={columns} rowKey="phone" dataSource={dataSource} />
      </div>
    </div>
  );
};

export default memo(Member);
