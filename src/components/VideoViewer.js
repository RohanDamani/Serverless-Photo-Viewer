import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import videos from '../videos';
import window from 'window-or-global';

class VideoViewer extends React.Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    // set this.videos equal to to video matching the url parameter
    const { video } = this.props.match.params;
    const videoObj = videos.find(item => {
      if (item.label === video) {
        return item;
      }
      return null
    });
    if (videoObj) {
      this.videos = videoObj;
    } else {
      this.videos = videos[0];
    }
  }

  componentWillUpdate(nextProps) {
    // set this.videos equal to to video matching the url parameter
    const { video } = this.props.match.params;
    const nextVideo = nextProps.match.params.video;

    if (video !== nextVideo) {
      const videoObj = videos.find(item => {
        if (item.label === nextVideo) {
          return item;
        }
        return null
      });
      window.scrollTo(0, 0);
      if (videoObj) {
        this.videos = videoObj;
      } else {
        this.videos = videos[0];
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <ReactPlayer
              url={this.videos.url}
              width="100%"
              height="100%"
              playing={true}
              loop={!this.videos.image}
              file={{ forceHLS: true }}
              config={{
                file: {
                  attributes: { poster: this.videos.image },
                },
              }}
              controls
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

VideoViewer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VideoViewer;
