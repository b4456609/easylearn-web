import { connect } from 'react-redux';
import spacing from 'material-ui/styles/spacing';
import React, { PropTypes } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Img from '../../img/305.png';
import { showDialog, movePackOut } from '../../actions/';

class PackCard extends React.Component {
  constructor(props) {
    super(props);
    this.goto = this.goto.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  goto() {
    this.context.router.push(`/home/pack/${this.props.id}`);
  }

  handleChangeSingle(event, value) {
    console.log(value)
    if (value === '1') {
      this.props.dispatch(showDialog('MOVE_PACK', { id: this.props.id }));
    } else if (value === '2'){
      this.props.dispatch(showDialog('REMOVE_PACK_DIALOG', { id: this.props.id, name: this.props.name }));
    } else if (value === '3'){
      this.props.dispatch(movePackOut( this.props.id, this.props.folderId ));
    }
  }

  render() {
    let menu = (<MenuItem value="3" primaryText="移出資料夾" />);
    if (this.props.folderId === 'all')
      menu = (<MenuItem value="1" primaryText="放到資料夾" />);
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="box">
          <Card style={{ marginBottom: spacing.desktopGutter }}>
            <CardMedia
              overlay={
                <CardTitle title={this.props.name} />
              }
            >
              <img src={Img} alt="packimg" />
            </CardMedia>
            <CardText>
              {this.props.description}
            </CardText>
            <CardActions>
              <FlatButton label="閱讀" onClick={this.goto} primary />
              <span style={{ float: 'right' }} >
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  onChange={this.handleChangeSingle}
                >
                  {menu}
                  <MenuItem value="2" primaryText="刪除" />
                </IconMenu>
              </span>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

PackCard.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

PackCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
)(PackCard);
