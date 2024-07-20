"use server";

const handleUserSignup = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("name", name);
  console.log("email", email);
  console.log("password", password);
};

export default handleUserSignup;
