import React, { PropTypes } from 'react';
import DropDown from '../components/DropDown';
import '../static/scss/server-menu.scss';

const ServerMenu = ({server, onSelect}) => {
  return (
    <DropDown className="server-menu" position="left">
      <div className="server-menu__btn">
        <div className="server-menu__title">
          {server.name}
        </div>
        <div className="server-menu__arrow-place">
          <div className="server-menu__arrow"/>
        </div>
      </div>
      <ul className="server-menu__drop">
        <li onClick={onSelect.bind(null,'settings')} className="server-menu__option">Настройки сервера</li>
        <li onClick={onSelect.bind(null,'leave_server')} className="server-menu__option">Покинуть сервер</li>
      </ul>
    </DropDown>
  );
};
ServerMenu.propTypes = {

};
export default ServerMenu;
