import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import authenticateBucket from '../utils/bucketUtil';
import { storeBucket, fetchAlbumList } from '../actions/actions';
import { MAIN } from '../utils/constants';

class Main extends React.Component {
  componentWillMount() {
    const { storeBucket, fetchAlbumList, history, location } = this.props;

    // check to see if a route was provided otherwise add INITIAL_ALBUM
    if (location.pathname === '/') {
      history.push(MAIN.INITIAL_ALBUM );
    }

    // authenticate the AWS-SDK s3 bucket object using AWS Cognito user pool
    this.bucket = authenticateBucket;

    // dispatch the s3 bucket object to the store AWS-SDK bucket object globally
    storeBucket(this.bucket);

    // fetch the full list of albums from the bucket to populate the Navigation drop down
    fetchAlbumList(this.bucket);
  }

  // children are passed from Routes.js to render a particular album in the Viewer component
  render() {
    const { children } = this.props;

    return (
      <div>
        <Navigation bucket={this.bucket} />
        {children}
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
  storeBucket: PropTypes.func.isRequired,
  fetchAlbumList: PropTypes.func.isRequired,
};

export default withRouter(
  connect(state => ({ showInViewer: state.showInViewer }), {
    storeBucket,
    fetchAlbumList,
  })(Main),
);
