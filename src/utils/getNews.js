import { ACADEMYCONFIG } from '../../ACADEMYCONFIG';
let repeats = 0;

export const getNews = async () => {
  try {
    const data = await fetch(`${ACADEMYCONFIG.HOST}/api/news`);
    const res = await data.json();
    if (res.status === 'ok') {
      return res.data;
    } else {
      return null;
    };
  } catch (error) {
    console.log(err);
    if (repeats < 5) {
      repeats++;
      setTimeout(getNews, 2000);
    } else {
      repeats = 0;
      return null;
    };
  };
};