import { connect } from 'react-redux';
import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import './NewPack.css';
import Editor from './components/Editor';
import { newPack } from '../actions';
import { browserHistory } from 'react-router';


class NewPack extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      isPublic: true,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish() {
    const content = tinymce.activeEditor.getContent();
    const { title, description, isPublic } = this.state;
    const { userId, userName } = this.props;
    this.props.dispatch(newPack(title, description, isPublic, content, userId, userName));
    // Go to /some/path.
    browserHistory.push('/home/');
  }

  render() {
    return (
      <div>
        <div className="row center-xs sec">
          <div className="col-xs-4">
            <div className="box">
              <TextField
                floatingLabelText="標題"
                style={{ width: '100%' }}
                onChange={e => this.setState({ title: e.target.value })}
                value={this.state.title}
              />
            </div>
          </div>
          <div className="col-xs-8">
            <div className="box">
              <TextField
                floatingLabelText="描述"
                style={{ width: '100%' }}
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description}
              />
            </div>
          </div>
        </div>
        <div className="row sec">
          <div className="col-xs-6">
            <div className="box">
              <Checkbox
                label="公開懶人包"
                onCheck={(e, isInputChecked) => this.setState({ isPublic: isInputChecked })}
                defaultChecked
              />
            </div>
          </div>
          <div className="col-xs-6">
            <div className="box">
              <RaisedButton label="選擇封面照片" secondary />
            </div>
          </div>
        </div>
        <Editor />
        <div className="row end-xs">
          <div className="col-xs-12">
            <div className="box">
              <RaisedButton label="完成" onClick={this.onFinish} primary />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    userName: state.user.name,
  };
};

export default connect(
  mapStateToProps
)(NewPack);
