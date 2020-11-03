import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import AccountScreen from "./screens/AccountScreen";
import AuthContext from "./auth/Context";
import AuthNavigator from "./navigation/AuthNavigator";
import authStorage from "./auth/Storage";

export default function App() {
  const [user, setUser] = React.useState();
  const prefix = Linking.makeUrl("/");
  console.log(prefix)

  const restoreUser = async () => {
    const userData = await authStorage.getUser();

    //If no user data is in the storage than just return which shows the login screen
    if (!userData) {
      setUser();
      return;
    }
    setUser(userData);
  };

  //Checks the storage on open of the app
  useEffect(() => {
    restoreUser();
  }, []);

  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      ResetPassword: "resetPassword/reset/:token"
    }
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>
        <NavigationContainer initialState={initialState} ref={ref} >
          {user ? <AccountScreen /> : <AuthNavigator  />}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
