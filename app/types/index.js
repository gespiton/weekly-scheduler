// Centralized propType definitions
import PropTypes from 'prop-types';

const {shape, string} = PropTypes;


export const eventType = shape({
  name: string,
  place: string,
  week: string
});
