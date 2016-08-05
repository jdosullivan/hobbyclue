import React, {Component} from 'react';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';

export default class Events extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeaderNav />
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
              </div>
              <div className="col-lg-4 col-md-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
