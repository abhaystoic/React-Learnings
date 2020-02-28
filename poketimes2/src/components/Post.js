import React, { Component } from 'react'
// import axios from 'axios'
import { connect } from 'react-redux'
import { deletePost } from '../actions/postActions'

class Post extends Component {
  
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/');
  }

  render() {
    const postDetails = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
        <div className="center">
          <button className="btn grey" onClick={this.handleClick}>
            Delete Post
          </button>
        </div>
      </div>
    ) : (
      <div className="center">Loading...</div>
    );
    return (
      <div className="container">
        <h4>{postDetails}</h4>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.post_id;
  let posts = state.payload.posts;
  return {
    post: posts.find(post => post.id == id)
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => {dispatch(deletePost(id))}
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(Post)