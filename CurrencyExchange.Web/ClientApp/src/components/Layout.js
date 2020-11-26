import React from 'react';
import NavMenu from './NavMenu';

function Layout(props) {

  return (
    <div>
      <NavMenu>
        {props.children}
      </NavMenu>
    </div>
  );
}

export default Layout;
