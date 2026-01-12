import FooterMenu from "../components/FooterMenu";
import Heading2 from "../components/subcomponents/texts/Heading2";
import Heading3 from "../components/subcomponents/texts/Heading3";
import Paragraf from "../components/subcomponents/texts/Paragraf";
import WrapperCenterContent from "../components/WrapperCenterContent";

import { useParams } from "react-router-dom";
import axios from "../apis/axios";
import { useState, useEffect } from "react";

const ClassOverview = () => {
  let { id } = useParams();

  const ACTIVITY_URL = `api/v1/activities/${id}`;

  const [activityData, setActivityData] = useState();

  useEffect(() => {
    fetchActivity();
    // eslint-disable-next-line
  }, [id, activityData?.length]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL);

      let activity = response?.data;

      setActivityData(activity);

      console.log(activityData && activityData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WrapperCenterContent>

              {activityData?.name && (
              
                <>
                  <Heading2 text={activityData.name} />

                  <section className="class-overview__details-wrapper">
                    {activityData.time && activityData.weekday && activityData.maxParticipants && (
                    <ul className="class-overview__details">
                      <li className="class-overview__details-detail">
                        <span className="class-overview__details-detail-title">Tid: </span>{activityData.time}</li>
                      <li className="class-overview__details-detail">
                        <span className="class-overview__details-detail-title">Dag: </span>{activityData.weekday}</li>
                      <li className="class-overview__details-detail">
                        <span className="class-overview__details-detail-title">Max deltagere: </span>{activityData.maxParticipants}</li>
                    </ul>
                    )}

                    <Heading3 text={'Deltagere'} styles="white-color-important"/>

                    {activityData.users.length > 0 && (
                      <ul className="class-overview__participants-wrapper">
                      {activityData.users.map((user) => (
                        <li key={user.id}>
                          <Paragraf
                            text={`${user.firstname} ${user.lastname}`}
                            styles="white-color-important" 
                          />
                        </li>
                      ))}
                      </ul>
                    )}

                    {activityData.users.length <= 0 && (
                      <Paragraf
                        text={'Der er ingen tilmeldte deltagere.'}
                        styles="white-color-important" 
                      />
                    )}
                  </section>
                </>

                )}
              
          
      </WrapperCenterContent>
  
      <FooterMenu />
    </>
  );
};

export default ClassOverview;
