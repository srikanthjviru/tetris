import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Flag from "react-flags";

class CountryCard extends Component {
  render() {
    const { cca2: code2 = "", region = null, name = {} } =
      this.props.country || {};

    return (
      <Fragment>
        <div>
          <div>
            <div>
              <img
                src={`http://www.countryflags.io/${code2.toLowerCase()}/flat/64.png`}
                className="d-block h-100"
                alt={`${code2} Flag`}
                style={{ height: 100, width: 100 }}
              />
            </div>
            {/* <div>
              <span>{name.common}</span>
              <span>{region}</span>
            </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

CountryCard.propTypes = {
  country: PropTypes.shape({
    cca2: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default CountryCard;
