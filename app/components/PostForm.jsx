import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Save from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';

const styleTextField = {
  display: 'block'
};

const schema = Joi.object({
  title: Joi.string().trim().max(255),
  topic: Joi.string().trim().max(50),
  url: Joi.string().trim().uri({ scheme: /^https?/ })
});

const PostForm = React.createClass({
  getInitialState() {
    return {
      errors: {},
      post: this.props.post
    }
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      // invalid
      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[name];

    this.setState({ errors: nextErrors });
  },

  handleChange(event) {
    const nextPost = Object.assign({}, this.state.post, {
      [event.target.name]: event.target.value
    });

    this.setState({ post: nextPost });
  },

  handleTouchTapCancel() {
    this.props.stopEditingPost(this.props.post);
  },

  handleTouchTapSave() {
    const result = Joi.validate(this.state.post, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }
    const nextPost = Object.assign({}, result.value, { votes: 1 });

    this.props.updatePost(this.props.post, nextPost);
  },

  render() {
    const { errors, post } = this.state;
    const styleRaisedButton = {
      marginRight: '10px',
      marginTop: '40px'
    };

    return <Paper className="paper">
      <h3>New Header</h3>
      <TextField
        errorText={errors.url}
        floatingLabelText="url"
        fullWidth={true}
        name="url"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        value={post.url}
      />
      <TextField
        errorText={errors.title}
        onBlur={this.handleBlur}
        fullWidth={true}
        floatingLabelText="title"
        name="title"
        onChange={this.handleChange}
        value={post.title}
      />
      <TextField
        errorText={errors.topic}
        onBlur={this.handleBlur}
        fullWidth={true}
        floatingLabelText="topic"
        name="topic"
        onChange={this.handleChange}
        value={post.topic}
      />

      <RaisedButton
        icon={<Cancel />}
        label="Cancel"
        primary={true}
        style={styleRaisedButton}
        onTouchTap={this.handleTouchTapCancel}
      />
      <RaisedButton
        icon={<Save />}
        label="Save"
        onTouchTap={this.handleTouchTapSave}
        primary={true}
        style={styleRaisedButton}
      />

    </Paper>;
  }
});

export default PostForm;
