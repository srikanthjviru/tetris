// import React, { Component } from "react";

// export default class Paginate extends Component {
//   render() {
//     return <div>Paginate</div>;
//   }
// }

import React, { Component } from "react";
import Countries from "countries-api/lib/data/Countries.json";
import "./paginate.css";

import Pagination from "../components/Pagination/Pagination";
import CountryCard from "../components/Pagination/CountryCard";
import { wrap } from "module";

class App extends Component {
  state = {
    allCountries: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    // const allCountries = Countries;
    let allCountries = [];
    for (var i = 0; i < 100; i++) {
      allCountries.push("COUNTRY", Math.random() * 1000);
    }

    this.setState({ allCountries });
  }

  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    console.log(allCountries, allCountries.length);
    const totalCountries = allCountries.length;

    if (totalCountries === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <h2>
                  <strong>{totalCountries}</strong> Countries
                </h2>
                {currentPage && (
                  <span>
                    Page <span>{currentPage}</span> / <span>{totalPages}</span>
                  </span>
                )}
              </div>
              {/* <div className="d-flex flex-column py-4 align-items-center"> */}
              {/* </div> */}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {currentCountries.map(country => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
            <Pagination
              totalRecords={totalCountries}
              pageLimit={18}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
