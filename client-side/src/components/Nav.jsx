import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'

const items = [
    {
        label: (
            <Link to='/create'>Novo Usuário</Link>
        )
    },
  
]
const Nav = () => {
  return (
    <Menu items={items}/>
  )
}

export default Nav