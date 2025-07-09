import React from 'react'
import { Button, Menu } from '@mantine/core'
import { TaskType } from '@/lib/entities/tasks'
import styles from './taskcard.module.css'

const CardMenu = ({ task }: { task: TaskType }) => {
  return (
    <div>
        <Menu trigger='hover' position='right-start'>
        <Menu.Target>
            <Button onClick={(e) => e.stopPropagation()} className={styles.menu}>...</Button>
        </Menu.Target>

        <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
            <Menu.Item>
                Vital
            </Menu.Item>
            <Menu.Item>
                Edit
            </Menu.Item>
            <Menu.Item>
                Delete
            </Menu.Item>
            <Menu.Item>
                Finish
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
    </div>
  )
}

export default CardMenu