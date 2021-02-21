import React, { Component } from 'react';
import moment from 'moment';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import renderHTML from 'react-render-html';

class SinglePost extends Component {

    showPost = (props) => {
        if (!props.post) return null;

        const { title, author, body, category, datestamp } = this.props.post;

        return (
            <React.Fragment>
                <div id="show-single-post">
                <Paper className="single_post">
                    <h4>タイトル: {title}</h4>
                    <Divider light />
                    <p><b>著者:</b> {author}</p>
                    <Divider light />
                    <p><b>内容:</b> {body}</p>
                    <Divider light />
                    <p><b>カテゴリー:</b> {category}</p>
                    <Divider light />
                    <h5>作成日: {moment(datestamp).format('YYYY年 MM月 DD日')}</h5>
                    <div style={{ width: '60%' }}>{renderHTML(body)}</div>
                </Paper>
                </div>
            </React.Fragment>
        )

    }
    render() {
        return (
            <div className=" col-md-10">
                {this.showPost(this.props)}
            </div>
        );
    }
}


export default SinglePost;