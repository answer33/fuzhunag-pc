import { FC, memo, useState } from 'react';
import { Button, Timeline, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.less';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const User: FC<any> = () => {
  const [deliverFrom] = Form.useForm();
  const [deliverVisible, setDeliverVisible] = useState(false);
  const [collectionVisible, setcollectionVisible] = useState(false);
  const [recipientVisible, setrecipientVisible] = useState(true);
  const [opinion, setOpinion] = useState('');
  const [recipientIndex, setRecipientIndex] = useState(0);

  const onChangeRecipientIndex = (i) => {
    setRecipientIndex(i);
  };
  return (
    <div className={styles['order-detail']}>
      <div className={styles.box1}>
        <div className={styles.left}>
          <p>订单号：961180319019</p>
          <p>匹配工厂</p>
          <Button type="primary" ghost>
            匹配工厂
          </Button>
          <div className={styles.action}>
            <p>打印订单</p>
            <p>编辑订单</p>
            <p>取消订单</p>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.name}>该订单已下单，请尽快匹配工厂生产…</p>
          <div className={styles.steps}>
            <div className={styles.item}>
              <img src={require('@/assets/img/order/steps/step1.svg')} alt="" />
              <p>提交订单</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>等待匹配</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step2-gray.svg')}
                alt=""
              />
              <p>工厂接单</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>等待报价</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step3-gray.svg')}
                alt=""
              />
              <p>进行中</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>待发货</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step4-gray.svg')}
                alt=""
              />
              <p>已发货</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>待收货</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step5-gray.svg')}
                alt=""
              />
              <p>已收货</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>待发货</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step6-gray.svg')}
                alt=""
              />
              <p>给客户发货</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
            <div className={styles.line}>
              <p>待客户发货</p>
              <img src="" alt="" />
            </div>
            <div className={styles.item}>
              <img
                src={require('@/assets/img/order/steps/step7-gray.svg')}
                alt=""
              />
              <p>完成</p>
              <p>2021-02-21</p>
              <p>14:12:50</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.box2}>
        <div className={styles.left}>
          <div className={styles.item}>
            <p className={styles.name}>客户收货信息</p>
            <div className={styles.row}>
              <div className={styles.col1}>收货人：</div>
              <div className={styles.col2}>张三</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>地址：</div>
              <div className={styles.col2}>
                广东省珠海市香洲区唐家湾镇港 乐路8号大洲科技园B区806室
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>联系电话：</div>
              <div className={styles.col2}>136****1234</div>
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>平台收货信息</p>
            <span style={{ color: '#2ECD74', cursor: 'pointer', fontSize: 12 }}>
              查看详情
            </span>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>配送信息</p>
            <div className={styles.row}>
              <div className={styles.col1}>运费：</div>
              <div className={styles.col2}>¥ 0.00</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>期望交期：</div>
              <div className={styles.col2}>2021-02-21</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>发货时间：</div>
              <div className={styles.col2}>
                2021-02-21
                <span style={{ color: '#35C759' }}>剩余 1天 20小时</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>付款信息</p>
            <div className={styles.row}>
              <div className={styles.col1}>付款方式：</div>
              <div className={styles.col2}>
                银行转账
                <span>已审核</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>支付金额：</div>
              <div className={styles.col2}>¥ 2,370.00</div>
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>订单要求</p>
            <span style={{ wordWrap: 'break-word', fontSize: 12 }}>
              https://item.taobao.com/item.htm?spm=a230r.1.14.37.18b956b3Js4Xhk&id=633167910004&ns=1&abbucket=11#detail
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <Timeline mode="left">
            <Timeline.Item label="2015-09-01">
              货已包装完成等待发货，待客户尽快支付尾款
            </Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">
              订单已完成后整包装，点击图片放大查看
              <div className={styles.images}>
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <div className={styles.box3}>
        <ul>
          <li>
            <div>款号</div>
            <div>图片</div>
            <div>码数</div>
            <div>颜色</div>
            <div>数量 (件)</div>
            <div>工厂报价 (元)</div>
            <div>客单价 (元)</div>
          </li>
          <li>
            <div>
              203H16{' '}
              <img
                src={require('@/assets/img/order/>.png')}
                alt=""
                style={{ width: 14 }}
              />
            </div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              60 <br />
              70
            </div>
            <div>米色</div>
            <div>
              1 <br />
              1 <br />
            </div>
            <div>¥18.00</div>
            <div>¥18.00</div>
          </li>
        </ul>
        <div className={styles['priec-con']}>
          <div className={styles.item}>
            <p>款式1单价：</p>
            <p>¥18.00</p>
          </div>
          <div className={styles.item}>
            <p>款式2单价：</p>
            <p>¥18.00</p>
          </div>
          <div className={styles.item}>
            <p>款式1数量：</p>
            <p>200</p>
          </div>
          <div className={styles.item}>
            <p>款式2数量：</p>
            <p>200</p>
          </div>
          <div className={styles.item}>
            <p>运费：</p>
            <p>¥200</p>
          </div>
          <div className={styles.item}>
            <p>总额：</p>
            <p>¥200</p>
          </div>
          <div className={styles.item}>
            <p>已付 (30%)：</p>
            <p>¥200</p>
          </div>
          <div className={styles.item} style={{ marginTop: 15 }}>
            <p>合计尾款金额：</p>
            <p style={{ color: '#F24714', fontSize: 16 }}>
              <span style={{ fontSize: 12 }}>¥</span>200
            </p>
          </div>
        </div>
      </div>
      <Modal
        className={styles.add}
        visible={deliverVisible}
        title="确认发货"
        onCancel={() => setDeliverVisible(false)}
        onOk={() => {
          deliverFrom
            .validateFields()
            .then((values) => {
              deliverFrom.resetFields();
              console.log(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={deliverFrom} {...formItemLayout}>
          <Form.Item
            name="name"
            label="物流公司"
            rules={[
              {
                required: true,
                message: '请输入物流信息！',
              },
            ]}
          >
            <Input placeholder="录入物流信息" />
          </Form.Item>
          <Form.Item
            name="no"
            label="单号"
            rules={[
              {
                required: true,
                message: '请输入单号！',
              },
            ]}
          >
            <Input placeholder="请输入单号" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={collectionVisible}
        title="银行转账付款"
        okText="收款确认"
        onCancel={() => setcollectionVisible(false)}
        onOk={() => setcollectionVisible(false)}
      >
        <div className={styles.collectionModal}>
          <div className={styles.item}>
            <p>
              <img src={require('@/assets/img/order/price.svg')} alt="" />
              付款金额(元)
            </p>
            <p style={{ color: '#007BFF', fontSize: 18 }}>
              <span style={{ fontSize: 14 }}>¥</span>2,370
            </p>
          </div>
          <div className={styles.item}>
            <p>付款时间：</p>
            <p>2021-03-15 14:00:21</p>
          </div>
          <div className={styles.item}>
            <p>付款凭证：</p>
            <p>
              <img src="" alt="" />
            </p>
          </div>
          <TextArea
            placeholder="填写意见"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value.trim())}
          />
        </div>
      </Modal>
      <Modal
        visible={recipientVisible}
        title="收货信息"
        onCancel={() => setrecipientVisible(false)}
        onOk={() => setrecipientVisible(false)}
        width={930}
      >
        <div className={styles.recipientModal}>
          <div
            className={classNames({
              [styles.item]: true,
              [styles.active]: recipientIndex === 0,
            })}
            onClick={() => onChangeRecipientIndex(0)}
          >
            <div>
              <UserOutlined style={{ color: '#CCCCCC', fontSize: 16 }} />
              <span className={styles.name}>张三</span>
              <span className={styles.label}>默认地址</span>
            </div>
            <div>13800001234</div>
            <div>广东省-中山市-坦洲镇 庄士敦工业中心</div>
            <div>仓库：中山仓库</div>
          </div>
          <div
            className={classNames({
              [styles.item]: true,
              [styles.active]: recipientIndex === 1,
            })}
            onClick={() => onChangeRecipientIndex(1)}
          >
            <div>
              <UserOutlined style={{ color: '#CCCCCC', fontSize: 16 }} />
              <span className={styles.name}>张三</span>
            </div>
            <div>13800001234</div>
            <div>广东省-中山市-坦洲镇 庄士敦工业中心</div>
            <div>仓库：中山仓库</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(User);
