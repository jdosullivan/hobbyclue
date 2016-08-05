import React, {Component} from 'react';
import Sidebar from './Sidebar';

export default class Events extends Component {
  render() {
    return (
      <div className="container-fluid">
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
