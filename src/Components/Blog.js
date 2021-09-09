import React from 'react'
import '../styling/blog.css'

const Blog = ({blog}) => {
    return (
        <div>
            <div class="card blog-card" style={{"width": "18rem"}}>
                <img src={blog.image} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title blog__title">{blog.title}</h5>
                 
                </div>
            </div>
        </div>
    )
}

export default Blog
