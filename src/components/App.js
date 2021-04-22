import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

import '../App.css';

const hour = 3600, minute = 60;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      norm: 12459,

      sorting: {
        name: 'asc',
        time: 'asc',
        different: 'asc'
      },
    };
  }

  componentDidMount() {
    axios
      .get('/data.json')
      .then(({ data }) => {
        this.setState({
          data: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header"></header>
        <section>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th onClick={this.onSort.bind(null, 'name')}>
                  ФИО
                  {this.arrowRotate(this.state.sorting.name)}
                </th>
                <th>Логин</th>
                <th onClick={this.onSort.bind(null, 'time')}>
                  Время активной работы
                  {this.arrowRotate(this.state.sorting.time)}
                </th>
                <th onClick={this.onSort.bind(null, 'different')}>
                  Отклонение от среднего
                  {this.arrowRotate(this.state.sorting.different)}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                Array.from(this.state.data).map(str =>
                  <tr key={str.id}>
                    <td>{str.id + 1}</td>
                    <td>{str.name}</td>
                    <td>{str.login}</td>
                    <td>{this.countWorkTime(str.time)}</td>
                    <td>{this.differentFromNorm(str.time)}</td>
                  </tr>
                )}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
