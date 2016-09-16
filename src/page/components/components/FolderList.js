import React, { PropTypes } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from 'react-router';


const FolderList = ({ folder }) => (
    <List>
      <Subheader>資料夾</Subheader>
      {folder.map(
        item => <ListItem
          key={item.id}
          primaryText={item.name}
          onClick={() => { browserHistory.push('/home/folder/' + item.id); }}
        />
      )
      }
    </List>
);

FolderList.propTypes = {
  folder: PropTypes.array.isRequired,
};

export default FolderList;
