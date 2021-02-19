import React, { Component } from 'react';
import Listing from './Listing';
import './Post.css';
 
class Posts extends Component {
    state = {  }
    render() { 
        return ( 
            <form className="col-md-10">
                <div className="text-center" style={{textAlign:'center', fontWeight: 'bold', fontSize: '24px'}}>
                    投稿一覧
                </div>
                <Listing 
                    posts={this.props.posts} 
                    deletePost={this.props.deletePost} 
                />
            </form>
         );
    }
}
 
export default Posts;