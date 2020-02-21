import * as types from '../constants/types';

export const addNewEvent = (event) => (
{
    type: types.ACTION_ADD_AVENT,
    payload: event
})

export const deleteEvent = (event) => (
{
    type: types.ACTION_DELETE_AVENT,
    payload: event
})

export const updateEvent = (event) => (
{
    type: types.ACTION_UPDATE_AVENT,
    payload: event
})