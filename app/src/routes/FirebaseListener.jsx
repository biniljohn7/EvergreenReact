import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedLayout from "../layout/ProtectedLayout";
import NotFound from "../views/NotFound";
import { store } from "../redux/store";
import firebase from "../firebaseChat";
import Logo from "../assets/images/logo_with_background_1.png";
import { WEBSITE_URL } from "../helper/constant";

const FirebaseListener = (props) => {
  // const [listenerFlag, setFlag] = useState(false)
  const [listener, setListener] = useState(false);
  const [accessToken] = useState(store.getState().auth.accessToken);

  useEffect(() => {
    if (
      store.getState().auth.isLogin &&
      store.getState().auth.accessToken &&
      store.getState().auth.memberId
    ) {
      // Ask for permission to send notification if required
      if (
        !window.Notification ||
        (Notification.permission !== "granted" &&
          Notification.permission !== "denied")
      ) {
        askPermission();
      } else {
        setListener(true);
      }
    }
  }, [accessToken]);

  // Used useEffect to attach listener so that it can unscribe from listening events after component unmonts
  useEffect(() => {
    if (listener) {
      try {
        const unsubscribe = firebase
          .firestore()
          .collection("messageQueue")
          .where("receiverId", "==", store.getState().auth.memberId)
          .where(
            "timestamp",
            ">=",
            firebase.firestore.Timestamp.fromDate(new Date())
          )
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const data = change.doc.data();
                const notification = new Notification(
                  `${data.senderName} has sent you a message`,
                  {
                    body:
                      data.chatImage && data.chatImage !== ""
                        ? "Image"
                        : data.message,
                    icon: Logo,
                  }
                );
                notification.onclick = function (event) {
                  event.preventDefault();
                  window.open(WEBSITE_URL + "inbox", "_blank");
                };
              }
            });
          });
        return () => {
          unsubscribe();
        };
      } catch (err) {
        console.error("Failed to execute listeners ", err);
      }
    }
  }, [listener]);

  const askPermission = () => {
    if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission()
        .then((result) => {
          if (result === "granted") {
            setListener(true);
            // addMessageListener()
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to grant notification permission");
        });
    }
  };

  // const addMessageListener = async () => {
  //   try {
  //     const unsubscribe = firebase
  //       .firestore()
  //       .collection('messageQueue')
  //       .where('receiverId', '==', store.getState().auth.memberId)
  //       .where(
  //         'timestamp',
  //         '>=',
  //         firebase.firestore.Timestamp.fromDate(new Date()),
  //       )
  //       .onSnapshot((snapshot) => {
  //         // if (!listener) {
  //         //   console.log(unsubscribe)
  //         // }
  //         snapshot.docChanges().forEach((change) => {
  //           if (change.type === 'added') {
  //             console.log('New queue: ', change.doc.data())
  //           }
  //         })
  //       })
  //     // setListener(unsubscribe)
  //   } catch (err) {
  //     console.error('Failed to execute listeners ', err)
  //   }
  // }
  return (
    <Switch>
      {ProtectedRoutes.map((pathObj, i) => {
        return (
          <Route
            exact
            path={pathObj.path}
            key={i}
            // component={pathObj.component}
            render={(props) => (
              <ProtectedLayout {...props} mainComponent={pathObj.component} />
            )}
          />
        );
      })}

      <Route render={(props) => <NotFound {...props} />} />
    </Switch>
  );
};

export default FirebaseListener;
