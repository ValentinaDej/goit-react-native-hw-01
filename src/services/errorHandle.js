const errorHandle = (errorMessage) => {
  switch (errorMessage) {
    case "auth/weak-password":
      return "Password is weak. Please update it.";
    case "auth/invalid-email":
      return "Invalid email. Please update it.";
    case "auth/email-already-in-use":
      return "Email is already in use. Please update it.";
    case "auth/wrong-password":
      return "Password is wrong. Please update it.";
    case "auth/user-not-found":
      return "User not found. Please update it.";
    case "auth/too-many-requests":
      return "Too many requests. Please take a break.";
    default:
      return errorMessage;
  }
};

export default errorHandle;
