import React, { Component } from 'react';

class Seats extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <section className={"seats-wrapper"}>
        <div className={"seats"}>места</div>
        <div className={"pool"}>вода</div>
      </section>
    );
  }

}

export default Seats;
