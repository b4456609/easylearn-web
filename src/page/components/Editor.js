import React from 'react';

class Editor extends React.Component {

  componentDidMount() {
    tinymce.init({ selector: '#mytextarea' });
  }

  render() {
    return (
      <div id="mytextarea">Hello, World!</div>
    );
  }
}


export default Editor;
