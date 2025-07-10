import React, { useState } from 'react'
import styles from './edit.module.css'
import { Button, Radio, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {IconCalendar} from '@tabler/icons-react'
import { TaskType } from "@/lib/entities/tasks";

const EditModal = ({task}: {task: TaskType}) => {
    const {title, description, priority, date} = task;
    const [form, setForm] = useState<{
        title: string;
        dueDate: Date | null;
        priority: string | null;
        description: string | null;
    }>({
        title: title,
        dueDate: new Date(date),
        priority: priority || null,
        description: description || null,
    });

  return (
    <div className={styles.editCard}>
        <form>
            <TextInput
                label="Title"
                name="title"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
            />

            <DatePickerInput
                rightSection={<IconCalendar />}
                label="Date"
                name="dueDate"
                value={form.dueDate}
                onChange={(value) => setForm({...form, dueDate: value})}
            />

            <Radio.Group 
                label="Priority"
                name="priority"
                className={styles.radioGroup}
                value={form.priority || ''}
                onChange={(value) => setForm({...form, priority: value})}
            >
                <Radio className={styles.radio} value="Extreme" label="Extreme" color='red' />
                <Radio className={styles.radio} value="Moderate" label="Moderate" color='blue' />
                <Radio className={styles.radio} value="Low" label="Low" color='green' />
            </Radio.Group>

            <Textarea
                label="Task Description"
                name="description"
                autosize
                minRows={4}
                placeholder="Start writing here..."
                value={form.description || ''}
                onChange={(e) => setForm({...form, description: e.target.value})}
            />

            <Button type="submit" className={styles.doneButton}>Done</Button>
        </form>
    </div>
  )
}

export default EditModal