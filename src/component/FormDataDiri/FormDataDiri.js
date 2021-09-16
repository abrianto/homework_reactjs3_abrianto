import React, { useState } from "react";
import { Divider, Layout, Menu, Typography, Form, Input, DatePicker, Radio, Select, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import './style.css';
import logo from '../../image/BRI_2020.png';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay-ts';
const { Title } = Typography
const { TextArea } = Input
const { Header, Content } = Layout;


const FormDataDiri = () => {
  const [isActive, setActive] = useState(false)
  const [message, setMessage] = useState('Success')
  const [onSuccess, setSuccess] = useState(false)

  const onFinish = (values) => {
    var startIndex = (values.ktp.indexOf('\\') >= 0 ? values.ktp.lastIndexOf('\\') : values.ktp.lastIndexOf('/'));
    var filename = values.ktp.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    const payload = { 
      id_cust: 1,
      nik: Number(values.nik),
      nama_lengkap: values.fullname,
      tempat_lahir: values.ttl.tempat,
      tanggal_lahir: new Date(values.ttl.tanggal).toLocaleDateString("en-US"),
      alamat: values.alamat,
      pekerjaan: values.jenis_pekerjaan,
      pendapatan_perbulan: Number(values.pendapatan),
      bukti_ktp: filename,
    };

    setActive(true)
    axios.post(`https://697e2e1d-d698-4f34-b4a7-f9c168e24ff6.mock.pstmn.io/buat_pengajuan`, { payload })
    .then(res => {
      try {
        if(res.status === 200) {
          const result = res.data;
          setActive(false)
          setMessage(result.message)
          setSuccess(true)
          setTimeout(function(){ 
            window.location.href = "data-pendukung";
          }, 3000);
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
              <Title level={4}>Data Pemohon KPR</Title>
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
                  label="Nomor Induk KTP"
                  name="nik"
                  rules={[{ required: true, message: 'Silahkan isi NIK!' }]}
                >
                  <Input type="number" />
                </Form.Item>
                
                <Form.Item
                  label="Nama Lengkap"
                  name="fullname"
                  rules={[{ required: true, message: 'Silahkan isi Nama Lengkap!' }]}
                >
                  <Input type="text" />
                </Form.Item>

                <Form.Item label="Tempat, Tanggal Lahir">
                  <Input.Group compact>
                    <Form.Item
                      name={['ttl', 'tempat']}
                      noStyle
                      rules={[{ required: true, message: 'Silahkan isi Tempat Lahir!' }]}
                    >
                      <Input style={{ width: '50%' }} name="tempat" />
                    </Form.Item>
                    <Form.Item
                      name={['ttl', 'tanggal']}
                      noStyle
                      rules={[{ required: true, message: 'Silahkan isi tanggal Lahir!' }]}
                    >
                      <DatePicker style={{ width: '50%' }} name="tgl_lahir" />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                
                <Form.Item
                  label="Status Pernikahan"
                  name="status_pernikahan"
                  rules={[{ required: true, message: 'Silahkan pilih status pernikahan!' }]}
                >
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>Single</Radio>
                    <Radio value={2}>Menikah</Radio>
                    <Radio value={3}>Duda/Janda/Cerai</Radio>
                  </Radio.Group>
                </Form.Item>
                
                <Form.Item
                  label="Alamat Domisili"
                  name="alamat"
                  rules={[{ required: true, message: 'Silahkan isi alamat domisili!' }]}
                >
                  <TextArea rows={4}/>
                </Form.Item>

                <Form.Item
                  label="Jenis Pekerjaan"
                  name="jenis_pekerjaan"
                  rules={[{ required: true, message: 'Silahkan pilih jenis pekerjaan!' }]}
                >
                  <Select placeholder="Jenis Pekerjaan">
                    <Select.Option value="pns">Pegawai Negeri</Select.Option>
                    <Select.Option value="swasta">Pegawai Swasta</Select.Option>
                    <Select.Option value="BUMN/BUMD">BUMN/BUMD</Select.Option>
                    <Select.Option value="pengusaha">Pengusaha</Select.Option>
                    <Select.Option value="pekerjaan_lepas">Pekerja Lepas</Select.Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  label="Pendapatan per Bulan"
                  name="pendapatan"
                  rules={[{ required: true, message: 'Silahkan isi pendapatan per bulan!' }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Bukti selfie dengan KTP"
                  name="ktp"
                >
                  <input type="file" required />
                </Form.Item>
                
                <Form.Item
                  label="Bukti Slip Gaji"
                  name="gaji"
                >
                  <input type="file" required />
                </Form.Item>

                <Alert
                  description="Setelah Anda berhasil melanjutkan proses pengecekan ini, Anda tidak dapat mengubah data-data yang ada pada form ini."
                  type="warning"
                />

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
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
  );
};
export default FormDataDiri;