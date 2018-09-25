import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { VelocityTransitionGroup } from 'velocity-react';
import { statementAggregateSelector } from 'ui/redux/selectors';
import { updateStatementAggregate } from 'ui/redux/actions';
import RawQueryBuilder from 'ui/components/RawQueryBuilder';
import ExportManager from 'ui/containers/ExportManager';
import tooltipFactory from 'react-toolbox/lib/tooltip';
import { IconButton } from 'react-toolbox/lib/button';
import { compose } from 'recompose';
import styles from './styles.css';

const TooltipIconButton = tooltipFactory(IconButton);

class Aggregate extends Component {
  static propTypes = {
    updateStatementAggregate: PropTypes.func,
    aggregate: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    aggregate: new Map()
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isExporting: false
    };
  }

  toggleIsExporting = () => {
    this.setState({ isExporting: !this.state.isExporting });
  }

  onChangeAggregate = (nextAggregate) => {
    this.props.updateStatementAggregate(nextAggregate);
  }

  render = () => {
    const pipelines = fromJS([
      this.props.aggregate
    ]);
    return (
      <div>
        <header id="topbar">
          <div className={styles.heading}>
            Statements
            <div className={styles.buttons}>
              <TooltipIconButton
                tooltip="Open export panel"
                tooltipPosition="left"
                onClick={this.toggleIsExporting} >
                <i className="ion-android-download" />
              </TooltipIconButton>
            </div>
          </div>
        </header>
        <VelocityTransitionGroup
          component="div"
          leave={{ animation: 'slideUp', duration: 350 }}>
          { this.state.isExporting &&
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <ExportManager pipelines={pipelines} />
                </div>
              </div>
            </div>
          }
        </VelocityTransitionGroup>
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title">
                  Mongo Aggregate Pipeline
                </div>
              </div>
              <div className="panel-body" style={{ paddingTop: '0px' }}>
                <RawQueryBuilder
                  onQueryChange={this.onChangeAggregate}
                  query={this.props.aggregate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    aggregate: statementAggregateSelector(state),
  }), { updateStatementAggregate })
)(Aggregate);
