import React, { useContext, useEffect, useState } from 'react'
import { LinkContext } from './Context/LinkContext'
import { LinkCard } from './LinkCard'
import SearchBar from './SearchBar'

const Dashboard = () => {

    const {top_links, GetTopLinks} = useContext(LinkContext)
    const [search_text, setSearchText] = useState('')
    
    useEffect(() => {
        console.log(search_text);
    }, [search_text])
    
    return (
        <div className='container'>

            <div className="my-2"><SearchBar search_text={search_text} setSearchText={setSearchText}/></div>
            
            <div className="grid">

            </div>
        </div>
    )
}

export default Dashboard
