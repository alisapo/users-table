import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

import HorizontalBar from './HorizontalBar.js';
import Bar from './Bar.js';

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

  //сотировка по столбцам "ФИО", "время активной работы", "отклонение от среднего"
  onSort = sortField => {
    const { sorting } = this.state,
      cloneData = this.state.data.concat();
    let sortType, sortParam = {};

    //переключение направления сортировки: asc/desc
    switch (sortField) {
      case 'name':
        sortType = sorting.name === 'asc' ? 'desc' : 'asc';
        break;

      case 'time':
        sortType = sorting.time === 'asc' ? 'desc' : 'asc';
        break;

      case 'different':
        sortType = sorting.different === 'asc' ? 'desc' : 'asc';
        break;
    
      default:
        break;
    };

    const sortedData = _.orderBy(cloneData, sortField, sortType);
    sortParam = {
      ...sorting,
      [sortField]: sortType
    }
    this.setState({
      data: sortedData,
      sorting: sortParam
    });
    // console.log(sortField, sortedData, sortType);
  }

  //перевод рабочего времени в вид ЧЧ ММ
  countWorkTime = (time) => {
    let hours = ((time - time % hour) / hour).toFixed(),
      minutes;
    if (
      (time - time % hour) > 59
      || (time - time % hour) < hour
      ) {
        minutes = ((time % hour) / minute).toFixed();
    }

    let str = hours + '.' + minutes;
    return (
      <Bar time={str} />
    )
  }

  //подсчёт отклонения отработанного времени от среднего в процентах
  differentFromNorm = (time) => {
    let percentDifferent = ( (time * 100) / this.state.norm).toFixed() - 100;
    return (
      <HorizontalBar time={percentDifferent} />
    )
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
        <section>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th className="sorting-fields" onClick={this.onSort.bind(null, 'name')}>
                  <div className="table-header">ФИО</div>
                  {this.arrowRotate(this.state.sorting.name)}
                </th>
                <th className="table-header">Логин</th>
                <th className="sorting-fields" onClick={this.onSort.bind(null, 'time')}>
                  <div className="table-header">Время активной работы</div>
                  {this.arrowRotate(this.state.sorting.time)}
                </th>
                <th className="sorting-fields" onClick={this.onSort.bind(null, 'different')}>
                  <div className="table-header">Отклонение от среднего</div>
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
