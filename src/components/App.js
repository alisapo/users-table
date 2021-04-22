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

  //визуальное отображение направления сортировки в столбце
  arrowRotate = (param) => {
    return (
      <div>
        {
          param === 'desc' ?
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 15l-5.247-6.44-5.263 6.44-.737-.678 6-7.322 6 7.335-.753.665z" /></svg>
            : <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 8l-5.247 6.44-5.263-6.44-.737.678 6 7.322 6-7.335-.753-.665z" /></svg>
        }
      </div>
    )
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
