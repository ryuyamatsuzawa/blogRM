import React, { Component } from 'react';
 
class EditPost extends Component {
    authorRef = React.createRef();
    titleRef = React.createRef();
    contentRef = React.createRef();
    categoryRef = React.createRef();
 
    editPost = (e) => {
        e.preventDefault();
        const post = {
            author: this.authorRef.current.value,
            title: this.titleRef.current.value,
            body: this.contentRef.current.value,
            category: this.categoryRef.current.value,
            id: this.props.post.id 
        }
        this.props.editPost(post);
    }
 
    loadForm = () => {
        if (!this.props.post) return null;
        const {title, author, body, category} = this.props.post;
 
        return (    
            <form onSubmit={this.editPost} className="col-md-10" id="update-post">
                <div className="update-container">
                <h2>編集画面</h2>
                <div className="form-group">
                    <label>タイトル:</label>
                    <input type="text" ref={this.titleRef} className="form-control" defaultValue={title} />
                </div>
 
                <div className="form-group">
                    <label>著者:</label>
                    <input type="text" ref={this.authorRef} className="form-control" defaultValue={author} />
                </div>
 
                <div className="form-group">
                    <label>内容:</label>
                    <textarea className="form-control" rows="7"cols="25" ref={this.contentRef} defaultValue={body}></textarea>
                </div>
 
                <div className="form-group">
                    <label>カテゴリー: </label>
                <select ref={this.categoryRef} className="form-control" defaultValue={category}>
                    <option value="cars">Cars</option>
                    <option value="nature">Nature</option>
                    <option value="it">IT</option>
                    <option value="books">Books</option>
                    <option value="sport">Sport</option>
                    <option value="other">Other</option>
                </select>
                </div>
 
                <button type="submit" className="btn btn-primary" style={{width:'100px', height:'50px', backgroundColor:'#87cefa'}}>更新</button>
                </div>
            </form>
        );
    }
 
 
    render() {
        return ( 
            <React.Fragment>
                {this.loadForm()}
            </React.Fragment>            
         );
    }
}
 
export default EditPost;