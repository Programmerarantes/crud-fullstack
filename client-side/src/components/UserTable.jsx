import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {Table, Button, Space, Modal, Form, Input, Select, DatePicker, message} from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY'

const UserTable = () => {
    const [users, setUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    
    const [form] = Form.useForm()
    const navigate = useNavigate()
    
    useEffect(()=> {
        axios.get('http://localhost:4000/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (user) => {
        console.log("Dados originais do usuário:", user);
        setSelectedUser(user)
        setModalVisible(true)

        const formattedDate = moment(user.data_nasc).format('DD/MM/YYYY');
    
        form.setFieldsValue({
            ...user,
            data_nasc: formattedDate ? moment(formattedDate, 'DD/MM/YYYY') : null,
        })
    }

    const handleFinishUpdate = async  (values) => {
        try {
            const response = await axios.put(`http://localhost:4000/users/${selectedUser.id}`, values)
            console.log(response.data)
            setUsers(users.map(user => (user.id === selectedUser ? response.data : user)))
            setModalVisible(false)
            navigate('/')
            message.success('Usuário cadastrado com sucesso')
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
        }
        
    }

    const handleDelete = async (id) => {
        axios.delete(`http://localhost:4000/users/${id}`)
        .then(res => {
            console.log(res)
            setUsers(users.filter(user => user.id !== id))
        })
        .catch(err => console.error(err))
    }

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: "Confirmação",
            content: "Tem certeza que deseja excluir o usuário?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk: () => handleDelete(id),
            onCancel: () => setSelectedUser(null)
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key:'nome'
        },
        {
            title: "CPF",
            dataIndex: 'cpf',
            key:'cpf'
        },
        {
            title: "RG",
            dataIndex: 'rg',
            key:'rg'
        },
        {
            title: "Data de Nascimento",
            dataIndex: 'data_nasc',
            key:'data_nasc',
            render: (date) => {
                const formattedDate = new Date(date)
                const day = formattedDate.getDate();
                const month = formattedDate.getMonth() + 1;
                const year = formattedDate.getFullYear();
      
                return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
            }
                /* const formattedDate = moment(date, 'DD/MM/YYYY');
                return formattedDate.isValid() ? formattedDate.format('DD/MM/YYYY') : '-';;*/

        },
        {
            title: "Sexo",
            dataIndex: 'sexo',
            key:'sexo'
        },
        {
            title: 'Ações',
            key: 'ações',
            render : (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleEdit(record)}>
                        Editar Usuário 
                    </Button>
                    <Button type='primary' danger onClick={() => showDeleteConfirm(record.id)}>
                        Deletar Usuário
                    </Button>
                </Space>
            ),
        },
    ]

  return (
    <> 
        <Button type='primary' > 
            <UserAddOutlined/>
            <Link to='/create'>Novo Usuário</Link>
        </Button>
            <Table dataSource={users}  columns={columns}/>
        

        <Modal
            title="Editar Usuário"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={form.submit}
        >
             <Form form={form} onFinish={handleFinishUpdate}>
                    <Form.Item name="nome" label="Nome">
                        <Input />
                    </Form.Item>
                    <Form.Item name="cpf" label="CPF">
                        <Input />
                    </Form.Item>
                    <Form.Item name="rg" label="RG">
                        <Input />
                    </Form.Item>
                    <Form.Item name="data_nasc" label="Data de Nascimento">
                        <DatePicker format={dateFormat} style={{ width: '100%' }}/>
                    </Form.Item>
                    <Form.Item name="sexo" label="Sexo">
                        <Select 
                        options={[
                                { value: 'Masculino', label: 'Masculino'},
                                { value: 'Feminino', label: 'Feminino'},
                                { value: 'Outros', label: 'Outros'}
                            ]}
                        />
                    </Form.Item>
                </Form>
        </Modal>
    </>
    
  )
}

export default UserTable