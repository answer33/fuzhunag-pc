import { FC, memo, useState } from 'react';
import { Input, Radio, Button, Tabs } from 'antd';
import { history } from 'umi';
import styles from './index.less';

const { Search } = Input;
const { TabPane } = Tabs;

const MatchFactory: FC<any> = () => {
  return (
    <div className={styles['match-factory']}>
      <div className={styles.top}>
        <Search
          placeholder="输入工厂名称、联系人或手机号"
          enterButton
          style={{ width: 340 }}
        />
        <p className={styles.close} onClick={() => history.goBack()}>
          <img src={require('@/assets/img/close.png')} alt="" />
        </p>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.item}>
            <p>工厂名称</p>
            <p>联系人</p>
            <p>联系电话</p>
          </div>
          <div className={styles.item}>
            <p>
              <Radio checked={true} />
              xxxxx工厂
            </p>
            <p>张三</p>
            <p>13637365480</p>
          </div>
          <div className={styles.btn}>
            <Button type="primary" style={{ marginRight: 15 }}>
              确定
            </Button>
            <Button>取消</Button>
          </div>
        </div>
        <div className={styles.right}>
          <Tabs type="card">
            <TabPane tab="基本信息" key="1">
              <div className={styles['base-info']}>
                <div className={styles['base-info-item']}>
                  <p className={styles.name}>工厂名称</p>
                  <p className={styles.val}>xxxxxx</p>
                </div>
                <div className={styles['base-info-item']}>
                  <p className={styles.name}>联系人</p>
                  <p className={styles.val}>xxxxxx</p>
                </div>
                <div className={styles['base-info-item']}>
                  <p className={styles.name}>工厂地址</p>
                  <p className={styles.val}>xxxxxx</p>
                </div>
                <div
                  className={styles['base-info-item']}
                  style={{ marginTop: 30 }}
                >
                  <p className={styles.name}>擅长类型</p>
                  <p className={styles.val}>xxxxxx</p>
                </div>
                <div className={styles['base-info-item']}>
                  <p className={styles.name}>联系人</p>
                  <p className={styles.val}>xxxxxx</p>
                </div>
                <div
                  className={styles['base-info-item']}
                  style={{ marginTop: 30 }}
                >
                  <p className={styles.name}>
                    租赁合同
                    <img
                      src={require('@/assets/img/order/camera.png')}
                      alt=""
                    />
                  </p>
                  <p className={styles.val}>
                    <img src="" alt="" style={{ width: 60, height: 78 }} />
                  </p>
                </div>
                <div
                  className={styles['base-info-item']}
                  style={{ marginTop: 30, alignItems: 'start' }}
                >
                  <p className={styles.name}>
                    上传营业执照
                    <img
                      src={require('@/assets/img/order/camera.png')}
                      alt=""
                    />
                  </p>
                  <p className={styles.val}>
                    <img
                      src=""
                      alt=""
                      style={{ display: 'block', width: 63, height: 85 }}
                    />
                    <p
                      style={{
                        marginTop: 30,
                        display: 'flex',
                      }}
                    >
                      <p style={{ width: 147, textAlign: 'center' }}>
                        <img
                          src=""
                          alt=""
                          style={{ width: 147, height: 100 }}
                        />
                        <p>身份证正面</p>
                      </p>
                      <p
                        style={{
                          width: 147,
                          textAlign: 'center',
                          marginLeft: 34,
                        }}
                      >
                        <img
                          src=""
                          alt=""
                          style={{ width: 147, height: 100 }}
                        />
                        <p>身份证反面</p>
                      </p>
                    </p>
                  </p>
                </div>
              </div>
            </TabPane>
            <TabPane tab="订单信息" key="2">
              <div className={styles['order-info']}>
                <div className={styles['order-info-item']}>
                  <div className={styles.col1}>
                    <p>订单号：961180319019</p>
                    <p>下单时间：2018-06-04</p>
                  </div>
                  <div className={styles.col2}>
                    <p>张三 13600001234</p>
                    <p>广东省珠海市香洲区港乐路8号B区110室</p>
                  </div>
                  <div className={styles.col3}>
                    <p style={{ color: '#017AFF' }}>进行中</p>
                    <p>预计2月25日发货</p>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default memo(MatchFactory);
