import React, { useContext, useEffect, useState } from 'react'
import { LinkContext } from './Context/LinkContext'
import { TagContext } from './Context/TagContext'

const AddLink = () => {
    const {tags, GetTags, AddTag} = useContext(TagContext)
    const {links, add_loading, AddLink} = useContext(LinkContext)

    const [linkData, setLinkData] = useState({
        title: '',
        url: '',
        is_private: false,
        tags: [],
    })

    const [new_tag_name, setNewTagName] = useState('')

    const onChange = (e) => {setLinkData({...linkData, [e.target.name]: e.target.value})}
    const onSubmit = (e) => {
        e.preventDefault()
        AddLink(linkData)
        setLinkData({
            title: '',
            url: '',
            is_private: false,
            tags: [],
        })
    }

    const AddTagX = (name) => {
        AddTag(new_tag_name)
        setNewTagName('')
    }

    const setTag = (id) => {
        if(linkData.tags.indexOf(id) === -1) {
            let selected_tags = [...linkData.tags, id]
            setLinkData({...linkData, ['tags']: selected_tags})
        } else {
            let selected_tags = linkData.tags.filter(tag => tag !== id)
            setLinkData({...linkData, ['tags']: selected_tags})
        }
        console.log(linkData);
    }

    useEffect(() => {
        GetTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className='add_page container container-md'>
            
            <div className='title'>Add New Link</div>
            
            <form onSubmit={onSubmit} className='add_form' action="">

                <div className='input_div'>
                    <label htmlFor="">Title</label>
                    <input onChange={onChange} value={linkData.title} type="text" name='title'/>
                </div>
                
                <div className='input_div'>
                    <label htmlFor="">URL</label>
                    <input onChange={onChange} value={linkData.url} type="text" name='url'/>
                </div>

                <div className="flex justify-between mb-5">
                    <button onClick={() => setLinkData({...linkData, ['is_private']: false})} type='button' className={`${!linkData.is_private && 'active'}`}>Public</button>
                    <button onClick={() => setLinkData({...linkData, ['is_private']: true})} type='button' className={`${linkData.is_private && 'active'}`}>Private</button>
                </div>
                
                <div className='sub-title'>Add Tags</div>
                
                <div className='mb-2 btn-group'>
                    <input onChange={(e) => setNewTagName(e.target.value)} value={new_tag_name} type="text"/>
                    <button type='button' onClick={AddTagX}>Add Tag</button>
                </div>
                
                <div className='flex flex-wrap'>
                    {tags && linkData.tags && tags.map(tag => (
                        <div
                            style={{backgroundColor: linkData.tags.includes(tag.id) ? tag.color : 'white', borderColor: tag.color}}
                            onClick={() => setTag(tag.id)} key={tag.id}
                            className={`badge ${linkData.tags.includes(tag.id) && 'active'}`}>
                            {tag.name}
                        </div>
                    ))}
                </div>

                <button className='submit-btn'>Submit</button>
                
            </form>
            
        </div>
    )
}

export default AddLink
