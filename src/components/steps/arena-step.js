import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { SelectField } from 'redux-form-material-ui';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';


import moment from 'moment';

import Seats from '../../seats';
import validate from '../validate';
import { find } from 'lodash';

class ArenaStep extends Component {

  getEvents() {
    const event = find(this.props.events, e => {
      return e.selected && e.events_global.gevent_group.isArena;
    });

    if (!event) {
      return [];
    }

    return this.props.events.filter(e => {
      return e.events_global.gevent_group.isArena && e.events_global.isNightShow === event.events_global.isNightShow
    })
  }

  getListEventComponents() {
    const events = this.getEvents();

    if (events.length === 1) {
      if (events[0].events_global.isNightShow) {
        const dateStart = moment(events[0].date_start).format('HH:mm');
        const dateEnd = moment(events[0].date_stop).format('HH:mm');
        return <MenuItem value={events[0].id} primaryText={`${dateStart} - ${dateEnd}`}/>
      }
    }

    return events.map(e => {
      const dateStart = moment(e.date_start).format('HH:mm');
      const dateEnd = moment(e.date_stop).format('HH:mm');
      return <MenuItem value={e.id} key={e.id} primaryText={`${dateStart} - ${dateEnd}`}/>
    })
  }

  render() {

    const { handleSubmit, handlePrev } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="time" component={SelectField} hintText="Выберите время">
          {this.getListEventComponents()}
        </Field>

        <Seats />

        <RaisedButton
          label="Далее"
          disableFocusRipple={true}
          primary={true}
          onClick={handleSubmit}
          style={{marginRight: 12}}
        />
        <FlatButton
          label="Назад"
          onClick={handlePrev}
        />

      </form>
    )
  }

};

ArenaStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    events: state.events
  };
}

ArenaStep = connect(mapStateToProps)(ArenaStep);


export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ArenaStep)