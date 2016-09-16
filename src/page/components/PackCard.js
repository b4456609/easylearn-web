import spacing from 'material-ui/styles/spacing';
import React, { PropTypes } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Img from '../../img/305.png';

class PackCard extends React.Component{
  constructor(props, context){
    super(props);
    this.goto = this.goto.bind(this);
  }

  goto(){
    this.context.router.push('/home/pack/'+this.props.id);
  }

  render(){
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
              <FlatButton label="Read" onClick={this.goto}/>
              <FlatButton label="Action2" />
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
};

export default PackCard;
