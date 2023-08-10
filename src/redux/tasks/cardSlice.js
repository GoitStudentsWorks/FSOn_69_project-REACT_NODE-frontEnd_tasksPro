import { createSlice } from '@reduxjs/toolkit';
import { updateOrdersFromArray } from 'helpers';
import operations from 'redux/boards/boardOperations';
import { moveTaskToColumn } from 'redux/columns/columnOperations';

import { logOut } from '../auth/authOperations';

import {
  addTask,
  deleteTask,
  getTask,
  moveTask,
  updateTask,
} from './cardOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  console.error(action.payload);
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(operations.fetchColumnsTasks.pending, handlePending)
      .addCase(moveTaskToColumn.pending, handlePending)
      .addCase(addTask.pending, handlePending)
      .addCase(deleteTask.pending, handlePending)
      .addCase(getTask.pending, handlePending)
      .addCase(updateTask.pending, handlePending)
      .addCase(operations.fetchColumnsTasks.rejected, handleRejected)
      .addCase(moveTaskToColumn.rejected, handleRejected)
      .addCase(moveTask.rejected, handleRejected)
      .addCase(addTask.rejected, handleRejected)
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(getTask.rejected, handleRejected)
      .addCase(updateTask.rejected, handleRejected)
      .addCase(operations.fetchColumnsTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.tasks;
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = updateOrdersFromArray(state.items, action.payload);
      })
      .addCase(moveTaskToColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          _id: id,
          createdAt,
          updatedAt,
          ...rest
        } = action.payload.result;
        state.items.push({
          id,
          ...rest,
        });
        console.log(`${action.payload.result.title} added to your tasks`);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
          console.log('Task deleted');
        }
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          _id: id,
          createdAt,
          updatedAt,
          ...rest
        } = action.payload.result;
        const index = state.items.findIndex(task => task.id === id);
        if (index !== -1) {
          state.items[index] = {
            id,
            ...rest,
          };
          console.log('Task updated');
        }
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export default tasksSlice.reducer;
