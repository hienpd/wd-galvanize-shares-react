import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import { Link } from 'react-router';
import React from 'react';
import Paper from 'material-ui/Paper';

const Post = React.createClass({
  handleTouchTapUp() {
    this.props.incrementVotes(this.props.post);
  },

  handleTouchTapDown() {
    this.props.decrementVotes(this.props.post);
  },

  render() {
    const { post } = this.props;

    const styleAside = {
      minWidth: '60px'
    };

    const stylePaper = {
      display: 'flex'
    };

    const styleVotes = {
      marginLeft: '7px'
    };

    const styleTitle = {
      fontSize: '22px',
      textDecoration: 'none'
    };

    const styleSubTitle = {
      fontSize: '14px',
      marginTop: '8px'
    }

    const styleTopic = {
      textDecoration: 'none'
    };

    const styleAction = Object.assign({}, styleTopic, {
      cursor: 'pointer',
      fontWeigth: 500,
      marginRight: '8px'
    });

    return <Paper style={stylePaper} className="paper">
      <aside style={styleAside}>
        <KeyboardArrowUp onTouchTap={this.handleTouchTapUp} />
        <div style={styleVotes}>{post.votes}</div>
        <KeyboardArrowDown onTouchTap={this.handleTouchTapDown} />
      </aside>

      <article>
      <a href={post.url} style={styleTitle}>
        {post.title}
      </a>
        <div style={styleSubTitle}>
          submitted by {post.submitter} to {' '}

          <Link style={styleTopic} to={`/topics/${post.topic}`}>
            {`/topics/${post.topic}`}
          </Link>
        </div>
        <div style={styleSubTitle}>
          <a style={styleAction}>edit</a>
          <a style={styleAction}>delete</a>
        </div>
      </article>
    </Paper>;
  }
});

export default Post;
