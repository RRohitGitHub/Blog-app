import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/userSlice'
import Blog from './Blog'
import '../styling/Blogs.css'

const Blogs = () => {

    const searchInput = useSelector(selectUserInput)
    const dispatch = useDispatch()
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=a72676f17cc26311b6d36d38db81d11f`
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState();

    useEffect(()=>{
        axios.get(blog_url).then((response)=>{
            dispatch(setBlogData(response.data));
            setBlogs(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[searchInput])
    console.log(blogs)
    return (
        <div className="blog__page">
            
            <div className="container">
                <h1 className="blog__page__header">Blogs</h1>
                {blogs?.totalArticles==0 ? "No Blogs Available" :<div className="blogs">
                    {loading ? <h1 className="loading">Loading...</h1>:""}
                    {blogs?.articles?.map(blog=>(
                        <a className="blog__link" target="_blank" href={blog.url}>
                            <Blog blog={blog}/>
                        </a>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default Blogs
