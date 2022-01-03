import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { tagReducer } from './TagReducer';
import setDefaultHeader from '../Utility/SetAxiosDefaultHeader';

//import toastify
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
export const TagContext = createContext();

const TagContextProvider = (props) => {
    const initialState = {
        tags: [],
        add_loading: false,
    }
    const [state, dispatch] = useReducer(tagReducer, initialState)

    const GetTags = async () => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.get('/tag/index')
            console.log(res)
            if(res.data.success){
                dispatch({type: "GET_TAGS", payload: res.data.data})
            } else {
                console.log(res.data.message)
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    const AddTag = async (name) => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            dispatch({ type: "ADD_LOADING", payload: true })
            const res = await axios.post('/tag/add', {name: name})
            console.log(res)
            if(res.data.success){
                dispatch({type: "ADD", payload: res.data.data})
                dispatch({ type: "ADD_LOADING", payload: false })
                toast.success(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            } else {
                dispatch({ type: "ADD_LOADING", payload: false })
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            dispatch({ type: "ADD_LOADING", payload: false });
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    return (
        <TagContext.Provider
          value={{
            tags: state.tags,
            add_loading: state.add_loading,
            GetTags,
            AddTag,
          }}
        >
          {props.children}
        </TagContext.Provider>
    );
}

export default TagContextProvider;