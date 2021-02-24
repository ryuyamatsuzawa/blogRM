import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Header } from './Layout/Layout';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Form from './Form';
import EditPost from './EditPost';
import LoginForm from './LoginForm'
import Menu from './Menu'
import Home from './Home'
import MyPage from './MyPage'
import Register from './Register'

//Component Classを継承している。renderを呼ぶ。
class Router extends Component {
  state = {
    posts: []
  }

  //componentがmountされた直後に呼び出される。
  //componentDidmoutの中ですぐにsetStateを呼び出せる。しかしそれは余分renderを引き起こすが、ブラウザを更新する前に起こるので、ユーザには見えない。しあｋしこのパターンはパフォーマンスが下がるので、代わりに、constructor()で初期状態をstateに代入する方法もある。
  //componentWillmount()は？？？
  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    // axios.get(`http://localhost:4000/posts`)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
  }

  deletePost = (id) => {
    //console.log(id);
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (res.status === 200) {
          const posts = [...this.state.posts];
          let result = posts.filter(post => (
            post.id !== id
          ));
          this.setState({
            posts: result
          })
        }
      })
  }

  createPost = (post) => {
    axios.post(`https://jsonplaceholder.typicode.com/posts`, { post })
      .then(res => {
        if (res.status === 201) {
          Swal.fire(
            '投稿しました',
            '成功しました'
          )

          let postId = { id: res.data.id };
          const newPost = Object.assign({}, res.data.post, postId)

          this.setState(prevState => ({
            posts: [...prevState.posts, newPost]
          }))
        }
      })
  }

  editPost = (postUpdate) => {
    const { id } = postUpdate;

    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { postUpdate })
      .then(res => {
        if (res.status === 200) {
          Swal.fire(
            '投稿を更新しました',
            '変更は保存されました',
            '成功'
          )

          let postId = res.data.id;

          const posts = [...this.state.posts];

          const postEdit = posts.findIndex(post => postId === post.id)

          posts[postEdit] = postUpdate;
          this.setState({
            posts
          })
        }
      })
  }

  login = (userName,name) => {
    axios.post(`http://localhost:4000/login`, { userName,name })
      .then(res => {
        console.log(res)
      })
  }
  
  myPage = () => {
    axios.post(`http://localhost:4000/myPage`, { })
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      // <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <Header />
            <div className="row justify-content-center">

              <Menu />
              <Switch>
                <Route path="/" exact children={<Home />} />
                <Route path="http://localhost:4000/login" children={<LoginForm />} />
                <Route path="http://localhost:4000/myPage" children={<MyPage />} />
                <Route path="http://localhost:4000/register" children={<Register />} />
              </Switch>

              <Switch>
                <Route exact path="/" render={() => {
                  return (
                    <Posts
                      posts={this.state.posts}
                      deletePost={this.deletePost}
                    />
                  );
                }} />

                <Route exact path="/login" render={() => {
                  return (
                    <LoginForm  login={this.login} />
                  );
                }} />

                <Route exact path="/register" render={() => {
                  return (
                    <Register />
                  );
                }} />

                <Route exact path="/myPage" render={() => {
                  return (
                    <MyPage />
                  );
                }} />

                <Route exact path="/post/:postId" render={(props) => {
                  let idPost = props.location.pathname.replace('/post/', '')

                  const posts = this.state.posts;
                  let filter;
                  filter = posts.filter(post => (
                    post.id === Number(idPost)
                  ))


                  return (
                    <SinglePost
                      post={filter[0]}
                    />
                  )
                }} />
                <Route exact path="/create" render={() => {
                  return (
                    <Form
                      createPost={this.createPost}
                    />
                  );
                }}
                />
                <Route exact path="/edit/:postId" render={(props) => {
                  let idPost = props.location.pathname.replace('/edit/', '')
                  const posts = this.state.posts;
                  let filter;
                  filter = posts.filter(post => (
                    post.id === Number(idPost)
                  ))
                  return (
                    <EditPost
                      post={filter[0]}
                      editPost={this.editPost}
                    />
                  )
                }} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      // </Provider>
    );
  }
}
export default Router;