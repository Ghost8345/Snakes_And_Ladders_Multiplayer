import { BACKEND_URL } from "./const";

export const registerUser = async (user) => {
  const url = `${BACKEND_URL}/user/createUser`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  }).catch((error) => {
    throw new Error("Problem connecting with the server!");
  });

  if (response.status !== 200) {
    const json = await response.json();
    const message = json.message
    throw new Error(message);
  }
  
  return response;
};

export const logInUser = async (user) => {
    const url = `${BACKEND_URL}/user/login`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    }).catch((error) => {
      throw new Error("Problem connecting with the server!");
    });
  
    if (response.status !== 200) {
      const json = await response.json();
      const message = json.message
      throw new Error(message);
    }
    
    return response;
  };