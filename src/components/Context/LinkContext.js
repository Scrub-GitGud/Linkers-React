import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { linkReducer } from './LinkReducer';
import setDefaultHeader from '../Utility/SetAxiosDefaultHeader';

//import toastify
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
export const LinkContext = createContext();

const LinkContextProvider = (props) => {
    const initialState = {
        links: [],
        folders: [],
        add_loading: false,
    }
    const [state, dispatch] = useReducer(linkReducer, initialState)

    const GetTopLinks = async (search_text) => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.get('/link/top', {search_text})
            console.log(res)
            if(res.data.success){
                dispatch({type: "GET_LINKS", payload: res.data.data})
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    const GetLinks = async (formData) => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.get('/link/index')
            console.log(res)
            if(res.data.success){
                dispatch({type: "GET_LINKS", payload: res.data.data})
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }
    
    const AddLink = async (formData) => {
        if(localStorage.linkers_token) {
            setDefaultHeader(localStorage.linkers_token)
        }
        try {
            dispatch({ type: "ADD_LOADING", payload: true })
            const res = await axios.post('/link/add', formData)
            console.log(res)
            if(res.data.success){
                dispatch({type: "ADD_LINK", payload: res.data})
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

    const Vote = async (id, type) => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.post('/link/vote', {id, type})
            console.log(res)
            if(res.data.success){
                dispatch({type: "VOTE", payload: res.data.data})
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    const GetFolders = async () => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.get('/folder/index')
            console.log(res)
            if(res.data.success){
                dispatch({type: "GET_FOLDERS", payload: res.data.data})
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    const AddFolder = async (name) => {
        if(localStorage.tagers_token) {
            setDefaultHeader(localStorage.tagers_token)
        }
        try {
            const res = await axios.post('/folder/add', {name})
            console.log(res)
            if(res.data.success){
                dispatch({type: "ADD_FOLDER", payload: res.data.data})
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }
    
    
    return (
        <LinkContext.Provider
          value={{
            links: state.links,
            folders: state.folders,
            add_loading: state.add_loading,
            GetLinks,
            AddLink,
            Vote,
            GetFolders,
            AddFolder,
          }}
        >
          {props.children}
        </LinkContext.Provider>
    );
}

export default LinkContextProvider;