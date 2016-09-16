import spacing from 'material-ui/styles/spacing';
import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Img from '../../img/305.png';

const CardExampleWithAvatar = () => (
  <Card style={{ marginBottom: spacing.desktopGutter }}>
    <CardMedia
      overlay={<CardTitle title="Overlay title" />}
    >
      <img src={Img} alt="packimg" />
    </CardMedia>
    <CardText>
      fasjdiof jfwoejfpwejfowejf fjweojfwoiefje wjeoifjwioejfoi wjeiofjweiofjio jiowejiof1
    </CardText>
    <CardActions>
      <FlatButton label="Read" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
