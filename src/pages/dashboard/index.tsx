import { FC, memo, useState } from 'react';
import { Button, Form, Table, DatePicker } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';
const { RangePicker } = DatePicker;

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

const Dashboard: FC<any> = (props) => {
  const [timeLabelI, setTimeLabelI] = useState(0);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { type, changeType, submit, reset } = search;
  const onChangeTimeLable = (i: number) => {
    setTimeLabelI(i);
  };
  const searchForm = (
    <Form form={form} style={{ display: 'flex' }}>
      <Form.Item name="time">
        <RangePicker />
      </Form.Item>
      <Form.Item name="name">
        <div className={styles['time-label']}>
          <span
            className={timeLabelI === 0 ? styles.active : ''}
            onClick={() => onChangeTimeLable(0)}
          >
            今日
          </span>
          <span
            className={timeLabelI === 1 ? styles.active : ''}
            onClick={() => onChangeTimeLable(1)}
          >
            昨日
          </span>
          <span
            className={timeLabelI === 2 ? styles.active : ''}
            onClick={() => onChangeTimeLable(2)}
          >
            最近7天
          </span>
          <span
            className={timeLabelI === 3 ? styles.active : ''}
            onClick={() => onChangeTimeLable(3)}
          >
            最近30天
          </span>
        </div>
      </Form.Item>
    </Form>
  );
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
            <Button type="primary" className={styles['action-btn']}>
              匹配工厂
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.home}>
        <div className={styles['today-box']}>
          <div className={styles.top}>
            <p className={styles.name}>今日数据</p>
            <img src={require('@/assets/img/dashboard/eye.png')} alt="" />
            <p className={styles.time}>更新时间：2021-03-17 15:00:33</p>
            <p className={styles.more}>更多数据</p>
          </div>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.top}>
                <img
                  src={require('@/assets/img/dashboard/icon1.png')}
                  alt=""
                  style={{ width: 23 }}
                />
                <p>收款金额</p>
                <span>(元)</span>
              </div>
              <p className={styles.price}>9,800.00</p>
              <p className={styles.total}>昨日全天 10,245.00</p>
            </div>
            <div className={styles.item}>
              <div className={styles.top}>
                <img
                  src={require('@/assets/img/dashboard/icon2.png')}
                  alt=""
                  style={{ width: 22 }}
                />
                <p>工厂提现金额</p>
                <span>(元)</span>
              </div>
              <p className={styles.price}>9,800.00</p>
              <p className={styles.total}>昨日全天 10,245.00</p>
            </div>
            <div className={styles.item}>
              <div className={styles.top}>
                <img
                  src={require('@/assets/img/dashboard/icon3.png')}
                  alt=""
                  style={{ width: 16 }}
                />
                <p>会员下单数</p>
                <QuestionCircleOutlined
                  style={{ fontSize: 15, color: '#dadada', cursor: 'pointer' }}
                />
              </div>
              <p className={styles.price}>9,800.00</p>
              <p className={styles.total}>昨日全天 10,245.00</p>
            </div>
            <div className={styles.item}>
              <div className={styles.top}>
                <img
                  src={require('@/assets/img/dashboard/icon4.png')}
                  alt=""
                  style={{ width: 18 }}
                />
                <p>新增会员数</p>
                <QuestionCircleOutlined
                  style={{ fontSize: 15, color: '#dadada', cursor: 'pointer' }}
                />
              </div>
              <p className={styles.price}>20</p>
              <p className={styles.total}>昨日全天 2</p>
            </div>
            <div className={styles.item}>
              <div className={styles.top}>
                <img
                  src={require('@/assets/img/dashboard/icon5.png')}
                  alt=""
                  style={{ width: 20 }}
                />
                <p>新增工厂数</p>
                <QuestionCircleOutlined
                  style={{ fontSize: 15, color: '#dadada', cursor: 'pointer' }}
                />
              </div>
              <p className={styles.price}>20</p>
              <p className={styles.total}>昨日全天 2</p>
            </div>
          </div>
        </div>
        <div className={styles['pending-box']}>
          <p className={styles.title}>待办事项</p>
          <div className={styles.list}>
            <div className={styles.item}>
              <p className={styles.name}>会员下单</p>
              <p className={styles.num}>3</p>
            </div>
            <div className={styles.item}>
              <p className={styles.name}>提现审核</p>
              <p className={styles.num}>3</p>
            </div>
            <div className={styles.item}>
              <p className={styles.name}>工厂审核</p>
              <p className={styles.num}>3</p>
            </div>
            <div className={styles.item}>
              <p className={styles.name}>待发货单</p>
              <p className={styles.num}>3</p>
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.filter}>{searchForm}</div>
          <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default memo(Dashboard);
