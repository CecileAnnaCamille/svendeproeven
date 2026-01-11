import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useParams } from "react-router-dom";

import FooterMenu from "../components/FooterMenu";
import WrapperCenterContent from "../components/WrapperCenterContent";
import Heading3 from "../components/subcomponents/texts/Heading3";
import Heading5 from "../components/subcomponents/texts/Heading5";
import Paragraf from "../components/subcomponents/texts/Paragraf";
import Btn from "../components/Btn";
import LoginIcon from "../components/subcomponents/icons/LoginIcon";

const ActivityDetails = () => {
  const useA = useAuth();
  const auth = useA.auth;

  const login = auth.login;
  const userId = auth.userId;
  const token = auth.token;
  const role = auth.role;

  const [signedUp, setSignedUp] = useState(false);

  let { id } = useParams();

  const ACTIVITY_URL = `api/v1/activities/${id}`;
  const USER_AND_ACTIVITY_URL = `api/v1/users/${userId}/activities/${id}`;

  const [activityData, setActivityData] = useState();
  const [activityUserArray, setActivityUserArray] = useState();

  useEffect(() => {
    fetchActivity();
    // eslint-disable-next-line
  }, [activityData?.id, signedUp, id, activityUserArray]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL);

      const activity = response?.data;

      setActivityData(activity);

      // console.log(activityData && activityData);

      setActivityUserArray(() => {
        activityData?.users?.map((user) => {
          const container = {};
          if (auth?.userId) {
            container.age = user.age;
            container.acvitityWeekday = activityData?.weekday;

            if (user?.id === auth?.userId) {
              setSignedUp(true);
            }
          }
          return container;
        });
      });

      // console.log(activityUsersArray?.length && activityUsersArray);
    } catch (err) {
      console.log(err);
    }
  };

  let deleteUserFromActivity;
  let addUserToActivity;

  // const handleClick = () => {
  //   if (signedUp) {
  //     deleteUserFromActivity = async () => {
  //       try {
  //         if (token && id && userId) {
  //           await axios.delete(USER_AND_ACTIVITY_URL, {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           });
  //         }
  //         console.log("user deleted from activity");
  //         setSignedUp(false);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     deleteUserFromActivity();

  //     console.log(signedUp);
  //   } else {
  //     addUserToActivity = async () => {
  //       try {
  //         if (token === auth.token && id && userId === auth.userId) {
  //           await axios.post(USER_AND_ACTIVITY_URL, {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           });
  //         }
  //         console.log("user added to activity");
  //         setSignedUp(true);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     addUserToActivity();

  //     console.log(signedUp);
  //     console.log(userId);
  //     console.log(id);
  //     console.log(token);
  //   }
  // };

  const handleDeleteFromActivity = () => {
    if (signedUp) {
      deleteUserFromActivity = async () => {
        try {
          if (token && id && userId) {
            await axios.delete(USER_AND_ACTIVITY_URL, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
          }
          console.log("user deleted from activity");
          setSignedUp(false);
        } catch (err) {
          console.log(err);
        }
      };
      deleteUserFromActivity();

      console.log(signedUp);
    }
  };

  const handleAddToActivity = () => {
    if (!signedUp) {
      addUserToActivity = async () => {
        try {
          if (token && id && userId) {
            await axios.post(USER_AND_ACTIVITY_URL, null, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
          }
          console.log("user added to activity");
          setSignedUp(true);
        } catch (err) {
          console.log(err);
        }
      };
      addUserToActivity();

      console.log(signedUp);
      console.log(userId);
      console.log(id);
      console.log(token);
    }
  };

  // const handleAddToActivity = () => {
  //   if (!signedUp) {
  //     addUserToActivity = async () => {
  //       try {
  //         if (token === auth.token && id && userId === auth.userId) {
  //           await axios.post(USER_AND_ACTIVITY_URL, {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           });
  //         }
  //         console.log("user added to activity");
  //         setSignedUp(true);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     addUserToActivity();

  //     console.log(signedUp);
  //     console.log(userId);
  //     console.log(id);
  //     console.log(token);
  //   }
  // };

  return (
    <>
      {activityData?.asset?.url && (
        <>
          <div
            className="activity-details--hero-top"
            style={{
              backgroundImage: `url(${
                activityData?.asset?.url
                  ? activityData?.asset?.url
                  : "https://picsum.photos/200/300"
              })`,
            }}
          >
            {!login && (
              <Link
                to={`/login`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Heading5 text="Log in" styles="white-color-important" />
                <LoginIcon />
              </Link>
            )}
            {login && signedUp === true && role !== "instructor" && (
              <Btn
                text="Forlad"
                styles="btn activity-details-btn"
                handleClick={
                  handleDeleteFromActivity && handleDeleteFromActivity
                }
              />
            )}
            {login && signedUp === false && role !== "instructor" && (
              <Btn
                text="Tilmeld"
                styles="btn activity-details-btn"
                handleClick={handleAddToActivity && handleAddToActivity}
              />
            )}
          </div>
          <WrapperCenterContent styles="activity-details-content-wrapper">
            <Heading3
              text={`${activityData.name}`}
              styles={`white-color-important`}
            />

            <Paragraf
              text={`${activityData.minAge}-${activityData.maxAge} år`}
              styles={`white-color-important`}
            />

            <Paragraf
              text={activityData.description}
              styles="activity-details--description white-color-important"
            />
          </WrapperCenterContent>
        </>
      )}

      <FooterMenu />
    </>
  );
};

export default ActivityDetails;
