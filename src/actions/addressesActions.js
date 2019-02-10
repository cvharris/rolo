import {
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESSES,
  UPDATE_ADDRESS
} from 'config/constants'

export const setAllAddresses = addressState => ({
  type: SET_ADDRESSES,
  addressState
})

export const addAddress = address => ({ type: ADD_ADDRESS, address })

export const updateAddress = address => ({ type: UPDATE_ADDRESS, address })

export const removeAddress = address => ({ type: REMOVE_ADDRESS, address })
