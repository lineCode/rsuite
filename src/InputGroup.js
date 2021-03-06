// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import compose from 'recompose/compose';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

import { prefix, withStyleProps, defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix: string,
  inside?: boolean,
  disabled?: boolean,
  children?: React.Node
};

type State = {
  focus?: boolean
};

class InputGroup extends React.Component<Props, State> {
  static childContextTypes = {
    inputGroup: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false
    };
  }
  getChildContext() {
    return {
      inputGroup: {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    };
  }
  handleFocus = () => {
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    const { className, classPrefix, disabled, inside, ...props } = this.props;
    const { focus } = this.state;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inside')]: inside,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    return <div {...props} className={classes} />;
  }
}

const EnhancedInputGroup = compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'input-group'
  })
)(InputGroup);

setStatic('Addon', InputGroupAddon)(EnhancedInputGroup);
setStatic('Button', InputGroupButton)(EnhancedInputGroup);

export default EnhancedInputGroup;
