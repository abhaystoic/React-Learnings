import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Pokeball from '../images/pokeball.png'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/fetchPosts';
import { getPosts, getPostsError, getPostsPending } from '../reducers/rootReducer';

class Home extends Component {

  componentDidMount() {
    const {fetchPosts} = this.props;
    fetchPosts();
  }

  render() {
    const {posts} = this.props;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <img src={Pokeball} alt="A pokeball" />
            <div className="card-content">
              <Link to={'/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ): (
      <div className="center">No post yet</div>
    );
    return (
      <div className="container home">
        <h4 className="center">Home</h4>
        {postList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    error: getPostsError(state),
    pending: getPostsPending(state),
  }
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
  fetchPosts: fetchPosts
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);
