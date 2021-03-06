import React, { useContext, useEffect } from "react";
import AccountModal from "../components/AccountModal";
import { Appbar, Button, List } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";

const AccountScreen = ({navigation}) => {
  //determines what component the modal will render when a button is clicked

  const [form, setForm] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    //Both sets the user to null and removes the user from async storage
    authContext.setUser(null);
    authStorage.removeUser();
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      {/* Opens model and takes in the visible state with what component to render */}
      <AccountModal visibility={visible} hidemodal={hideModal} form={form} />

        <ListItem title="Personal Information" onPress={() => navigation.navigate('PersonalInfo')} />
        <ListItem title="Change Password"
                  onPress={() => {
                    setForm("Password");
                    showModal();
                  }}/>
        <ListItem title="Terms of Service / Privacy Policy" bottom={true} />
        <ListItem title="Log out" onPress={handleLogout} />

    </SafeAreaView>
  );
};

export default AccountScreen;
