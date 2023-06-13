import { ACADEMYCONFIG } from './../../ACADEMYCONFIG';
let repeats = 0;

export const getAccount = async (token) => {
  fetch(`${ACADEMYCONFIG.HOST}/api/account`, {
    headers: {
      academy_token: token,
    }
  })
  .then(data => data.json())
  .then(account => {
    return account;
  })
  .catch(err => {
    console.log(err);
    if (repeats < 5) {
      repeats++;
      setTimeout(getTeam, 2000);
    } else {
      repeats = 0;
      return null;
    }
  });
};