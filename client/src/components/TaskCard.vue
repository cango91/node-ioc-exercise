<template>
    <div class="task-card" :key="task.id" v-if="!isEditing">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button @click="enableEditing" class="edit-btn">Edit</button>
        <button @click="handleDelete" class="delete-btn">Delete</button>
    </div>

    <div class="task-card" v-else>
        <input type="text" v-model="editableTask.title" class="task-title-input" />
        <textarea v-model="editableTask.description" class="task-desc-input"></textarea>
        <button @click="applyEdit" class="apply-btn">Apply</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
    </div>
</template>
  
<script>
export default {
    name: 'TaskCard',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEditing: false,
            editableTask: {
                title: '',
                description: ''
            }
        };
    },
    methods: {
        enableEditing() {
            this.editableTask = { ...this.task };
            this.isEditing = true;
        },
        applyEdit() {
            this.$emit('update', { ...this.editableTask });
            this.isEditing = false;
        },
        cancelEdit() {
            this.isEditing = false;
        },
        handleDelete() {
            this.$emit('delete', this.task.id);
        }
    }
}
</script>
  
<style>
.task-card {
    max-width: 500px;
    min-width: 300px;
    overflow-y: scroll;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-title-input,
.task-desc-input {
    width: 85%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    border: 2px solid salmon;
}

.edit-btn,
.apply-btn,
.cancel-btn,
.delete-btn {
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
}

.apply-btn {
    background-color: #4CAF50;
    color: white;
}

.cancel-btn {
    background-color: #f44336;
    color: white;
}

.edit-btn:hover {
    background-color: #e0e0e0;
}

.apply-btn:hover {
    background-color: #45a049;
}

.cancel-btn:hover {
    background-color: #d32f2f;
}

.delete-btn {
    background-color: #ff5252;
    color: white;
}

.delete-btn:hover {
    background-color: #ff4444;
}
</style>
  