import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class MDLComponent extends Component {
  componentDidMount() {
    if(window.componentHandler){
      window.componentHandler.upgradeElements(findDOMNode(this));
    }
  }

  componentWillUnmount() {
    if(window.componentHandler){
      window.componentHandler.downgradeElements(findDOMNode(this));
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
