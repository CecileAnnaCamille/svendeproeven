import FooterMenu from "../components/FooterMenu";
import SearchIcon from "../components/subcomponents/icons/SearchIcon";
import Heading2 from "../components/subcomponents/texts/Heading2";
import Heading3 from "../components/subcomponents/texts/Heading3";
import WrapperCenterContent from "../components/WrapperCenterContent";
import ActivitiesCard from "../components/ActivitiesCard";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../apis/axios";

const ACTIVITIES_URL = "api/v1/activities";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [activitiesData, setActivitiesData] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, [activitiesData?.length]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);

      let activities = response?.data;

      setActivitiesData(activities);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilter = (e) => {
    setSearchData(e.target.value);
    const newFilter = activitiesData.filter((activity) => {
      return activity.name.toLowerCase().includes(searchData.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  return (
    <>
      <WrapperCenterContent styles="search--wrapper">
        <Heading2 text="Søg" />
        <div className="search--input-wrapper">
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={handleFilter}
            value={searchData}
            className="search--input"
          />
          <div class="search--input-icon-wrapper">
            <SearchIcon styles="search--icon" />
          </div>
        </div>
        {filteredData.length !== 0 && searchData.length !== 0 && (
          <div className="activities-cards-container search--activities-cards-container">
            {filteredData.map((activityData) => (
              <Link
                to={`/activities/${activityData.id}`}
                style={{ textDecoration: "none" }}
                key={activityData.id}
              >
                <ActivitiesCard
                  cornerBoxTextTop={`${activityData.name}`}
                  cornerBoxTextBottom={`${activityData.minAge}-${activityData.maxAge} år`}
                  bgUrl={`${activityData.asset.url}`}
                />
              </Link>
            ))}
          </div>
        )}
        {filteredData.length === 0 && (
          <Heading3
            text="Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet."
            styles="white-color-important line-height-2rem"
          />
        )}
      </WrapperCenterContent>
      <FooterMenu />
    </>
  );
};

export default Search;
