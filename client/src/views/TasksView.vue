<template>
    <div class="tasks-container">
        <div class="task-card">
            <input type="text" v-model="newTask.title" class="task-title-input" placeholder="Title" />
            <textarea v-model="newTask.description" class="task-desc-input" placeholder="Description"></textarea>
            <button @click="addTask" :disabled="!addBtnEnabled" class="apply-btn">Add Task</button>
            <button @click="clearTask" class="cancel-btn">Clear</button>
        </div>
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @update="handleEdit" @delete="handleDelete" />
    </div>
</template>
  
<script>
import api from '@/services/api';
import TaskCard from '../components/TaskCard.vue';

export default {
    components: {
        TaskCard
    },
    data() {
        return {
            tasks: [],
            newTask: {
                title: '',
                description: '',
            }
        };
    },
    methods: {
        handleEdit(task) {
            // Logic to handle edit
            api.updateTask(task.id, task)
            .catch(console.error)
            .then(updated=>{
                const idx = this.tasks.findIndex(el => el.id===updated.id);
                this.tasks[idx] = updated;
            });
        },
        handleDelete(taskId) {
            // Logic to handle delete
            api.deleteTask(taskId)
            .catch(console.error)
            .then(()=>{
                const idx = this.tasks.findIndex(el => el.id === taskId);
                this.tasks.splice(idx,1);
            })
        },
        clearTask() {
            this.newTask.title = '';
            this.newTask.description = '';
        },
        addTask() {
            api.createTask(this.newTask)
            .catch(console.error)
            .then(task=>{
                this.tasks.push(task);
            });
            this.clearTask();
        }
    },
    computed: {
        addBtnEnabled() {
            return this.newTask.title
                && this.newTask.title.trim() !== ''
        }
    },
    mounted() {
        api.listTasks()
            .catch(console.error)
            .then(res => {
                this.tasks = res;
            });
    }
}
</script>
<style scoped>
.tasks-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.apply-btn[disabled] {
    background-color: grey;
    cursor: not-allowed;
}
</style>