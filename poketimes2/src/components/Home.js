import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Pokeball from '../pokeball.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/fetchPosts';
import { getPayload, getPostsError, getPostsPending } from '../reducers/rootReducer';
import LoadingComp from './LoadingComp';

class Home extends Component {

  state = {
    per: 10,
    page: 1,
    totalPages: 1,
    scrolling: false,
  }

  constructor(props) {
    super(props);
    this.scrollListener = window.addEventListener('scroll', (event)=> {
      this.handleScroll(event);
    });
  }

  componentDidMount = () => {
    const {fetchPosts} = this.props;
    fetchPosts(this.state.per*this.state.page, this.state.totalPages);
  }

  componentDidUpdate = () => {
    // const {scrolling, totalPages} = this.props.payload;
    // console.log("componentDidUpdate scrolling==", scrolling, totalPages, this.state.page);
  }

  handleScroll = (event) => {
    const {scrolling, totalPages} = this.props.payload;
    if (scrolling) return;
    // if (totalPages <= this.state.page) return;
    const lastLi = document.querySelector('div.home > div.post-card:last-child');
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) {
      // console.log("scrolling==", scrolling);
      // console.log("totalPages==", totalPages);
      // console.log("this.state.page==", this.state.page);
      this.setState({scrolling: true});
      this.loadMore();
    }
  }

  loadMore = () => {
    // console.log('loadMore called...');
    this.setState(prevState => ({
      page: prevState.page + 1,
      totalPages: prevState.totalPages + 1,
    }), this.props.fetchPosts(
      this.state.per*this.state.page, this.state.totalPages));
  }

  render() {
    const {posts} = this.props.payload;
    const postList = posts.length ? (
      posts.map(post => {
        return (
            <div className="post card post-card" key={post.id}>
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
      <React.Fragment>
        <div className="container home">
          <h4 className="center">Home</h4>
          <h5>Total results = {postList.length}</h5>
          {postList}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payload: getPayload(state),
    error: getPostsError(state),
    pending: getPostsPending(state),
  }
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
  fetchPosts: fetchPosts
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);
