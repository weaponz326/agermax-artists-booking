import React, { Component } from 'react';

class Header extends Component {
  render() {
    const headerStyle = {
      backgroundColor: '#1E1E1E',
      color: 'white',
      textAlign: 'center',
      padding: '80px 0',
      marginBottom: '50px',
    };

    const greetingStyle = {
      fontSize: '24px',
      marginBottom: '10px',
      
    };

    const greetingText = {
      color: '#AEB6C0',
    }

    return (
      <div style={headerStyle}>
        <div style={greetingStyle}>Hey John!</div>
        <div style={greetingText}>Book amazing artists for your next event</div>
      </div>
    );
  }
}

export default Header;
