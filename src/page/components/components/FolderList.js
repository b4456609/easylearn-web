import React, { PropTypes } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';


const FolderList = ({folder}) => (
    <List>
      <Subheader>資料夾</Subheader>
      <ListItem
        primaryText="全部懶人包"
        />
      {folder.map(
        item => <ListItem
        key={item.id}
        primaryText={item.name}
        />
      )
      }
    </List>
);

FolderList.propTypes = {
  folder: PropTypes.array.isRequired
}

export default FolderList;
