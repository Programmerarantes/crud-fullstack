import React, { useState } from 'react'
import {Form, Input, Button, DatePicker, Select, message} from 'antd'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const dateFormat = 'DD/MM/YYYY';

const CreateUser = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinishCreate = async  (values) => {
        try {
            axios.post('http://localhost:4000/users', values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        form.resetFields()
        navigate('/')
        message.success("Usuário cadastrado com sucesso")
        } catch (error) {
            console.log("Erro ao enviar dados:", error)
        }
        
    }

  return (
        <Form
            name="form"
            form={form}
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinishCreate}
            autoComplete='off'
        >
            <Form.Item
                label="Nome"
                name="nome"
                key='nome'
                rules={[
                    {
                        required: true,
                        message: 'Insira seu nome'
                    },
                            {
                                pattern: /^[a-zA-ZÀ-ÿ\s]*$/,
                                message: "Nome deve conter apenas letras e espaços"
                            },
                            {
                                max: 50,
                                message: "O nome deve ter no máximo 50 caracteres"
                            }
                        ]}>
                        <Input
                            //onChange={(e) => handleInput('nome', e.target.value)}
                        />
                    </Form.Item>

                <Form.Item
                    label="CPF"
                    name="cpf"
                    key='id'
                    rules={[
                        {
                            required: true,
                            message: 'Insira seu CPF'
                        },
                            {
                                pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                                message: 'Formato inválido de CPF. Use XXX.XXX.XXX-XX'
                            },
                            {
                                max: 14,
                                message: 'O CPF deve ter no máximo 11 numeros'
                            }
                        ]}>
                        <Input
                            //onChange={(e) => handleInput('cpf', e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="RG"
                        name="rg"
                        key='id'
                        rules={[
                            {
                                required: true,
                                message: 'Insira seu RG'
                            },
                            {
                                pattern: /^\d{2}\.\d{3}\.\d{3}\-\d{1}$/,
                                message: 'Formato inválido de RG. Use XX.XXX.XXX-X'
                            },
                            {
                                max: 12,
                                message: 'O RG deve ter no máximo 9 numeros'
                            }
                        ]}>
                        <Input
                            //onChange={(e) => handleInput('rg', e.target.value)}
                        />
                    </Form.Item>
        
                    <Form.Item
                        key='id'
                        label="Data de Nascimento"
                        name="data_nasc"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker 
                            //onChange={(date, dateString) => handleInput('data_nasc', dateString)}
                            format={dateFormat}
                        />
                    </Form.Item>

                    <Form.Item
                        key='id'
                        label="Sexo"
                        name="sexo"
                        rules={[{ required: true, message: 'Please input!' }]}>
                        <Select
                            defaultValue="Sexo"
                            style={{width: 120}}
                            options={[
                                { value: 'Masculino', label: 'Masculino'},
                                { value: 'Feminino', label: 'Feminino'},
                                { value: 'Outros', label: 'Outros'}
                            ]}
                            //onChange={(value) => handleInput('sexo', value)}
                        />
        
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Enviar
                        </Button>
                    </Form.Item>
        </Form>
   
  )
}

export default CreateUser



/*nome: values.nome,
            cpf: values.cpf,
            rg: values.rg,
            data_nasc: values.data_nasc,
            sexo: values.sexo
        })
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))*/