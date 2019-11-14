export default async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "srikanth" && password === "srikanth7") {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
}
