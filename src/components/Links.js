import React, { useContext, useEffect, useState } from 'react'
import AddToFolderModal from './AddToFolderModal'
import { LinkContext } from './Context/LinkContext'
import { LinkCard } from './LinkCard'
import SearchBar from './SearchBar'

const Links = () => {

    const {links, GetLinks, Vote} = useContext(LinkContext)

    const [modal_open, setModalOpen] = useState(false)
    const [link_id, setLinkID] = useState(null)

    useEffect(() => {
        GetLinks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container'>

            {/* <div className="my-2"><SearchBar/></div> */}
            
            <div className="grid">
                {links && links.map(link => <LinkCard key={link.id} link={link} setLinkID={setLinkID} setModalOpen={setModalOpen} Vote={Vote}/>)}
            </div>

            {modal_open && <AddToFolderModal link_id={link_id} modal_open={modal_open} setModalOpen={setModalOpen}/>}
            
        </div>
    )
}

export default Links
