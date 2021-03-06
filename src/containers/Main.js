import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/es/withRouter';
import connect from 'react-redux/es/connect/connect';
import { Grid } from 'react-bootstrap';
import { PATH } from '../utils/constants';
import Navigation from '../components/Navigation';
import ScrollTop from '../components/ScrollTop';
import { authenticatePhotoBucket } from '../utils/awsUtil';
import { fetchAlbumList } from '../actions/actions';
import ViewMore from '../components/ViewMore';
import ReactGA from 'react-ga';

class Main extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket object using AWS Cognito user pool
    this.bucket = authenticatePhotoBucket;
    // fetch the full list of albums from the bucket to populate the Navigation drop down
    this.props.fetchAlbumList(this.bucket);
  }

  componentDidMount() {
    ReactGA.initialize('G-69HR23N3TE');
    ReactGA.pageview(
      'Initial' + window.location.pathname + window.location.search,
    );
  }

  render() {
    const { children, history, location, photosLoading } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <Grid className="padding-right-0 padding-left-0" fluid>
          {children}
        </Grid>
        {location.pathname !== PATH.INFO &&
          location.pathname !== PATH.PRIVACY_POLICY &&
          photosLoading === 0 && <ViewMore history={history} />}
        <ScrollTop />
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => ({ photosLoading: state.photoViewer.loading }), {
    fetchAlbumList,
  })(Main),
);
