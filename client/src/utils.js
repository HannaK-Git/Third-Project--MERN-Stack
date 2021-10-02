


export async function loginUser(credentials) {
  
  return fetch("http://localhost:8000/api/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

    


export default {loginUser}