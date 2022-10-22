export const getDecodedUser = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  if (!name && !email) {
    return {};
  }
  const decodedUser = {
    isSignedIn: true,
    name: name,
    email: email,
  };
  return decodedUser;
};

export const handleSignOut = () => {
  localStorage.clear();
  const signedOutUser = {
    isSignedIn: false,
    name: "",
    email: "",
  };
  return signedOutUser;
};
