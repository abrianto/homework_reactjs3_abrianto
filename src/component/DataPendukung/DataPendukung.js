import React, { useState } from "react";
import { Divider, Layout, Menu, Typography, Form, Input, Select, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import './style.css';
import logo from '../../image/BRI_2020.png';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay-ts';
const { Title } = Typography
const { TextArea } = Input
const { Header, Content } = Layout;


const DataPendukung = () => {
  const [isActive, setActive] = useState(false)
  const [message, setMessage] = useState('Success')
  const [onSuccess, setSuccess] = useState(false)

  const onFinish = (values) => {
    var startIndex = (values.dokumen_pendukung.indexOf('\\') >= 0 ? values.dokumen_pendukung.lastIndexOf('\\') : values.dokumen_pendukung.lastIndexOf('/'));
    var filename = values.dokumen_pendukung.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    const payload = { 
      id_pengajuan: 1,
      alamat_rumah: values.alamat_rumah,
      luas_rumah: Number(values.luas_rumah),
      harga_rumah: Number(values.harga_rumah),
      jangka_pembayaran_thn: Number(values.jangka_pembayaran_thn),
      dokumen_pendukung: Number(values.dokumen_pendukung),
    };

    setActive(true)
    axios.post(`https://697e2e1d-d698-4f34-b4a7-f9c168e24ff6.mock.pstmn.io/kelengkapan_data`, { payload })
    .then(res => {
      try {
        if(res.status === 200) {
          const result = res.data;
          setActive(false)
          setMessage(result.message)
          setSuccess(true)
        }        
      } catch (error) {
        setActive(false)
      }
    })
  };

  return (
    <Layout className="layout">
      <LoadingOverlay
        active={isActive}
        spinner
      >
        <Header className="header">
          <div className="logo">
            <Link to={"/"}>
              <img className="logo" src={logo} alt="" />
            </Link>
          </div>
          <Menu mode="horizontal">
            <Menu.Item key={1}>Kembali ke Home</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '20px' }}>
          <div className="site-layout-content">
            <Title level={3}>Form Pengajuan KPR</Title>
            <div className="container">
              <Title level={4}>Data Pendukung</Title>
              { onSuccess ? <Alert message={message} type="success" showIcon /> : null }
              <Divider />

              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Alamat Rumah"
                  name="alamat_rumah"
                  rules={[{ required: true, message: 'Silahkan isi alamat rumah!' }]}
                >
                  <TextArea rows={4}/>
                </Form.Item>
                
                <Form.Item
                  label="Luas Rumah"
                  name="luas_rumah"
                  rules={[{ required: true, message: 'Silahkan isi luas rumah!' }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Harga Rumah"
                  name="harga_rumah"
                  rules={[{ required: true, message: 'Silahkan isi harga rumah!' }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Jangka Pembayaran"
                  name="jangka_pembayaran_thn"
                  rules={[{ required: true, message: 'Silahkan pilih jangka pembayaran!' }]}
                >
                  <Select placeholder="Jangka Pembayaran">
                    <Select.Option value="5">5</Select.Option>
                    <Select.Option value="10">10</Select.Option>
                    <Select.Option value="15">15</Select.Option>
                    <Select.Option value="20">20</Select.Option>
                    <Select.Option value="25">25</Select.Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  label="Dokumen Pendukung"
                  name="dokumen_pendukung"
                  rules={[{ required: true, message: 'Silahkan pilih dokumen pendukung!' }]}
                >
                  <input type="file" required />
                </Form.Item>
                
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
                    <Button type="primary" htmlType="submit">
                      Setuju dan Lanjutkan
                    </Button>
                  </Form.Item>
                </div>
              </Form>

            </div>
          </div>
        </Content>
      </LoadingOverlay>
    </Layout>
  );
};
export default DataPendukung;